export const executiveModel = {
  key: "executive",
  labelKey: "executiveLtr",
  operatorFeeRate: 0.15,
  recommendedOccupancy: 80,
  unitCount: 14,
  contextDescription: {
    ar:
      "يعرض نموذج التأجير التنفيذي طويل الأجل في مشروع المحمدية 14 وحدة من نوع 1BR، مع ربط مباشر بجدول LTR Study Summary واستخدام lookup ثابت عبر السيناريو والإشغال.",
    en:
      "The Al Muhamadiya Executive LTR view covers 14 one-bedroom units, mapped directly from the LTR Study Summary with static lookup values by scenario and occupancy.",
  },
  pricing: [
    {
      label: {
        ar: "1BR",
        en: "1BR",
      },
      units: 14,
      worst: 7924.432917,
      base: 9663.883125,
      best: 11403.33333,
    },
  ],
  scenarios: {
    worst: {
      revenueAt100: 1331304.73,
      occupancy: {
        50: { revenue: 665652.365, netRevenue: 565804.5103, annualPerUnit: 40414.60788, monthlyPerUnit: 3367.88399 },
        60: { revenue: 798782.838, netRevenue: 678965.4123, annualPerUnit: 48497.52945, monthlyPerUnit: 4041.460788 },
        70: { revenue: 931913.311, netRevenue: 792126.3144, annualPerUnit: 56580.45103, monthlyPerUnit: 4715.037585 },
        80: { revenue: 1065043.784, netRevenue: 905287.2164, annualPerUnit: 64663.3726, monthlyPerUnit: 5388.614383 },
        90: { revenue: 1198174.257, netRevenue: 1018448.118, annualPerUnit: 72746.29418, monthlyPerUnit: 6062.191181 },
      },
    },
    base: {
      revenueAt100: 1623532.365,
      occupancy: {
        50: { revenue: 811766.1825, netRevenue: 690001.2551, annualPerUnit: 49285.80394, monthlyPerUnit: 4107.150328 },
        60: { revenue: 974119.419, netRevenue: 828001.5062, annualPerUnit: 59142.96473, monthlyPerUnit: 4928.580394 },
        70: { revenue: 1136472.656, netRevenue: 966001.7572, annualPerUnit: 69000.12551, monthlyPerUnit: 5750.010459 },
        80: { revenue: 1298825.892, netRevenue: 1104002.008, annualPerUnit: 78857.2863, monthlyPerUnit: 6571.440525 },
        90: { revenue: 1461179.129, netRevenue: 1242002.259, annualPerUnit: 88714.44709, monthlyPerUnit: 7392.870591 },
      },
    },
    best: {
      revenueAt100: 1915760,
      occupancy: {
        50: { revenue: 957880, netRevenue: 814198, annualPerUnit: 58157, monthlyPerUnit: 4846.416667 },
        60: { revenue: 1149456, netRevenue: 977037.6, annualPerUnit: 69788.4, monthlyPerUnit: 5815.7 },
        70: { revenue: 1341032, netRevenue: 1139877.2, annualPerUnit: 81419.8, monthlyPerUnit: 6784.983333 },
        80: { revenue: 1532608, netRevenue: 1302716.8, annualPerUnit: 93051.2, monthlyPerUnit: 7754.266667 },
        90: { revenue: 1724184, netRevenue: 1465556.4, annualPerUnit: 104682.6, monthlyPerUnit: 8723.55 },
      },
    },
  },
};

export default executiveModel;
