const CONTEXT_COLORS = {
  worst: "#f87171",
  base: "#60a5fa",
  best: "#34d399",
};

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function roundDownToNearest500(value) {
  return Math.floor(value / 500) * 500;
}

function PricingBlock({ color, title, monthlyPrice, annualLabel, t }) {
  const annualRent = roundDownToNearest500(monthlyPrice * 12);

  return (
    <div>
      <p className="text-xs font-bold" style={{ color: "#f0f0fa" }}>
        {title}
      </p>
      <p className="text-xs font-black" style={{ color }}>
        SAR {formatNumber(monthlyPrice)} {t.financial.monthSuffix}
      </p>
      <p className="text-xs mt-1" style={{ color: "#8b8ba7" }}>
        {annualLabel}
      </p>
      <p className="text-xs font-black" style={{ color }}>
        SAR {formatNumber(annualRent)} {t.financial.yearSuffix}
      </p>
    </div>
  );
}

export default function ScenarioContext({ selectedModel, scenario, scenarioLabel, occupancy, t }) {
  const color = CONTEXT_COLORS[scenario];
  const modelUnitCount = selectedModel.unitCount;
  const operatorFeeRate = selectedModel.operatorFeeRate ?? 0;
  const pricing = selectedModel.pricing ?? [];
  const language = t.meta.language;
  const contextDescription = selectedModel.contextDescription?.[language] ?? "";

  return (
    <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#1a1a2e", borderColor: "#2e2e3e" }}>
      <h3 className="font-bold text-sm mb-3" style={{ color }}>
        {t.financial.studyContext}
      </h3>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "#c0c0d8" }}>
        {contextDescription}
      </p>

      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <span className="text-xs font-bold mt-0.5" style={{ color }}>
            *
          </span>
          <div>
            <p className="text-xs font-bold" style={{ color: "#f0f0fa" }}>
              {modelUnitCount} {t.financial.unitsWithinScenario} {scenarioLabel}
            </p>
            <p className="text-xs" style={{ color: "#8b8ba7" }}>
              {t.financial.annualOccupancyText} {occupancy}%.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold" style={{ color: "#f0f0fa" }}>
            {t.financial.scenarioPricing}
          </p>
          {pricing.map((item) => (
            <div key={`${item.label[language]}-${item.units}`} className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5" style={{ color }}>
                *
              </span>
              <PricingBlock
                color={color}
                title={`${item.label[language]} (${item.units} ${t.financial.unitsWord})`}
                monthlyPrice={item[scenario]}
                annualLabel={t.financial.annualRent}
                t={t}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t text-center" style={{ borderColor: "#2e2e3e" }}>
        <p className="text-xs" style={{ color: "#8b8ba7" }}>
          {t.financial.operatorFeeFixed}: <span style={{ color: "#f97316", fontWeight: "700" }}>{formatNumber(operatorFeeRate * 100)}%</span>
        </p>
      </div>
    </div>
  );
}
