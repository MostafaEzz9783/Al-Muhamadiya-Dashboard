export const coLivingModel = {
  key: "coLiving",
  labelKey: "coLiving",
  operatorFeeRate: 0.2,
  recommendedOccupancy: 80,
  unitCount: 32,
  contextDescription: {
    ar:
      "يعتمد نموذج السكن المشترك في مشروع المحمدية على سيناريو التشغيل الثاني من الملف، بإجمالي 32 غرفة بعد إضافة 4 غرف جديدة من الصالات، مع lookup ثابت عبر إشغالات 50% إلى 90%.",
    en:
      "The Al Muhamadiya co-living model uses Scenario 2 from the workbook, reaching 32 total rooms after adding 4 new shared rooms, with static lookups across 50% to 90% occupancy.",
  },
  pricing: [
    {
      label: {
        ar: "غرفة مشتركة",
        en: "Shared Room",
      },
      units: 32,
      worst: 3900,
      base: 4200,
      best: 4700,
    },
  ],
  scenarios: {
    worst: {
      revenueAt100: 1357200,
      occupancy: {
        50: { revenue: 678600, netRevenue: 542880, annualPerUnit: 16965, monthlyPerUnit: 1413.75 },
        60: { revenue: 814320, netRevenue: 651456, annualPerUnit: 20358, monthlyPerUnit: 1696.5 },
        70: { revenue: 950040, netRevenue: 760032, annualPerUnit: 23751, monthlyPerUnit: 1979.25 },
        80: { revenue: 1085760, netRevenue: 868608, annualPerUnit: 27144, monthlyPerUnit: 2262 },
        90: { revenue: 1221480, netRevenue: 977184, annualPerUnit: 30537, monthlyPerUnit: 2544.75 },
      },
    },
    base: {
      revenueAt100: 1461600,
      occupancy: {
        50: { revenue: 730800, netRevenue: 584640, annualPerUnit: 18270, monthlyPerUnit: 1522.5 },
        60: { revenue: 876960, netRevenue: 701568, annualPerUnit: 21924, monthlyPerUnit: 1827 },
        70: { revenue: 1023120, netRevenue: 818496, annualPerUnit: 25578, monthlyPerUnit: 2131.5 },
        80: { revenue: 1169280, netRevenue: 935424, annualPerUnit: 29232, monthlyPerUnit: 2436 },
        90: { revenue: 1315440, netRevenue: 1052352, annualPerUnit: 32886, monthlyPerUnit: 2740.5 },
      },
    },
    best: {
      revenueAt100: 1635600,
      occupancy: {
        50: { revenue: 817800, netRevenue: 654240, annualPerUnit: 20445, monthlyPerUnit: 1703.75 },
        60: { revenue: 981360, netRevenue: 785088, annualPerUnit: 24534, monthlyPerUnit: 2044.5 },
        70: { revenue: 1144920, netRevenue: 915936, annualPerUnit: 28623, monthlyPerUnit: 2385.25 },
        80: { revenue: 1308480, netRevenue: 1046784, annualPerUnit: 32712, monthlyPerUnit: 2726 },
        90: { revenue: 1472040, netRevenue: 1177632, annualPerUnit: 36801, monthlyPerUnit: 3066.75 },
      },
    },
  },
};

export default coLivingModel;
