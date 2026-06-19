import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = content;
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key;
      }
    }
    return result[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const content = {
  nav: {
    home: { en: 'Home', ar: 'الرئيسية' },
    about: { en: 'About', ar: 'عني' },
    services: { en: 'Services', ar: 'الخدمات' },
    transformations: { en: 'Results', ar: 'النتائج' },
    testimonials: { en: 'Reviews', ar: 'التقييمات' },
    contact: { en: 'Contact', ar: 'تواصل معي' },
  },
  hero: {
    badge: { en: 'Sports & Bodybuilding Dietitian', ar: 'أخصائية تغذية رياضية وكمال أجسام' },
    title: { en: 'Build Muscle. Burn Fat. Eat Real Food.', ar: 'ابنِ العضلات. أحرق الدهون. كُل طعاماً حقيقياً.' },
    subtitle: { en: 'Personalized nutrition plans and home-delivered meal preps designed for athletes, bodybuilders, and anyone serious about their physique.', ar: 'خطط تغذية مخصصة وخطط وجبات منزلية مصممة للرياضيين وهواة كمال الأجسام وكل من يجدّ في تحسين جسمه.' },
    cta: { en: 'Get My Plan', ar: 'احصل على خطتي' },
  },
  about: {
    title: { en: 'Meet Nour', ar: 'تعرف على نور' },
    name: { en: 'Nour Al-Hassan', ar: 'نور الحسن' },
    badge1: { en: 'Certified Sports Nutritionist', ar: 'أخصائية تغذية رياضية معتمدة' },
    badge2: { en: '8+ Years Experience', ar: 'أكثر من 8 سنوات خبرة' },
    badge3: { en: 'Home Meal Plans', ar: 'خطط وجبات منزلية' },
    bio: { en: 'I specialize in sports nutrition and body recomposition — helping athletes, gym-goers, and bodybuilders fuel their training, maximize muscle gain, and shred fat without sacrificing performance. Every plan I create is built around your schedule, your goals, and real food you can prepare at home.', ar: 'أتخصص في التغذية الرياضية وإعادة تكوين الجسم — مساعدة الرياضيين وعشاق الجيم وهواة كمال الأجسام على تغذية تدريبهم وتعظيم بناء العضلات وحرق الدهون دون التضحية بالأداء. كل خطة أضعها مبنية على جدولك الزمني وأهدافك وطعام حقيقي يمكنك تحضيره في المنزل.' },
    stat1_num: { en: '500+', ar: '+500' },
    stat1_label: { en: 'Athletes Transformed', ar: 'رياضي تم تحويلهم' },
    stat2_num: { en: '8+', ar: '+8' },
    stat2_label: { en: 'Years Experience', ar: 'سنوات خبرة' },
    stat3_num: { en: '97%', ar: '%97' },
    stat3_label: { en: 'Client Satisfaction', ar: 'رضا العملاء' },
  },
  services: {
    title: { en: 'What I Offer', ar: 'ما أقدمه' },
    subtitle: { en: 'Nutrition solutions built for performance, muscle, and real results', ar: 'حلول تغذية مبنية للأداء والعضلات والنتائج الحقيقية' },
    items: [
      {
        title: { en: 'Muscle Building Plans', ar: 'خطط بناء العضلات' },
        desc: { en: 'Science-backed calorie and macro plans to maximize lean muscle growth and strength.', ar: 'خطط سعرات حرارية وماكرو مدعومة علمياً لتعظيم نمو العضلات الخالية من الدهون والقوة.' }
      },
      {
        title: { en: 'Fat Loss & Shredding', ar: 'حرق الدهون والتنشيف' },
        desc: { en: 'Strategic deficit protocols that preserve muscle while dropping body fat fast.', ar: 'بروتوكولات عجز استراتيجية تحافظ على العضلات مع خفض نسبة الدهون بسرعة.' }
      },
      {
        title: { en: 'Home Meal Plans', ar: 'خطط وجبات منزلية' },
        desc: { en: 'Ready-to-cook weekly meal plans delivered to your phone — high protein, delicious, easy.', ar: 'خطط وجبات أسبوعية جاهزة للطبخ تُرسل إلى هاتفك — غنية بالبروتين، لذيذة، وسهلة.' }
      },
      {
        title: { en: 'Body Recomposition', ar: 'إعادة تكوين الجسم' },
        desc: { en: 'Simultaneously gain muscle and lose fat with precision nutrition programming.', ar: 'اكسب العضلات وأحرق الدهون في نفس الوقت مع برمجة تغذية دقيقة.' }
      },
      {
        title: { en: 'Competition Prep', ar: 'التحضير للمسابقات' },
        desc: { en: 'Peak-week and stage-ready nutrition for bodybuilding and physique competitions.', ar: 'تغذية الأسبوع الذروة والاستعداد للمسرح لمسابقات كمال الأجسام.' }
      },
      {
        title: { en: 'Online Coaching', ar: 'التدريب الإلكتروني' },
        desc: { en: 'Monthly check-ins, plan adjustments, and direct WhatsApp support — wherever you are.', ar: 'متابعة شهرية وتعديلات على الخطة ودعم مباشر عبر واتساب — أينما كنت.' }
      }
    ]
  },
  transformations: {
    title: { en: 'Real Transformations', ar: 'تحولات حقيقية' },
    subtitle: { en: 'No filters. No shortcuts. Just real people, real food, real results.', ar: 'لا فلاتر. لا اختصارات. فقط أشخاص حقيقيون، طعام حقيقي، نتائج حقيقية.' },
    items: [
      { label: { en: '+12kg Muscle in 6 months', ar: '+12 كجم عضلات في 6 أشهر' }, quote: { en: "The home meal plan made it so easy — I hit my macros every day without thinking.", ar: "خطة الوجبات المنزلية جعلت الأمر سهلاً جداً — حققت ماكرو يومياً دون تفكير." } },
      { label: { en: '-18kg Fat in 4 months', ar: '-18 كجم دهون في 4 أشهر' }, quote: { en: "I finally got the six pack I trained 3 years for. The nutrition was the missing piece.", ar: "حصلت أخيراً على السداسية التي تدربت عليها 3 سنوات. التغذية كانت القطعة المفقودة." } },
      { label: { en: 'Full Body Recomp', ar: 'إعادة تكوين كامل للجسم' }, quote: { en: "Gained muscle and lost fat at the same time — I didn't believe it was possible.", ar: "اكتسبت عضلات وخسرت دهوناً في نفس الوقت — لم أكن أصدق أن ذلك ممكناً." } },
      { label: { en: 'Competition Ready', ar: 'جاهزة للمسابقة' }, quote: { en: "Placed 1st in my first physique competition. Nour's prep plan was flawless.", ar: "حصلت على المركز الأول في أول مسابقة لياقة. خطة نور للتحضير كانت مثالية." } }
    ]
  },
  testimonials: {
    title: { en: 'What Athletes Say', ar: 'ماذا يقول الرياضيون' },
    items: [
      { name: { en: 'Khalid S.', ar: 'خالد س.' }, role: { en: 'Powerlifter', ar: 'رافع أثقال' }, text: { en: "Best investment I made for my training. Gained 8kg of muscle in 3 months with her bulking plan.", ar: "أفضل استثمار قمت به لتدريبي. اكتسبت 8 كجم من العضلات في 3 أشهر مع خطة الضخامة." } },
      { name: { en: 'Rania M.', ar: 'رانيا م.' }, role: { en: 'Fitness Competitor', ar: 'منافسة لياقة' }, text: { en: "Her competition prep is next level. I came in shredded and won my first show.", ar: "التحضير للمسابقات عندها على مستوى آخر. جئت منشفاً وفزت في أول عرض لي." } },
      { name: { en: 'Omar T.', ar: 'عمر ت.' }, role: { en: 'Gym Enthusiast', ar: 'عاشق الجيم' }, text: { en: "The home meal plans are a game changer. High protein, tasty, and I prepare everything in 1 hour on Sundays.", ar: "خطط الوجبات المنزلية غيّرت اللعبة. غنية بالبروتين، لذيذة، وأجهز كل شيء في ساعة واحدة يوم الأحد." } },
      { name: { en: 'Fatima A.', ar: 'فاطمة أ.' }, role: { en: 'Bodybuilder', ar: 'لاعبة كمال أجسام' }, text: { en: "Lost 15kg of fat while maintaining all my muscle. Nour truly understands body recomposition.", ar: "خسرت 15 كجم من الدهون مع الحفاظ على كل عضلاتي. نور تفهم حقاً إعادة تكوين الجسم." } }
    ]
  },
  footer: {
    tagline: { en: 'Build Muscle. Burn Fat. Eat Real Food.', ar: 'ابنِ العضلات. أحرق الدهون. كُل طعاماً حقيقياً.' },
    rights: { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' }
  }
};