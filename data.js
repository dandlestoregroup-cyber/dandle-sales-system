export const DANDLE_COLORS = {
    primary: '#F37A1D',
    background: '#F8F5F0',
    text: '#2E2E2E',
    accent: '#A68A64',
};
  
export const users = {
    '456789': { name: 'Mohamed Hassan', branch: 'Citystars', nameAr: 'محمد حسن', branchAr: 'سيتي ستارز', id: 'mohamed_hassan', role: 'sales' },
    '234567': { name: 'Amira Khalil', branch: 'Al-Sawalhi', nameAr: 'أميرة خليل', branchAr: 'السواحل', id: 'amira_khalil', role: 'ops' },
    '345678': { name: 'Omar Farouk', branch: 'Mohandeseen', nameAr: 'عمر فاروق', branchAr: 'المهندسين', id: 'omar_farouk', role: 'finance' },
    '567890': { name: 'Sarah Ahmed', branch: 'Smouha', nameAr: 'سارة أحمد', branchAr: 'سموحة', id: 'sarah_ahmed', role: 'leadership' },
};
  
export const productData = {
    relaxmax: {
        manual: { price: 21900 * 1.1, nameAr: 'ريلاكس ماكس يدوي', nameEn: 'RelaxMax Manual' },
        power: { price: 28900 * 1.1, nameAr: 'ريلاكس ماكس كهربائي', nameEn: 'RelaxMax Power' }
    },
    diva: {
        manual: { price: 23900 * 1.1, nameAr: 'ديفا يدوي', nameEn: 'Diva Manual' },
        power: { price: 30900 * 1.1, nameAr: 'ديفا كهربائي', nameEn: 'Diva Power' }
    },
    comfortplus: {
        power: { price: 36900 * 1.1, nameAr: 'كومفورت بلس كهربائي', nameEn: 'ComfortPlus Power' }
    },
    cozycompanion: {
        loveseat: { price: 34900 * 1.1, nameAr: 'كوزي كومبانيون', nameEn: 'CozyCompanion Loveseat' }
    }
};
  
export const addOns = [
    { id: 'cupholders', nameEn: 'Cup Holders', nameAr: 'حاملات الأكواب', price: 450 },
    { id: 'usb', nameEn: 'USB Charging', nameAr: 'شحن USB', price: 750 },
    { id: 'pocket', nameEn: 'Side Pocket', nameAr: 'جيب جانبي', price: 350 }
];
  
export const colorOptions = [
    { value: 'Red', ar: 'أحمر' },
    { value: 'Blue', ar: 'أزرق' },
    { value: 'Green', ar: 'أخضر' },
    { value: 'Yellow', ar: 'أصفر' },
    { value: 'Brown', ar: 'بني' },
    { value: 'Black', ar: 'أسود' },
    { value: 'Gray', ar: 'رمادي' },
];
  
export const translations = {
    welcomeBack: { ar: "مرحباً بك مرة أخرى", en: "Welcome Back" },
    enterPin: { ar: "أدخل الرمز السري المكون من 6 أرقام", en: "Enter your 6-digit PIN" },
    login: { ar: "تسجيل الدخول", en: "Login" },
    invalidPin: { ar: "رمز خاطئ، حاول مرة أخرى", en: "Invalid PIN, try again" },
    dashboard: { ar: "لوحة التحكم", en: "Dashboard" },
    orderForm: { ar: "نموذج الطلب", en: "Order Form" },
    salesWiki: { ar: "ويكي المبيعات", en: "Sales Wiki" },
    dailyQuiz: { ar: "الاختبار اليومي", en: "Daily Quiz" },
    brandPromise: { ar: "راحتك، وعدنا - حيث يلتقي التميز بالأناقة لمن يرفضون قبول أي شيء أقل من الأفضل", en: "Your Comfort, Our Promise - Where excellence meets elegance, for those who refuse to accept anything less than the best" },
    productSelection: { ar: "اختيار المنتج", en: "Product Selection" },
    customerInfo: { ar: "معلومات العميل", en: "Customer Information" },
    quantity: { ar: "الكمية", en: "Quantity" },
    color: { ar: "اللون", en: "Color" },
    addOns: { ar: "الإضافات", en: "Add-ons" },
    submitOrder: { ar: "إرسال الطلب", en: "Submit Order" },
    generateQR: { ar: "إنشاء رمز QR للدفع", en: "Generate QR for Payment" },
    urgentOrder: { ar: "طلب مستعجل (+2,500 جنيه)", en: "Urgent Order (+2,500 EGP)" },
    customerName: { ar: "اسم العميل", en: "Customer Name" },
    customerPhone: { ar: "هاتف العميل", en: "Customer Phone" },
    logout: { ar: "تسجيل الخروج", en: "Logout" },
    variant: { ar: "النوع", en: "Variant" },
    orderTotal: { ar: 'إجمالي الطلب', en: 'Order Total' },
    subtotal: { ar: 'المجموع الفرعي', en: 'Subtotal' },
    commission: { ar: 'العمولة (3.5%)', en: 'Commission (3.5%)' },
    total: { ar: 'الإجمالي النهائي', en: 'Final Total' },
    search: { ar: "بحث", en: "Search" },
    startQuiz: { ar: "بدء الاختبار", en: "Start Quiz" },
    nextQuestion: { ar: "السؤال التالي", en: "Next Question" },
    finishQuiz: { ar: "إنهاء الاختبار", en: "Finish Quiz" },
    yourScore: { ar: "نتيجتك", en: "Your Score" },
    explanation: { ar: "التوضيح", en: "Explanation" },
    currentScore: { ar: "النتيجة الحالية", en: "Current Score" }
};
  
export const productStories = {
    relaxmax: { 
        headline: { ar: "ملاذك بعد يوم من الإنجازات", en: "Your Sanctuary After a Day of Achievements" }, 
        story: { ar: "كل تفصيلة صُنعت بعناية… كل لحظة وُعدت بها تقترب. كرسيك، بفخره الهادئ، يشق طريقه نحوك.", en: "Every detail crafted with care. Every moment anticipated. Your chair of quiet pride is on its way to you." }, 
        features: { ar: ["تقنية زيرو جرافيتي لصحة القلب", "انحناء 170° للاسترخاء المطلق", "تصميم تنفيذي يعكس نجاحك"], en: ["Zero Gravity technology for heart health", "170° recline for ultimate relaxation", "Executive design reflecting your success"] }, 
        variants: ['manual', 'power'] 
    },
    diva: { 
        headline: { ar: "أناقة تفرض الإعجاب", en: "Elegance That Commands Admiration" }, 
        story: { ar: "للشخصية التي لا تتلاشى في الزحام. كرسيك، عرش الثقة، ينتظر لحظة انتمائك.", en: "For the personality that never fades in the crowd. Your throne of confidence awaits your moment of belonging." }, 
        features: { ar: ["7 ألوان مميزة تعكس شخصيتك", "تصميم عصري بخامات فاخرة", "قطعة تلفت الأنظار"], en: ["7 signature colors reflecting your personality", "Modern design with premium materials", "A statement piece that captivates"] }, 
        variants: ['manual', 'power'] 
    },
    comfortplus: { 
        headline: { ar: "راحة طبية بلمسة فاخرة", en: "Medical Comfort with a Touch of Luxury" }, 
        story: { ar: "حيث تلتقي العافية بالأناقة. جلسة علاجية يومية في ملاذك الخاص.", en: "Where wellness meets elegance. Your daily therapy session in your private sanctuary." }, 
        features: { ar: ["إرجونوميا طبية للصحة", "وضعيات علاجية لتخفيف الألم", "استثمار في العافية طويلة المدى"], en: ["Medical-grade ergonomics for health", "Therapeutic positioning for pain relief", "Investment in long-term wellbeing"] }, 
        variants: ['power'] 
    },
    cozycompanion: { 
        headline: { ar: "دفء العائلة وأناقتها", en: "Family Warmth and Elegance" }, 
        story: { ar: "حيث تجتمع العائلة وتُصنع الذكريات. مقعد الحب ينتظر لحظاتكم الثمينة.", en: "Where families gather and memories are made. Your loveseat of warmth awaits your precious moments." }, 
        features: { ar: ["تصميم لشخصين مع راحة فائقة", "مساند أكواب مدمجة", "مثالي للمساحات العائلية"], en: ["Two-person design with superior comfort", "Built-in cup holders", "Perfect for family spaces"] }, 
        variants: ['loveseat'] 
    }
};
  
export const wikiContent = {
    productMastery: { 
        title: { ar: "إتقان المنتجات", en: "Product Mastery" }, 
        sections: { 
            relaxmax: { 
                title: { ar: "ريلاكس ماكس", en: "RelaxMax" }, 
                content: { ar: "كرسي الاسترخاء الأمثل مع تقنية زيرو جرافيتي. مثالي للتنفيذيين الذين يستحقون ملاذاً هادئاً. يوفر انحناء 170 درجة وراحة استثنائية.", en: "The ultimate relaxation chair with Zero Gravity technology. Perfect for executives deserving a quiet sanctuary. Offers 170-degree recline and exceptional comfort." } 
            }
        }
    }
};
  
export const quizData = {
    day1: {
        title: { ar: "أساسيات المنتجات", en: "Product Fundamentals" },
        questions: [
            { 
                question: { ar: "ما هي التقنية المتقدمة المتوفرة في RelaxMax؟", en: "What advanced technology is available in RelaxMax?" }, 
                options: [
                    { ar: "تقنية زيرو جرافيتي", en: "Zero Gravity technology" }, 
                    { ar: "تقنية التدليك", en: "Massage technology" }, 
                    { ar: "تقنية التبريد", en: "Cooling technology" }, 
                    { ar: "تقنية التدفئة", en: "Heating technology" }
                ], 
                correct: 0, 
                explanation: { ar: "تقنية زيرو جرافيتي تحسن الدورة الدموية وصحة القلب عبر رفع الساقين فوق مستوى القلب", en: "Zero Gravity technology improves blood circulation and heart health by elevating legs above heart level" } 
            }
        ]
    }
};

