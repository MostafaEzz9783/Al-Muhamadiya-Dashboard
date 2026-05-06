import {
  FileBlob,
  SpreadsheetFile,
} from "file:///C:/Users/Lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";

const filePath = process.argv[2];

if (!filePath) {
  console.error("Usage: node inspectWorkbook.mjs <xlsx-path>");
  process.exit(1);
}

const input = await FileBlob.load(filePath);
const workbook = await SpreadsheetFile.importXlsx(input);

const mode = process.argv[3] || "summary";

if (mode === "sheets") {
  const summary = await workbook.inspect({
    kind: "sheet",
    include: "id,name,index,range",
    maxChars: 12000,
  });

  console.log(summary.ndjson);
} else if (mode === "range") {
  const sheetName = process.argv[4];
  const rangeAddress = process.argv[5];

  if (!sheetName || !rangeAddress) {
    console.error("Usage: node inspectWorkbook.mjs <xlsx-path> range <sheet-name> <range>");
    process.exit(1);
  }

  const sheet = workbook.worksheets.getItem(sheetName);
  const values = sheet.getRange(rangeAddress).values;
  console.log(JSON.stringify({ sheetName, rangeAddress, values }, null, 2));
} else {
  const summary = await workbook.inspect({
    kind: "workbook,sheet,table",
    maxChars: 16000,
    tableMaxRows: 10,
    tableMaxCols: 10,
    tableMaxCellChars: 100,
  });

  console.log(summary.ndjson);
}
