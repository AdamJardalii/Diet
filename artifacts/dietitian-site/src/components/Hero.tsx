import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero.png" 
          alt="Healthy Mediterranean Kitchen" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/80 md:bg-background/60 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent rtl:bg-gradient-to-l"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              {language === 'ar' ? 'أخصائية تغذية سريرية' : 'Clinical Dietitian'}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-lg leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-base h-14 px-8" asChild>
                <a href="#contact">{t('hero.cta')}</a>
              </Button>
              <Button size="lg" variant="outline" className="text-base h-14 px-8 bg-background/50 backdrop-blur-sm" asChild>
                <a href="#services">{t('nav.services')}</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}