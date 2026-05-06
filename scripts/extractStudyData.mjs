import fs from "node:fs/promises";
import path from "node:path";
import {
  FileBlob,
  SpreadsheetFile,
} from "file:///C:/Users/Lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";

const workbookPath = process.argv[2];
const outputPath = process.argv[3];

if (!workbookPath || !outputPath) {
  console.error("Usage: node extractStudyData.mjs <xlsx-path> <output-js-path>");
  process.exit(1);
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}

function toMixArray(map) {
  return Object.entries(map).map(([label, count]) => ({ label, count }));
}

const input = await FileBlob.load(workbookPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const factValues = workbook.worksheets.getItem("FactSheet").getRange("A1:J40").values;
const coLivingValues = workbook.worksheets.getItem("Co-Living Financial Study").getRange("A1:L20").values;
const summaryValues = workbook.worksheets.getItem("Co-Living Study Summary").getRange("A1:W28").values;

const location = cleanText(factValues[4][2]);

const features = factValues
  .filter((row) => cleanText(row[0]) && cleanText(row[1]))
  .map((row) => cleanText(row[1]));

const inventoryUnits = factValues
  .filter((row) => Number.isFinite(row[7]))
  .map((row) => ({
    unitNumber: row[7],
    floor: cleanText(row[8]),
    type: cleanText(row[9]),
  }));

const inventoryMix = toMixArray(countBy(inventoryUnits, (item) => item.type));
const floorMix = toMixArray(countBy(inventoryUnits, (item) => item.floor));

const coLivingMix = coLivingValues
  .filter((row) => Number.isFinite(row[4]) && cleanText(row[5]))
  .map((row) => ({
    label: cleanText(row[5]),
    count: row[4],
  }));

const occupancyOptions = summaryValues[12]
  .slice(5, 10)
  .filter((value) => Number.isFinite(value))
  .map((value) => Math.round(value * 100));

const scenarioColumns = {
  conservative: 5,
  realistic: 11,
  optimistic: 16,
};

const labels = {
  conservative: { label: "محافظ", sublabel: "Worst Case" },
  realistic: { label: "واقعي", sublabel: "Base Case" },
  optimistic: { label: "متفائل", sublabel: "Best Case" },
};

const monthlyAssumptions = {
  conservative: coLivingValues[9][1],
  realistic: coLivingValues[8][1],
  optimistic: coLivingValues[7][1],
};

const scenarios = Object.fromEntries(
  Object.entries(scenarioColumns).map(([key, colIndex]) => [
    key,
    {
      ...labels[key],
      revenueAt100: summaryValues[11][colIndex],
      monthlyRate: monthlyAssumptions[key],
      annualPerUnitAt90: summaryValues[18][colIndex + 4],
      monthlyPerUnitAt90: summaryValues[22][colIndex + 4],
      netRevenueAt90: summaryValues[14][colIndex + 4],
    },
  ]),
);

const data = {
  property: {
    name: location,
    city: "الرياض",
    district: "شاهقة 12",
    sourceFileName: path.basename(workbookPath),
    sourceFilePath: "/files/Financial Study- Shahqa.xlsx",
    totalInventoryUnits: inventoryUnits.length,
    coLivingUnits: coLivingMix.reduce((sum, item) => sum + item.count, 0),
    inventoryMix,
    floorMix,
    coLivingMix,
    features,
  },
  financial: {
    operatorFee: summaryValues[15][22] ?? 0.2,
    occupancyOptions,
    scenarios,
  },
};

const output = `export const studyData = ${JSON.stringify(data, null, 2)};\n\nexport default studyData;\n`;

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, output, "utf8");

console.log(`Wrote ${outputPath}`);
