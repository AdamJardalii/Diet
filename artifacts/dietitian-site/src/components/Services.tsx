import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dumbbell, Flame, UtensilsCrossed, RefreshCw, Trophy, Smartphone } from 'lucide-react';

export default function Services() {
  const { t, language } = useLanguage();

  const services = [
    { id: 0, icon: <Dumbbell className="w-8 h-8 text-primary" /> },
    { id: 1, icon: <Flame className="w-8 h-8 text-secondary" /> },
    { id: 2, icon: <UtensilsCrossed className="w-8 h-8 text-secondary" /> },
    { id: 3, icon: <RefreshCw className="w-8 h-8 text-destructive" /> },
    { id: 4, icon: <Trophy className="w-8 h-8 text-primary" /> },
    { id: 5, icon: <Smartphone className="w-8 h-8 text-secondary" /> },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            {t('services.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto mb-6 text-lg"
          >
            {t('services.subtitle')}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-primary mx-auto rounded-full"
          />
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={item}>
              <Card className="h-full border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card">
                <CardHeader>
                  <div className="mb-4 bg-muted/50 w-16 h-16 rounded-2xl flex items-center justify-center">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{t(`services.items.${service.id}.title`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t(`services.items.${service.id}.desc`)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}