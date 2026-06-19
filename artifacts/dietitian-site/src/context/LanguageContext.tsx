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
    transformations: { en: 'Transformations', ar: 'التحولات' },
    testimonials: { en: 'Testimonials', ar: 'آراء العملاء' },
    contact: { en: 'Contact', ar: 'تواصل معي' },
  },
  hero: {
    title: { en: 'Transform Your Life Through Food', ar: 'غيّر حياتك من خلال الغذاء' },
    subtitle: { en: 'Achieve sustainable health goals with personalized nutrition plans tailored to your unique body and lifestyle.', ar: 'حقق أهدافاً صحية مستدامة من خلال خطط تغذية مخصصة لتناسب جسمك وأسلوب حياتك.' },
    cta: { en: 'Book Consultation', ar: 'احجز استشارة' },
  },
  about: {
    title: { en: 'Meet Nour', ar: 'تعرف على نور' },
    name: { en: 'Nour Al-Hassan', ar: 'نور الحسن' },
    bio: { en: 'Certified Clinical Dietitian with 8+ years of experience helping clients achieve sustainable health goals through personalized nutrition plans.', ar: 'أخصائية تغذية سريرية معتمدة بخبرة تزيد عن 8 سنوات في مساعدة العملاء على تحقيق أهداف صحية مستدامة من خلال خطط تغذية مخصصة.' },
  },
  services: {
    title: { en: 'Expert Nutrition Services', ar: 'خدمات التغذية المتخصصة' },
    items: [
      {
        title: { en: 'Weight Loss Plans', ar: 'خطط إنقاص الوزن' },
        desc: { en: 'Sustainable strategies to shed weight without extreme restrictions.', ar: 'استراتيجيات مستدامة لإنقاص الوزن بدون قيود قاسية.' }
      },
      {
        title: { en: 'Sports Nutrition', ar: 'التغذية الرياضية' },
        desc: { en: 'Optimize performance and recovery for athletes and active individuals.', ar: 'تحسين الأداء والاستشفاء للرياضيين والأفراد النشطين.' }
      },
      {
        title: { en: 'Clinical Nutrition', ar: 'التغذية السريرية' },
        desc: { en: 'Medical nutrition therapy for managing chronic conditions.', ar: 'العلاج الغذائي الطبي لإدارة الحالات المزمنة.' }
      },
      {
        title: { en: 'Meal Planning', ar: 'تخطيط الوجبات' },
        desc: { en: 'Customized, delicious, and easy-to-follow meal schedules.', ar: 'جداول وجبات مخصصة، لذيذة، وسهلة الاتباع.' }
      }
    ]
  },
  transformations: {
    title: { en: 'Real Results', ar: 'نتائج حقيقية' },
    items: [
      { quote: { en: "I finally feel in control of my eating habits.", ar: "أشعر أخيراً بالسيطرة على عاداتي الغذائية." } },
      { quote: { en: "More energy, better sleep, and I love what I eat.", ar: "طاقة أكثر، نوم أفضل، وأحب ما آكله." } }
    ]
  },
  testimonials: {
    title: { en: 'What Clients Say', ar: 'ماذا يقول العملاء' },
    items: [
      { name: { en: 'Sarah M.', ar: 'سارة م.' }, text: { en: 'Nour changed my perspective on food entirely. I lost 15kg and kept it off!', ar: 'نور غيرت نظرتي للطعام بالكامل. فقدت 15 كجم وحافظت على وزني!' } },
      { name: { en: 'Ahmed R.', ar: 'أحمد ر.' }, text: { en: 'The sports nutrition plan helped me achieve my personal best in the marathon.', ar: 'خطة التغذية الرياضية ساعدتني في تحقيق أفضل رقم شخصي في الماراثون.' } },
      { name: { en: 'Layla K.', ar: 'ليلى ك.' }, text: { en: 'Her recipes are amazing and the support is unmatched.', ar: 'وصفاتها مذهلة والدعم الذي تقدمه لا يعلى عليه.' } }
    ]
  },
  footer: {
    tagline: { en: 'Transform Your Life Through Food', ar: 'غيّر حياتك من خلال الغذاء' },
    rights: { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' }
  }
};