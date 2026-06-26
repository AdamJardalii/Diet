import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Scale, Heart, Moon, Activity, Droplets, Baby, Users, Dumbbell, Smartphone, CheckCircle2 } from 'lucide-react';

const icons = [
  <Scale className="w-7 h-7" />,
  <Heart className="w-7 h-7" />,
  <Moon className="w-7 h-7" />,
  <Activity className="w-7 h-7" />,
  <Droplets className="w-7 h-7" />,
  <Baby className="w-7 h-7" />,
  <Users className="w-7 h-7" />,
  <Dumbbell className="w-7 h-7" />,
  <Smartphone className="w-7 h-7" />,
];

const iconColors = [
  'bg-blue-100 text-blue-600',
  'bg-pink-100 text-pink-600',
  'bg-indigo-100 text-indigo-600',
  'bg-purple-100 text-purple-600',
  'bg-sky-100 text-sky-600',
  'bg-rose-100 text-rose-600',
  'bg-orange-100 text-orange-600',
  'bg-emerald-100 text-emerald-600',
  'bg-primary/10 text-primary',
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Services() {
  const { t, language, client } = useLanguage();

  const services = Array.from({ length: 9 }, (_, i) => i);

  return (
    <section id="services" className="py-16 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-3"
          >
            {t('services.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            {t('services.subtitle')}
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((id) => {
            const isPopular = id === 8;
            const period = id === 8 ? t('services.perSession') : t('services.perMonth');
            const waMessage = encodeURIComponent(t(`services.items.${id}.waMsg`));
            const waUrl = `https://wa.me/${client.whatsapp}?text=${waMessage}`;

            return (
              <motion.div
                key={id}
                variants={item}
                data-testid={`card-service-${id}`}
                className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isPopular
                    ? 'border-primary shadow-lg shadow-primary/10 bg-primary text-primary-foreground'
                    : 'border-border/60 bg-background shadow-sm'
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 inset-x-0 flex justify-center">
                    <span className="inline-block bg-gold text-gold-foreground text-xs font-bold px-4 py-1 rounded-b-xl shadow-sm">
                      {t('services.popular')}
                    </span>
                  </div>
                )}

                <div className="p-6 pt-8 flex-1 flex flex-col">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${isPopular ? 'bg-white/20 text-white' : iconColors[id]}`}>
                    {icons[id]}
                  </div>

                  <h3 className={`text-xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-foreground'}`}>
                    {t(`services.items.${id}.title`)}
                  </h3>

                  <p className={`text-sm leading-relaxed mb-5 ${isPopular ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {t(`services.items.${id}.desc`)}
                  </p>

                  <div className={`flex items-start gap-2 mb-6 p-3 rounded-xl text-xs ${isPopular ? 'bg-white/10 text-white/90' : 'bg-muted/60 text-muted-foreground'}`}>
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                    <span>{t(`services.items.${id}.includes`)}</span>
                  </div>

                  <div className="mt-auto">
                    <div className={`flex items-baseline gap-1 mb-4 ${language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
                      <span className={`text-3xl font-extrabold ${isPopular ? 'text-white' : 'text-foreground'}`}>
                        {t(`services.items.${id}.price`)}
                      </span>
                      <span className={`text-sm font-medium ${isPopular ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {period}
                      </span>
                    </div>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`button-book-service-${id}`}
                      className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                        isPopular
                          ? 'bg-white text-primary hover:bg-white/90'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      {t('services.cta')}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
