import React, { createContext, useContext, useState, useEffect } from "react";
import {
  DEFAULT_CLIENT,
  loadClients,
  pickClient,
  requestedClientId,
  type ClientConfig,
} from "@/config/clients";
import { asset } from "@/lib/asset";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  /** The active client (resolved from the ?id= URL param + clients.json). */
  client: ClientConfig;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Client data is loaded at runtime from public/clients.json. Start from the
  // bundled default so the site renders instantly; if a specific ?id= was
  // requested, wait for the fetch so we don't flash the wrong doctor.
  const requestedId = requestedClientId();
  const [client, setClient] = useState<ClientConfig>(DEFAULT_CLIENT);
  const [ready, setReady] = useState(requestedId === null);

  useEffect(() => {
    let active = true;
    loadClients().then((all) => {
      if (!active) return;
      setClient(pickClient(all, requestedId));
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, [requestedId]);

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  // Use the client's logo as the browser-tab favicon when one is provided.
  useEffect(() => {
    if (!client.logo) return;
    const link =
      document.querySelector<HTMLLinkElement>('link[rel="icon"]') ??
      document.head.appendChild(
        Object.assign(document.createElement("link"), { rel: "icon" }),
      );
    link.removeAttribute("type"); // let the browser infer it from the logo file
    link.href = asset(client.logo);
  }, [client.logo]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string): string => {
    // The client's name is per-client (resolved from ?id=), not static content.
    if (key === "about.name") {
      return client.name[language] || key;
    }
    const keys = key.split(".");
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
    <LanguageContext.Provider value={{ language, toggleLanguage, t, client }}>
      {ready ? (
        children
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        </div>
      )}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const content = {
  nav: {
    home: { en: "Home", ar: "الرئيسية" },
    about: { en: "About", ar: "عني" },
    services: { en: "Services", ar: "الخدمات" },
    transformations: { en: "Results", ar: "النتائج" },
    testimonials: { en: "Reviews", ar: "التقييمات" },
    contact: { en: "Contact", ar: "تواصل" },
  },
  hero: {
    badge: {
      en: "Licensed Clinical Dietitian · Lebanon",
      ar: "اختصاصي تغذية سريرية مجاز · لبنان",
    },
    title: {
      en: "Lose weight without giving up the food you love.",
      ar: "خسّوا وزنكم من دون ما تتخلّوا عن الأكل يلّي بتحبّوه.",
    },
    subtitle: {
      en: "Personalized nutrition plans built around real Lebanese food — from tabbouleh to teta's cooking. Healthy, practical, and made for your life.",
      ar: "برامج تغذية مخصّصة مبنية على الأكل اللبناني الحقيقي — من التبّولة لطبخة تيتا. صحّية، عملية، ومناسبة لحياتكم.",
    },
    cta: { en: "Book a Consultation", ar: "احجزوا استشارة" },
  },
  about: {
    title: { en: "About the Doctor", ar: "عن الدكتور" },
    badge1: {
      en: "Licensed Dietitian — Lebanon",
      ar: "اختصاصي تغذية مجاز — لبنان",
    },
    badge2: { en: "15 Years Experience", ar: "15 سنة خبرة" },
    badge3: { en: "Online & In-Person", ar: "أونلاين وشخصياً" },
    bio: {
      en: "A licensed clinical dietitian registered with the Order of Dietitians in Lebanon, with 15 years helping people across Lebanon and abroad reach their goals — without crash diets. Every plan is built around real food you already love.",
      ar: "اختصاصي تغذية سريرية مجاز ومسجّل في نقابة اختصاصيي التغذية في لبنان، بخبرة 15 سنة بمساعدة الناس بلبنان وبالغربة ليوصلوا لأهدافهم — بلا ريجيمات قاسية. كل برنامج مبني على الأكل الحقيقي يلّي بتحبّوه.",
    },
    stat1_num: { en: "1000+", ar: "+1000" },
    stat1_label: { en: "Clients Helped", ar: "عميل تمت مساعدته" },
    stat2_num: { en: "15", ar: "15" },
    stat2_label: { en: "Years Experience", ar: "سنة خبرة" },
    stat3_num: { en: "98%", ar: "%98" },
    stat3_label: { en: "Client Satisfaction", ar: "رضا العملاء" },
  },
  services: {
    title: { en: "Services & Pricing", ar: "الخدمات والأسعار" },
    subtitle: {
      en: "Real plans for real life — built around Lebanese food and your goals",
      ar: "برامج حقيقية لحياة حقيقية — مبنية على الأكل اللبناني وأهدافكم",
    },
    perMonth: { en: "/ month", ar: "/ شهر" },
    perWeek: { en: "/ week", ar: "/ أسبوع" },
    perSession: { en: "/ session", ar: "/ جلسة" },
    cta: { en: "Book on WhatsApp", ar: "احجز عبر واتساب" },
    popular: { en: "Most Popular", ar: "الأكثر طلباً" },
    items: [
      {
        title: { en: "Weight Loss", ar: "خسارة الوزن" },
        desc: {
          en: "A sustainable plan built for your body and routine. Steady results you can actually keep, with weekly follow-up.",
          ar: "برنامج عملي مبني على جسمكم وروتينكم. نتائج ثابتة بتقدروا تحافظوا عليها، مع متابعة أسبوعية.",
        },
        price: { en: "$80", ar: "$80" },
        period: "month",
        includes: {
          en: "Custom plan · Weekly check-in · WhatsApp support",
          ar: "خطة مخصصة · متابعة أسبوعية · دعم واتساب",
        },
        waMsg: {
          en: "Hello Doctor, I want to book a weight loss consultation",
          ar: "مرحبا دكتور، بحب احجز استشارة لخسارة الوزن",
        },
      },
      {
        title: { en: "Bride Package", ar: "باقة العروس" },
        desc: {
          en: "Look stunning on your big day. A focused plan that gets you camera-ready, with follow-up all the way to the wedding date.",
          ar: "لتطلّوا بأحلى صورة بيوم العمر. برنامج مكثّف بيحضّركم ليوم الزفاف، مع متابعة لحدّ تاريخ العرس.",
        },
        price: { en: "$120", ar: "$120" },
        period: "month",
        includes: {
          en: "Bridal-focused plan · Bi-weekly follow-up · Skin nutrition tips",
          ar: "خطة العروس · متابعة كل أسبوعين · نصائح تغذية للبشرة",
        },
        waMsg: {
          en: "Hello Doctor, I want to ask about the Bride Package",
          ar: "مرحبا دكتور، بسأل عن باقة العروس",
        },
      },
      {
        title: { en: "Ramadan Plan", ar: "برنامج رمضان" },
        desc: {
          en: "Stay healthy and energized through the month. Balanced suhoor and iftar plans that keep you light and full — no deprivation.",
          ar: "حافظوا على صحّتكم ونشاطكم طوال الشهر. خطّة إفطار وسحور متوازنة بتخلّيكم خفيفين وشبعانين، بلا حرمان.",
        },
        price: { en: "$60", ar: "$60" },
        period: "month",
        includes: {
          en: "Suhoor + Iftar plans · Lebanese recipes · No deprivation",
          ar: "خطة سحور وإفطار · وصفات لبنانية · بلا حرمان",
        },
        waMsg: {
          en: "Hello Doctor, I want to know about the Ramadan Plan",
          ar: "مرحبا دكتور، بحب اعرف عن برنامج رمضان",
        },
      },
      {
        title: {
          en: "PCOS & Hormonal Balance",
          ar: "تكيّس المبايض والتوازن الهرموني",
        },
        desc: {
          en: "Nutrition designed to manage PCOS symptoms, balance hormones, and support healthy weight and fertility.",
          ar: "تغذية مدروسة للتحكّم بأعراض تكيّس المبايض، توازن الهرمونات، ودعم الوزن الصحّي والخصوبة.",
        },
        price: { en: "$90", ar: "$90" },
        period: "month",
        includes: {
          en: "Hormone-focused plan · Anti-inflammatory foods · Monthly review",
          ar: "خطة هرمونية · أطعمة مضادة للالتهاب · مراجعة شهرية",
        },
        waMsg: {
          en: "Hello Doctor, I want to ask about the PCOS plan",
          ar: "مرحبا دكتور، بسأل عن برنامج تكيّس المبايض",
        },
      },
      {
        title: { en: "Diabetes Management", ar: "إدارة السكري" },
        desc: {
          en: "Keep your blood sugar steady with a balanced plan tailored to your medication and lifestyle.",
          ar: "حافظوا على استقرار سكر الدم مع برنامج متوازن مفصّل على دواؤكم ونمط حياتكم.",
        },
        price: { en: "$85", ar: "$85" },
        period: "month",
        includes: {
          en: "Glycemic-focused plan · Medication coordination · Weekly tracking",
          ar: "خطة مناسبة للسكري · تنسيق مع الدواء · متابعة أسبوعية",
        },
        waMsg: {
          en: "Hello Doctor, I want to book a diabetes nutrition consultation",
          ar: "مرحبا دكتور، بحب احجز استشارة لإدارة السكري",
        },
      },
      {
        title: {
          en: "Pregnancy & Post-Pregnancy",
          ar: "الحمل وما بعد الولادة",
        },
        desc: {
          en: "Nourish yourself and your baby during pregnancy, then safely get back to feeling like yourself afterward.",
          ar: "تغذية صحّية إلكم ولطفلكم خلال الحمل، وبرنامج آمن بيرجّعكم لشكلكم وطاقتكم بعد الولادة.",
        },
        price: { en: "$85", ar: "$85" },
        period: "month",
        includes: {
          en: "Pregnancy nutrition · Safe post-partum plan · Folic & iron focus",
          ar: "تغذية الحمل · برنامج آمن بعد الولادة · تركيز على الحديد والفوليك",
        },
        waMsg: {
          en: "Hello Doctor, I want to ask about the pregnancy nutrition plan",
          ar: "مرحبا دكتور، بسأل عن برنامج تغذية الحمل",
        },
      },
      {
        title: { en: "Pediatric Nutrition", ar: "تغذية الأطفال" },
        desc: {
          en: "Healthy eating habits for your kids — from picky eaters to growth and weight concerns.",
          ar: "عادات أكل صحّية لولادكم، من الأكل الانتقائي لمتابعة النمو والوزن.",
        },
        price: { en: "$70", ar: "$70" },
        period: "month",
        includes: {
          en: "Child-friendly plans · Growth tracking · Parent guidance",
          ar: "خطط مناسبة للأطفال · متابعة النمو · إرشادات للأهل",
        },
        waMsg: {
          en: "Hello Doctor, I want to ask about pediatric nutrition",
          ar: "مرحبا دكتور، بسأل عن تغذية الأطفال",
        },
      },
      {
        title: { en: "Sports Nutrition", ar: "التغذية الرياضية" },
        desc: {
          en: "Fuel your training and performance with a plan built around your sport and goals.",
          ar: "برنامج مبني على رياضتكم وأهدافكم ليدعم تمريناتكم وأداؤكم.",
        },
        price: { en: "$90", ar: "$90" },
        period: "month",
        includes: {
          en: "Sport-specific macros · Pre/post workout meals · Performance focus",
          ar: "ماكرو رياضي · وجبات قبل وبعد التمرين · تركيز على الأداء",
        },
        waMsg: {
          en: "Hello Doctor, I want to book a sports nutrition consultation",
          ar: "مرحبا دكتور، بحب احجز استشارة تغذية رياضية",
        },
      },
      {
        title: { en: "Online Consultation", ar: "الاستشارة الأونلاين" },
        desc: {
          en: "Wherever you are — Beirut, the Gulf, or abroad — get your full plan and follow-ups over video and WhatsApp. Same care, no matter the distance.",
          ar: "من أي مكان بالعالم — بيروت، الخليج، أو الغربة — بتاخدوا برنامجكم ومتابعتكم عبر الفيديو والواتساب. نفس الاهتمام، مهما بعدت المسافة.",
        },
        price: { en: "$55", ar: "$55" },
        period: "session",
        includes: {
          en: "Video call · Full plan sent after · WhatsApp follow-up included",
          ar: "مكالمة فيديو · خطة كاملة بعد الجلسة · متابعة واتساب مشمولة",
        },
        waMsg: {
          en: "Hello Doctor, I want to know about online consultations",
          ar: "مرحبا دكتور، بحب اعرف عن الاستشارات الأونلاين",
        },
        popular: true,
      },
    ],
  },
  transformations: {
    title: { en: "Real Results", ar: "نتائج حقيقية" },
    subtitle: {
      en: "No crash diets. No banned foods. Just real people eating real Lebanese food and getting results.",
      ar: "بلا ريجيمات قاسية. بلا أكل محرّم. ناس حقيقيون يأكلون أكلاً لبنانياً حقيقياً ويحصلون على نتائج.",
    },
    items: [
      {
        label: { en: "-12 kg in 3 months", ar: "-12 كجم في 3 أشهر" },
        quote: {
          en: "Steady loss over three months, no crash dieting and no foods off-limits.",
          ar: "خسارة تدريجية على مدى ثلاثة أشهر، بلا ريجيم قاسي وبلا حرمان.",
        },
      },
      {
        label: {
          en: "-18 kg, diabetes under control",
          ar: "-18 كجم، السكري تحت السيطرة",
        },
        quote: {
          en: "Blood sugar back in range with fewer meds, cleared by his doctor.",
          ar: "سكر الدم رجع لمعدّله مع تخفيف الدواء، بموافقة طبيبه.",
        },
      },
      {
        label: { en: "Post-pregnancy results", ar: "نتائج ما بعد الولادة" },
        quote: {
          en: "Back to her energy and pre-pregnancy shape while breastfeeding.",
          ar: "رجعت لطاقتها ووزنها قبل الحمل وهي عم ترضّع.",
        },
      },
      {
        label: {
          en: "PCOS, hormones balanced",
          ar: "تكيّس المبايض، الهرمونات متوازنة",
        },
        quote: {
          en: "A regular cycle returned after months of targeted, food-first care.",
          ar: "رجعت الدورة منتظمة بعد أشهر من برنامج غذائي مدروس.",
        },
      },
    ],
  },
  testimonials: {
    title: { en: "What Clients Say", ar: "ماذا يقول العملاء" },
    items: [
      {
        name: { en: "Peter Karam", ar: "بيتر كرم" },
        role: { en: "Weight Loss Client", ar: "برنامج خسارة وزن" },
        city: { en: "Beirut", ar: "بيروت" },
        img: "/client1.webp",
        text: {
          en: "I lost 12 kg and never felt deprived — I still ate tabbouleh every week! This is the first plan that actually fit my Lebanese lifestyle.",
          ar: "خسّيت 12 كيلو وما حسّيت يوم إني محرومة — ضلّيت آكل تبّولة كل أسبوع! أول برنامج ناسب حياتي اللبنانية فعلاً.",
        },
      },
      {
        name: { en: "Nour Mansour", ar: "نور منصور" },
        role: { en: "Diabetes Management", ar: "إدارة السكري" },
        city: { en: "Tripoli", ar: "طرابلس" },
        img: "/client2.webp",
        text: {
          en: "My blood sugar is now stable and I eat normal food. The doctor built a plan around Lebanese meals — not a bland hospital diet.",
          ar: "سكر الدم صار مستقر وأنا عم بآكل أكل عادي. الدكتور بنى البرنامج حول الأكل اللبناني — مش ريجيم مشفى.",
        },
      },
      {
        name: { en: "Sami Haddad", ar: "سامي حداد" },
        role: { en: "Post-Pregnancy", ar: "ما بعد الولادة" },
        city: { en: "Jounieh", ar: "جونيه" },
        img: "/client3.webp",
        text: {
          en: "Back to my pre-pregnancy weight in 4 months while breastfeeding. Couldn't believe it was possible without starving myself.",
          ar: "رجعت لوزني قبل الحمل بـ 4 أشهر وأنا عم برضّع. ما كنت مصدّقة إنو ممكن بدون جوع.",
        },
      },
      {
        name: { en: "Fatima Azar", ar: "فاطمة عازار" },
        role: { en: "PCOS Plan", ar: "برنامج تكيّس المبايض" },
        city: { en: "Sidon", ar: "صيدا" },
        img: "/client4.webp",
        text: {
          en: "My cycle is regular for the first time in years. The nutrition plan balanced my hormones without medication. Game changer.",
          ar: "صار عندي دورة منتظمة لأول مرة منذ سنوات. البرنامج الغذائي وازن هرموناتي بدون دواء. غيّر حياتي.",
        },
      },
      {
        name: { en: "Jad Bou Nassar", ar: "جاد بو نصار" },
        role: { en: "Sports Nutrition", ar: "التغذية الرياضية" },
        city: { en: "Zahle", ar: "زحلة" },
        img: "/client5.webp",
        text: {
          en: "My performance at the gym improved dramatically. The plan is built around Lebanese food I can actually prep at home — no fancy supplements.",
          ar: "أداؤي بالجيم تحسّن كثيراً. البرنامج مبني على أكل لبناني بقدر أجهّزه بالبيت — بدون مكملات غريبة.",
        },
      },
      {
        name: { en: "Nadine Saad", ar: "نادين سعد" },
        role: { en: "Online Client — Abroad", ar: "عميلة أونلاين — الغربة" },
        city: { en: "Byblos → UAE", ar: "جبيل → الإمارات" },
        img: "/client6.webp",
        text: {
          en: "I'm in Dubai and have been following up online for 6 months. Same quality as in-person, and the WhatsApp support is incredible.",
          ar: "أنا بدبي وعم بتابع أونلاين منذ 6 أشهر. نفس جودة الحضوري، ودعم الواتساب رائع.",
        },
      },
    ],
  },
};
