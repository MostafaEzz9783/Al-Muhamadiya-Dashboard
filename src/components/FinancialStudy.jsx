import { forwardRef, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Expand, ExternalLink, FileDown, Minimize } from "lucide-react";
import { occupancyOptions } from "@/data/financialAssumptions";
import { executiveModel } from "@/data/executiveModel";
import { coLivingModel } from "@/data/coLivingModel";
import { MARKET_VALIDATION_URL } from "@/data/projectData";
import FinancialDistribution from "@/components/FinancialDistribution";
import KPICards from "@/components/KPICards";
import ScenarioContext from "@/components/ScenarioContext";

let hasAnimatedFinancialStudyOnce = false;

const MODEL_DATA = {
  executive: executiveModel,
  coLiving: coLivingModel,
};

const MODEL_OPTIONS = Object.entries(MODEL_DATA)
  .filter(([, value]) => value)
  .map(([key, value]) => ({
    key,
    labelKey: value.labelKey,
  }));

const actionButtonMotion = {
  whileHover: { scale: 1.02, backgroundColor: "#252538", color: "#ffffff" },
  transition: { duration: 0.2, ease: "easeOut" },
};

const SCENARIO_OPTIONS = [
  { key: "worst", color: "#f87171" },
  { key: "base", color: "#60a5fa" },
  { key: "best", color: "#34d399" },
];

const RECOMMENDED_SCENARIO_KEY = "base";

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatSAR(value) {
  return formatNumber(value);
}

function formatPercent(value) {
  return formatNumber(value);
}

const FinancialStudy = forwardRef(function FinancialStudy({ t }, forwardedRef) {
  const initialModelKey = MODEL_OPTIONS[0]?.key ?? "executive";
  const [model, setModel] = useState(initialModelKey);
  const [scenario, setScenario] = useState("base");
  const [occupancy, setOccupancy] = useState(80);
  const [animateCountersFromZero, setAnimateCountersFromZero] = useState(!hasAnimatedFinancialStudyOnce);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const initialValuesRef = useRef({ model: initialModelKey, scenario: "base", occupancy: 80 });
  const sectionRef = useRef(null);
  const exportContentRef = useRef(null);

  const setCombinedRef = (node) => {
    sectionRef.current = node;

    if (typeof forwardedRef === "function") {
      forwardedRef(node);
      return;
    }

    if (forwardedRef) {
      forwardedRef.current = node;
    }
  };

  useEffect(() => {
    if (!animateCountersFromZero) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      hasAnimatedFinancialStudyOnce = true;
      setAnimateCountersFromZero(false);
    }, 1050);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [animateCountersFromZero]);

  useEffect(() => {
    const initialValues = initialValuesRef.current;
    const hasChangedFromInitial =
      model !== initialValues.model ||
      scenario !== initialValues.scenario ||
      occupancy !== initialValues.occupancy;

    if (hasChangedFromInitial && animateCountersFromZero) {
      hasAnimatedFinancialStudyOnce = true;
      setAnimateCountersFromZero(false);
    }
  }, [model, scenario, occupancy, animateCountersFromZero]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === sectionRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!sectionRef.current) {
      return;
    }

    try {
      if (document.fullscreenElement === sectionRef.current) {
        await document.exitFullscreen();
        return;
      }

      await sectionRef.current.requestFullscreen();
    } catch (error) {
      console.error("Failed to toggle fullscreen", error);
    }
  };

  const exportToPdf = async () => {
    if (!exportContentRef.current) {
      return;
    }

    setIsExportingPdf(true);

    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(exportContentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f0f1a",
      });

      const imageData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = pageWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;
      const fittedHeight = Math.min(imageHeight, pageHeight);
      const fittedWidth = imageHeight > pageHeight ? (canvas.width * pageHeight) / canvas.height : imageWidth;
      const x = (pageWidth - fittedWidth) / 2;
      const y = (pageHeight - fittedHeight) / 2;

      pdf.addImage(imageData, "JPEG", x, y, fittedWidth, fittedHeight);
      pdf.save("Al-Muhamadiya-Feasibility-Study.pdf");
    } catch (error) {
      console.error("Failed to export PDF", error);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const selectedModel = MODEL_DATA[model];
  const selectedScenario = selectedModel.scenarios[scenario];
  const selectedModelData = selectedScenario.occupancy[occupancy];
  const recommendedOccupancy = selectedModel.recommendedOccupancy ?? 80;
  const operatorFeeRate = selectedModel.operatorFeeRate ?? 0;

  const kpis = {
    revenueAt100: selectedScenario.revenueAt100,
    revenue: selectedModelData.revenue,
    postTaxesRevenue: selectedModelData.postTaxesRevenue,
    postOtaRevenue: selectedModelData.postOtaRevenue,
    netRevenue: selectedModelData.netRevenue,
    annualPerUnit: selectedModelData.annualPerUnit,
    monthlyPerUnit: selectedModelData.monthlyPerUnit,
    operatorFeeRate,
    operatorFeeAmount: selectedModelData.revenue - selectedModelData.netRevenue,
  };

  const occupancyProgress = ((occupancy - 50) / 40) * 100;
  const selectedScenarioLabel = t.financial.scenarios[scenario];
  const modelLabel = t.financial[selectedModel.labelKey];

  return (
    <section
      ref={setCombinedRef}
      className="rounded-t-3xl -mx-6 px-6 pt-8 pb-12 mt-2"
      style={{ backgroundColor: "#0f0f1a" }}
    >
      <div className="financial-actions flex flex-wrap items-center justify-center sm:justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-3">
          <motion.a
            href={MARKET_VALIDATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border"
            style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e", color: "#f0f0fa" }}
            whileHover={actionButtonMotion.whileHover}
            transition={actionButtonMotion.transition}
          >
            <span>{t.financial.marketValidation}</span>
            <motion.span whileHover={{ x: -2 }} transition={{ duration: 0.2, ease: "easeOut" }}>
              <ExternalLink size={15} />
            </motion.span>
          </motion.a>

          <motion.button
            type="button"
            onClick={exportToPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border disabled:opacity-70"
            style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e", color: "#f0f0fa" }}
            whileHover={actionButtonMotion.whileHover}
            transition={actionButtonMotion.transition}
          >
            <FileDown size={15} />
            <span>{isExportingPdf ? t.financial.exportingPdf : t.financial.exportPdf}</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border"
            style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e", color: "#f0f0fa" }}
            whileHover={actionButtonMotion.whileHover}
            transition={actionButtonMotion.transition}
          >
            {isFullscreen ? <Minimize size={15} /> : <Expand size={15} />}
            <span>{isFullscreen ? t.financial.exitFullscreen : t.financial.fullscreen}</span>
          </motion.button>
        </div>
      </div>

      <div ref={exportContentRef}>
        <div className="flex flex-col sm:flex-row flex-wrap gap-6 items-start sm:items-center justify-center mb-8">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-semibold" style={{ color: "#8b8ba7" }}>
              {t.financial.operatingModel}
            </p>
            <div className="flex gap-1 rounded-xl p-1" style={{ backgroundColor: "#1e1e2e" }}>
              {MODEL_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setModel(option.key)}
                  className="px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                  style={{
                    backgroundColor: model === option.key ? "#60a5fa" : "transparent",
                    color: model === option.key ? "#0f0f1a" : "#8b8ba7",
                  }}
                >
                  {t.financial[option.labelKey]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-semibold" style={{ color: "#8b8ba7" }}>
              {t.financial.scenarioPrice}
            </p>
            <div className="flex gap-1 rounded-xl p-1" style={{ backgroundColor: "#1e1e2e" }}>
              {SCENARIO_OPTIONS.map((option) => (
                <div key={option.key} className="relative">
                  <button
                    type="button"
                    onClick={() => setScenario(option.key)}
                    className="px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                    style={{
                      backgroundColor:
                        scenario === option.key
                          ? option.key === RECOMMENDED_SCENARIO_KEY
                            ? "#34d399"
                            : "#60a5fa"
                          : option.key === RECOMMENDED_SCENARIO_KEY
                            ? "rgba(52, 211, 153, 0.1)"
                            : "transparent",
                      color:
                        scenario === option.key
                          ? "#0f0f1a"
                          : option.key === RECOMMENDED_SCENARIO_KEY
                            ? "#bbf7d0"
                            : "#8b8ba7",
                      border:
                        option.key === RECOMMENDED_SCENARIO_KEY
                          ? `1px solid ${scenario === option.key ? "rgba(134, 239, 172, 0.9)" : "rgba(74, 222, 128, 0.35)"}`
                          : "1px solid transparent",
                      boxShadow:
                        option.key === RECOMMENDED_SCENARIO_KEY
                          ? scenario === option.key
                            ? "0 0 0 1px rgba(74, 222, 128, 0.16), 0 10px 24px rgba(34, 197, 94, 0.16)"
                            : "0 0 0 1px rgba(74, 222, 128, 0.08)"
                          : "none",
                    }}
                  >
                    <span className="block">{t.financial.scenarios[option.key]}</span>
                    {option.key === RECOMMENDED_SCENARIO_KEY && (
                      <span
                        className="mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        style={{
                          backgroundColor: scenario === option.key ? "rgba(15, 23, 42, 0.16)" : "rgba(34, 197, 94, 0.16)",
                          color: scenario === option.key ? "#0f172a" : "#86efac",
                        }}
                      >
                        {t.financial.recommendedScenario}
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 min-w-[240px]">
            <p className="text-xs font-semibold" style={{ color: "#8b8ba7" }}>
              {t.financial.occupancy}
            </p>
            <div className="w-full rounded-xl px-4 py-3 border" style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e" }}>
              <div className="text-center text-sm font-bold mb-3" style={{ color: "#60a5fa" }}>
                {formatPercent(occupancy)}%
              </div>
              <input
                type="range"
                min="50"
                max="90"
                step="10"
                value={occupancy}
                onChange={(event) => setOccupancy(Number(event.target.value))}
                className="occupancy-slider w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to left, #60a5fa 0%, #60a5fa ${occupancyProgress}%, #2e2e3e ${occupancyProgress}%, #2e2e3e 100%)`,
                  accentColor: "#60a5fa",
                }}
              />
              <div className="flex flex-row-reverse justify-between mt-2 text-xs" style={{ color: "#8b8ba7" }}>
                {[...occupancyOptions].reverse().map((option) => (
                  <div key={option} className="flex min-w-[42px] flex-col items-center gap-1">
                    <span
                      className="rounded-full px-2 py-0.5 transition-all duration-200"
                      style={{
                        color:
                          option === recommendedOccupancy
                            ? occupancy === option
                              ? "#dcfce7"
                              : "#86efac"
                            : "#8b8ba7",
                        backgroundColor:
                          option === recommendedOccupancy
                            ? occupancy === option
                              ? "rgba(34, 197, 94, 0.2)"
                              : "rgba(34, 197, 94, 0.1)"
                            : "transparent",
                        border:
                          option === recommendedOccupancy
                            ? `1px solid ${occupancy === option ? "rgba(134, 239, 172, 0.7)" : "rgba(74, 222, 128, 0.3)"}`
                            : "1px solid transparent",
                        boxShadow:
                          option === recommendedOccupancy && occupancy === option
                            ? "0 6px 18px rgba(34, 197, 94, 0.12)"
                            : "none",
                      }}
                    >
                      {formatPercent(option)}%
                    </span>
                    {option === recommendedOccupancy && (
                      <span
                        className="inline-flex rounded-full px-1.5 py-0.5 text-[9px] font-semibold leading-none"
                        style={{
                          backgroundColor: occupancy === option ? "rgba(34, 197, 94, 0.18)" : "rgba(34, 197, 94, 0.12)",
                          color: occupancy === option ? "#dcfce7" : "#86efac",
                        }}
                      >
                        {t.financial.recommendedShort}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-semibold" style={{ color: "#8b8ba7" }}>
              {t.financial.operatorFee}
            </p>
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-2 border"
              style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e" }}
            >
              <span className="text-sm font-bold" style={{ color: "#f97316" }}>
                {formatPercent(operatorFeeRate * 100)}%
              </span>
              <span className="text-xs px-2 py-0.5 rounded border" style={{ color: "#8b8ba7", borderColor: "#2e2e3e" }}>
                {t.financial.fixed}
              </span>
              <span className="text-xs" style={{ color: "#8b8ba7" }}>
                {t.financial.fromAnnualRevenue}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-3 space-y-4">
            <KPICards
              kpis={kpis}
              formatSAR={formatSAR}
              formatPercent={formatPercent}
              occupancy={occupancy}
              animateCountersFromZero={animateCountersFromZero}
              modelLabel={modelLabel}
              t={t}
            />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <FinancialDistribution
              kpis={kpis}
              formatSAR={formatSAR}
              occupancy={formatPercent(occupancy)}
              t={t}
            />
            <ScenarioContext
              selectedModel={selectedModel}
              scenario={scenario}
              scenarioLabel={selectedScenarioLabel}
              occupancy={formatPercent(occupancy)}
              t={t}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export default FinancialStudy;
