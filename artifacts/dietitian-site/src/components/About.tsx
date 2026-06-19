import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl relative z-10 max-w-md mx-auto md:mr-auto md:ml-0 rtl:md:ml-auto rtl:md:mr-0">
              <img 
                src="/about.png" 
                alt="Nour Al-Hassan - Dietitian" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rtl:-left-6 rtl:-right-auto w-48 h-48 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 rtl:-right-6 rtl:-left-auto w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">{t('about.title')}</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t('about.name')}</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold">{t('about.badge1')}</span>
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold">{t('about.badge2')}</span>
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold">{t('about.badge3')}</span>
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed border-l-4 rtl:border-l-0 rtl:border-r-4 border-primary pl-4 rtl:pl-0 rtl:pr-4 mb-8">
              {t('about.bio')}
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-background rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-primary mb-1">{t('about.stat1_num')}</div>
                <div className="text-xs text-muted-foreground">{t('about.stat1_label')}</div>
              </div>
              <div className="bg-background rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-primary mb-1">{t('about.stat2_num')}</div>
                <div className="text-xs text-muted-foreground">{t('about.stat2_label')}</div>
              </div>
              <div className="bg-background rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-primary mb-1">{t('about.stat3_num')}</div>
                <div className="text-xs text-muted-foreground">{t('about.stat3_label')}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}