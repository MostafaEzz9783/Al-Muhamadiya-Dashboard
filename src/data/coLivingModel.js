const sharedPricingBase = {
  label: {
    ar: "ماستر داخلي/خارجي",
    en: "Internal / External Master",
  },
  worst: 3900,
  base: 4200,
  best: 4700,
};

export const coLivingModel = {
  key: "coLiving",
  labelKey: "coLiving",
  defaultStrategy: "scenario2",
  strategies: {
    scenario1: {
      key: "scenario1",
      selectorLabel: {
        ar: "السيناريو 1",
        en: "Scenario 1",
      },
      title: {
        ar: "تجربة سكن راقية",
        en: "Elite Experience",
      },
      description: {
        ar: "يحافظ على المساحات المشتركة الأصلية ويركز على راحة الساكن، الخصوصية، وتموضع سكني أعلى جودة.",
        en: "Maintains the original common areas and leans into resident comfort, privacy, and premium positioning.",
      },
      contextDescription: {
        ar:
          "يعرض السيناريو 1 نموذج السكن المشترك دون تعديل المساحات المشتركة، مع 28 غرفة قابلة للتأجير وlookup ثابت عبر إشغالات 50% إلى 90%.",
        en:
          "Scenario 1 presents the co-living model without modifying the common areas, using 28 rentable rooms and static lookups across 50% to 90% occupancy.",
      },
      operatorFeeRate: 0.2,
      recommendedOccupancy: 80,
      unitCount: 28,
      inventoryCount: 28,
      inventoryDescription: {
        ar: "المساحات المشتركة الأصلية محفوظة",
        en: "Original shared areas preserved",
      },
      focusPill: {
        ar: "تموضع راقٍ وكثافة أقل",
        en: "Premium positioning with lower density",
      },
      emphasis: {
        ar: "تجربة الساكن",
        en: "Resident experience",
      },
      merits: {
        ar: [
          "تجربة سكن أعلى",
          "مساحات مشتركة أوسع",
          "تموضع راقٍ",
          "كثافة أقل",
        ],
        en: [
          "Higher resident experience",
          "More spacious shared areas",
          "Premium positioning",
          "Lower density",
        ],
      },
      pricingFactors: {
        ar: [
          "تصنيف الغرفة",
          "تهيئة الحمام",
          "موقع الغرفة الداخلي/الخارجي",
          "الاستراتيجية التشغيلية",
        ],
        en: [
          "Room classification",
          "Bathroom configuration",
          "Internal/external room positioning",
          "Operational layout strategy",
        ],
      },
      pricing: [
        {
          ...sharedPricingBase,
          units: 28,
        },
      ],
      scenarios: {
        worst: {
          revenueAt100: 1310400,
          occupancy: {
            50: { revenue: 655200, netRevenue: 524160, annualPerUnit: 18720, monthlyPerUnit: 1560 },
            60: { revenue: 786240, netRevenue: 628992, annualPerUnit: 22464, monthlyPerUnit: 1872 },
            70: { revenue: 917280, netRevenue: 733824, annualPerUnit: 26208, monthlyPerUnit: 2184 },
            80: { revenue: 1048320, netRevenue: 838656, annualPerUnit: 29952, monthlyPerUnit: 2496 },
            90: { revenue: 1179360, netRevenue: 943488, annualPerUnit: 33696, monthlyPerUnit: 2808 },
          },
        },
        base: {
          revenueAt100: 1411200,
          occupancy: {
            50: { revenue: 705600, netRevenue: 564480, annualPerUnit: 20160, monthlyPerUnit: 1680 },
            60: { revenue: 846720, netRevenue: 677376, annualPerUnit: 24192, monthlyPerUnit: 2016 },
            70: { revenue: 987840, netRevenue: 790272, annualPerUnit: 28224, monthlyPerUnit: 2352 },
            80: { revenue: 1128960, netRevenue: 903168, annualPerUnit: 32256, monthlyPerUnit: 2688 },
            90: { revenue: 1270080, netRevenue: 1016064, annualPerUnit: 36288, monthlyPerUnit: 3024 },
          },
        },
        best: {
          revenueAt100: 1579200,
          occupancy: {
            50: { revenue: 789600, netRevenue: 631680, annualPerUnit: 22560, monthlyPerUnit: 1880 },
            60: { revenue: 947520, netRevenue: 758016, annualPerUnit: 27072, monthlyPerUnit: 2256 },
            70: { revenue: 1105440, netRevenue: 884352, annualPerUnit: 31584, monthlyPerUnit: 2632 },
            80: { revenue: 1263360, netRevenue: 1010688, annualPerUnit: 36096, monthlyPerUnit: 3008 },
            90: { revenue: 1421280, netRevenue: 1137024, annualPerUnit: 40608, monthlyPerUnit: 3384 },
          },
        },
      },
    },
    scenario2: {
      key: "scenario2",
      selectorLabel: {
        ar: "السيناريو 2",
        en: "Scenario 2",
      },
      title: {
        ar: "تعظيم العائد الاستثماري",
        en: "ROI Optimization",
      },
      description: {
        ar: "يعيد توزيع جزء من المساحات المشتركة لإضافة غرف جديدة قابلة للتأجير وتعظيم الإيراد الكلي للمشروع.",
        en: "Reallocates part of the common area to add new rentable rooms and maximize total project revenue.",
      },
      contextDescription: {
        ar:
          "يعتمد السيناريو 2 في مشروع المحمدية على رفع كفاءة المخطط عبر إضافة 4 غرف جديدة، ليصل إجمالي المخزون القابل للتأجير إلى 32 غرفة مع lookup ثابت عبر إشغالات 50% إلى 90%.",
        en:
          "Scenario 2 increases layout efficiency by adding 4 new rooms, taking the rentable inventory to 32 rooms with static lookups across 50% to 90% occupancy.",
      },
      operatorFeeRate: 0.2,
      recommendedOccupancy: 80,
      unitCount: 32,
      inventoryCount: 32,
      inventoryDescription: {
        ar: "إضافة غرف جديدة من الصالات",
        en: "Additional rooms added from living areas",
      },
      focusPill: {
        ar: "كثافة أعلى وعائد أقوى",
        en: "Higher density with stronger returns",
      },
      emphasis: {
        ar: "تعظيم العائد",
        en: "Revenue optimization",
      },
      merits: {
        ar: [
          "تعظيم أعلى للإيراد",
          "زيادة المخزون القابل للتأجير",
          "كفاءة تشغيلية أعلى",
          "كثافة أعلى",
        ],
        en: [
          "Higher revenue optimization",
          "Increased rentable inventory",
          "Higher operational efficiency",
          "Higher density",
        ],
      },
      pricingFactors: {
        ar: [
          "تصنيف الغرفة",
          "تهيئة الحمام",
          "موقع الغرفة الداخلي/الخارجي",
          "الاستراتيجية التشغيلية",
        ],
        en: [
          "Room classification",
          "Bathroom configuration",
          "Internal/external room positioning",
          "Operational layout strategy",
        ],
      },
      pricing: [
        {
          ...sharedPricingBase,
          units: 32,
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
    },
  },
};

export default coLivingModel;
