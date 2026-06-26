import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import CountUp from '@/components/CountUp';
import { asset } from '@/lib/asset';

export default function About() {
  const { t, client, language } = useLanguage();

  // Per-client overrides fall back to the shared site content.
  const profile = client.profile;
  const bio = profile?.bio?.[language] ?? t('about.bio');
  const badges = profile?.badges?.map((b) => b[language]) ?? [
    t('about.badge1'),
    t('about.badge2'),
    t('about.badge3'),
  ];
  const stats = profile?.stats?.map((s) => ({ num: s.num[language], label: s.label[language] })) ?? [
    { num: t('about.stat1_num'), label: t('about.stat1_label') },
    { num: t('about.stat2_num'), label: t('about.stat2_label') },
    { num: t('about.stat3_num'), label: t('about.stat3_label') },
  ];

  return (
    <section id="about" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative group max-w-md mx-auto md:mr-auto md:ml-0 rtl:md:ml-auto rtl:md:mr-0"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl relative z-10 ring-1 ring-gold/30">
              <img
                src={asset(client.aboutImage)}
                alt={`${client.name[language]} - Dietitian`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Soft gradient for legibility behind the floating badge */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating credential badge */}
            {badges[1] && (
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="absolute z-20 bottom-5 left-5 rtl:left-auto rtl:right-5 flex items-center gap-2 rounded-xl bg-background/90 backdrop-blur-sm px-3 py-2 shadow-lg ring-1 ring-gold/30"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold/15 text-gold">
                  <Award className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-foreground leading-tight max-w-[8rem]">{badges[1]}</span>
              </motion.div>
            )}

            {/* Animated decorative glows */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 rtl:-left-6 rtl:-right-auto w-48 h-48 bg-gold/20 rounded-full blur-3xl -z-10"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.75, 0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-6 -left-6 rtl:-right-6 rtl:-left-auto w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">{t('about.title')}</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t('about.name')}</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className="inline-block py-1 px-3 rounded-full bg-gold/10 text-foreground/80 ring-1 ring-gold/30 text-xs font-semibold transition-colors hover:bg-gold/20"
                >
                  {b}
                </span>
              ))}
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed border-l-4 rtl:border-l-0 rtl:border-r-4 border-gold pl-4 rtl:pl-0 rtl:pr-4 mb-8">
              {bio}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-background rounded-xl p-4 shadow-sm text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default"
                >
                  <CountUp value={s.num} className="block text-2xl font-bold text-primary mb-1" />
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
