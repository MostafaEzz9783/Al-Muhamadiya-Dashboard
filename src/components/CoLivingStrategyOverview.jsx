import { motion } from "framer-motion";
import { BedDouble, LayoutGrid, Sparkles, TrendingUp } from "lucide-react";

const strategyCardMotion = {
  whileHover: { scale: 1.01, y: -2 },
  transition: { duration: 0.2, ease: "easeOut" },
};

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

const insightIcons = [Sparkles, LayoutGrid, TrendingUp, BedDouble];

export default function CoLivingStrategyOverview({ strategyKey, setStrategyKey, strategyEntries, selectedStrategy, t }) {
  const language = t.meta.language;
  const selectorLabel = t.financial.operationalStrategy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-2xl border p-6 mb-6"
      style={{ backgroundColor: "#17172a", borderColor: "#2e2e3e" }}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-5">
        <div>
          <p className="text-xs font-semibold mb-2" style={{ color: "#8b8ba7" }}>
            {selectorLabel}
          </p>
          <h3 className="text-lg font-black" style={{ color: "#f0f0fa" }}>
            {t.financial.coLivingStrategiesTitle}
          </h3>
          <p className="text-sm mt-2 max-w-2xl" style={{ color: "#a6a6c2" }}>
            {t.financial.coLivingStrategiesSubtitle}
          </p>
        </div>

        <div className="flex gap-1 rounded-xl p-1 self-start" style={{ backgroundColor: "#1e1e2e" }}>
          {strategyEntries.map(([key, strategy]) => (
            <button
              key={key}
              type="button"
              onClick={() => setStrategyKey(key)}
              className="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              style={{
                backgroundColor: strategyKey === key ? "#60a5fa" : "transparent",
                color: strategyKey === key ? "#0f0f1a" : "#8b8ba7",
              }}
            >
              {strategy.selectorLabel[language]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5">
        {strategyEntries.map(([key, strategy]) => {
          const isActive = key === strategyKey;

          return (
            <motion.div
              key={key}
              className="rounded-2xl border p-5"
              style={{
                backgroundColor: isActive ? "#20243a" : "#121225",
                borderColor: isActive ? "rgba(96, 165, 250, 0.55)" : "#2e2e3e",
                boxShadow: isActive ? "0 18px 40px rgba(96, 165, 250, 0.12)" : "none",
              }}
              whileHover={strategyCardMotion.whileHover}
              transition={strategyCardMotion.transition}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: isActive ? "#93c5fd" : "#8b8ba7" }}>
                    {strategy.selectorLabel[language]}
                  </p>
                  <h4 className="text-base font-black" style={{ color: "#f8fafc" }}>
                    {strategy.title[language]}
                  </h4>
                </div>
                <span
                  className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold"
                  style={{
                    backgroundColor: isActive ? "rgba(59, 130, 246, 0.18)" : "rgba(148, 163, 184, 0.12)",
                    color: isActive ? "#bfdbfe" : "#94a3b8",
                  }}
                >
                  {strategy.focusPill[language]}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color: "#cbd5e1" }}>
                {strategy.description[language]}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <MiniMetric
                  label={t.financial.inventoryImpact}
                  value={`${formatNumber(strategy.inventoryCount)} ${t.financial.unitsWord}`}
                  note={strategy.inventoryDescription[language]}
                  color={isActive ? "#60a5fa" : "#94a3b8"}
                />
                <MiniMetric
                  label={t.financial.strategyFocus}
                  value={strategy.emphasis[language]}
                  note={strategy.focusPill[language]}
                  color={isActive ? "#34d399" : "#94a3b8"}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-2xl border p-5 mb-5" style={{ backgroundColor: "#121225", borderColor: "#2e2e3e" }}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h4 className="text-sm font-black mb-2" style={{ color: "#f8fafc" }}>
              {t.financial.managerialInsightTitle}
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: "#a6a6c2" }}>
              {t.financial.managerialInsight}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {strategyEntries.map(([key, strategy]) => (
            <div key={key} className="rounded-xl border p-4" style={{ backgroundColor: "#17172a", borderColor: key === strategyKey ? "rgba(52, 211, 153, 0.35)" : "#2e2e3e" }}>
              <p className="text-sm font-black mb-3" style={{ color: "#f0f0fa" }}>
                {strategy.title[language]}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {strategy.merits[language].map((item, index) => {
                  const Icon = insightIcons[index % insightIcons.length];

                  return (
                    <div key={item} className="flex items-start gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: "#1e1e2e" }}>
                      <Icon size={14} style={{ color: "#60a5fa", marginTop: 2 }} />
                      <span className="text-xs leading-relaxed" style={{ color: "#cbd5e1" }}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-4">
        <div className="rounded-2xl border p-5" style={{ backgroundColor: "#121225", borderColor: "#2e2e3e" }}>
          <h4 className="text-sm font-black mb-2" style={{ color: "#f8fafc" }}>
            {t.financial.pricingAssumptionsTitle}
          </h4>
          <p className="text-sm mb-4" style={{ color: "#a6a6c2" }}>
            {t.financial.pricingAssumptionsSubtitle}
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            {[
              { key: "best", color: "#34d399" },
              { key: "base", color: "#60a5fa" },
              { key: "worst", color: "#f97316" },
            ].map((item) => (
              <div key={item.key} className="rounded-xl border px-4 py-3 min-w-[120px]" style={{ backgroundColor: "#1a1a2e", borderColor: "#2e2e3e" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#8b8ba7" }}>
                  {t.financial.scenarios[item.key]}
                </p>
                <p className="text-lg font-black" style={{ color: item.color }}>
                  SAR {formatNumber(selectedStrategy.pricing[0][item.key])}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedStrategy.pricingFactors[language].map((factor) => (
              <span
                key={factor}
                className="inline-flex rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: "#1e293b", color: "#cbd5e1" }}
              >
                {factor}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border p-5" style={{ backgroundColor: "#121225", borderColor: "#2e2e3e" }}>
          <h4 className="text-sm font-black mb-2" style={{ color: "#f8fafc" }}>
            {t.financial.inventoryConceptTitle}
          </h4>
          <p className="text-sm mb-4" style={{ color: "#a6a6c2" }}>
            {t.financial.inventoryConceptSubtitle}
          </p>

          <div className="space-y-3">
            {strategyEntries.map(([key, strategy]) => (
              <div key={key} className="rounded-xl border p-4" style={{ backgroundColor: key === strategyKey ? "#1c2436" : "#17172a", borderColor: key === strategyKey ? "rgba(96, 165, 250, 0.45)" : "#2e2e3e" }}>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="text-sm font-black" style={{ color: "#f0f0fa" }}>
                    {strategy.selectorLabel[language]}
                  </p>
                  <span className="text-xs font-semibold rounded-full px-2.5 py-1" style={{ backgroundColor: "#1e293b", color: "#93c5fd" }}>
                    {formatNumber(strategy.inventoryCount)} {t.financial.unitsWord}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#a6a6c2" }}>
                  {strategy.inventoryDescription[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MiniMetric({ label, value, note, color }) {
  return (
    <div className="rounded-xl border p-4" style={{ backgroundColor: "#17172a", borderColor: "#2e2e3e" }}>
      <p className="text-xs font-semibold mb-1" style={{ color: "#8b8ba7" }}>
        {label}
      </p>
      <p className="text-sm font-black mb-1" style={{ color }}>
        {value}
      </p>
      <p className="text-xs leading-relaxed" style={{ color: "#a6a6c2" }}>
        {note}
      </p>
    </div>
  );
}
