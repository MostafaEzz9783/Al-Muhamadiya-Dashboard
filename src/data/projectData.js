export const MARKET_VALIDATION_URL = "/files/Financial%20Study-%20Al%20Muhamadiya%20%281%29.xlsx";

export const projectData = {
  mapUrl: "https://maps.app.goo.gl/LW8zg1pMaMkTQQvt5?g_st=ic",
  executiveUnits: 14,
  executiveUnitType: "1BR",
  coreSharedRooms: 28,
  addedSharedRooms: 4,
  totalCoLivingRooms: 32,
  location: {
    ar: "حي المحمدية",
    en: "Al Muhamadiya",
  },
  locationSubtext: {
    ar: "الرياض، المملكة العربية السعودية",
    en: "Riyadh, Saudi Arabia",
  },
  modelValue: {
    ar: "تنفيذي طويل الأجل / سكن مشترك",
    en: "Executive LTR / Co-Living",
  },
  modelSubtext: {
    ar: "نموذجان تشغيليان من نفس الأصل العقاري",
    en: "Two operating models from the same property",
  },
  overviewDescription: {
    ar:
      "يعرض مشروع المحمدية أصلًا سكنيًا في الرياض يمكن تشغيله كنموذج تنفيذي طويل الأجل من 14 وحدة 1BR، أو كنموذج سكن مشترك من 32 غرفة بعد إضافة 4 غرف مشتركة من خلال إعادة توزيع أجزاء من الصالات.",
    en:
      "Al Muhamadiya is a Riyadh residential asset that can operate either as a 14-unit Executive LTR project or as a 32-room co-living layout after adding 4 shared rooms through selective living-area conversion.",
  },
  features: {
    ar: [
      "800 متر إلى محطة مترو التخصصي.",
      "4.9 كم إلى جامعة الملك سعود.",
      "14 وحدة تنفيذية من نوع 1BR في نموذج التأجير طويل الأجل.",
      "32 غرفة سكن مشترك في السيناريو التشغيلي الثاني.",
      "إضافة 4 غرف مشتركة عبر تقسيم أجزاء من الصالات في الوحدات المناسبة.",
      "اللوحات المالية مبنية على lookup ثابت من الدراسة المرئية فقط.",
    ],
    en: [
      "800m to Altakhasusi Metro Station.",
      "4.9 KM to KSU.",
      "14 executive 1BR apartments in the long-term rental model.",
      "32 co-living rooms in the second operating scenario.",
      "4 shared rooms are created by partitioning selected living areas.",
      "Financial lookups are driven by the visible source study sheets only.",
    ],
  },
  inventoryHighlights: [
    {
      count: 14,
      label: {
        ar: "وحدات 1BR التنفيذية",
        en: "Executive 1BR Units",
      },
      note: {
        ar: "مخرجات Exec LTR Financial Study",
        en: "From Exec LTR Financial Study",
      },
    },
    {
      count: 28,
      label: {
        ar: "الغرف المشتركة الأساسية",
        en: "Core Shared Rooms",
      },
      note: {
        ar: "الجرد الحالي القابل للتشغيل",
        en: "Current operating inventory",
      },
    },
    {
      count: 4,
      label: {
        ar: "الغرف المشتركة المضافة",
        en: "Added Shared Rooms",
      },
      note: {
        ar: "ناتجة عن تقسيم جزء من الصالة",
        en: "Created by living-area partitioning",
      },
    },
    {
      count: 32,
      label: {
        ar: "إجمالي غرف السكن المشترك",
        en: "Total Co-Living Rooms",
      },
      note: {
        ar: "سيناريو 2 من الدراسة",
        en: "Scenario 2 from the study",
      },
    },
  ],
  inventoryTable: [
    {
      type: {
        ar: "1BR تنفيذية",
        en: "Executive 1BR",
      },
      count: 14,
      use: {
        ar: "تشغيل طويل الأجل",
        en: "Long-term executive leasing",
      },
    },
    {
      type: {
        ar: "غرف مشتركة أساسية",
        en: "Core Shared Rooms",
      },
      count: 28,
      use: {
        ar: "السكن المشترك قبل التوسعة",
        en: "Co-living before expansion",
      },
    },
    {
      type: {
        ar: "غرف مشتركة مضافة",
        en: "Added Shared Rooms",
      },
      count: 4,
      use: {
        ar: "غرف مستحدثة من الصالات",
        en: "New rooms carved from living areas",
      },
    },
    {
      type: {
        ar: "إجمالي السكن المشترك",
        en: "Total Co-Living Stock",
      },
      count: 32,
      use: {
        ar: "سيناريو التشغيل المقترح",
        en: "Recommended operating scenario",
      },
    },
  ],
  marketBenchmarks: [
    {
      label: {
        ar: "حد السعر المحافظ",
        en: "Conservative Band",
      },
      value: 7924.432917,
      note: {
        ar: "من Master-Data / Exec LTR",
        en: "From Master-Data / Exec LTR",
      },
    },
    {
      label: {
        ar: "سعر الأساس التنفيذي",
        en: "Base Executive Rate",
      },
      value: 9663.883125,
      note: {
        ar: "متوسط الوحدة التنفيذية",
        en: "Average executive unit rate",
      },
    },
    {
      label: {
        ar: "حد السعر المتفائل",
        en: "Optimistic Band",
      },
      value: 11403.33333,
      note: {
        ar: "أعلى تسعير مرصود",
        en: "Highest observed pricing band",
      },
    },
  ],
};

export default projectData;
