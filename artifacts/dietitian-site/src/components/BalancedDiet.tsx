import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Heart, Soup, Scale } from 'lucide-react';

const points = [
  { Icon: Heart, key: 'point1' },
  { Icon: Soup, key: 'point2' },
  { Icon: Scale, key: 'point3' },
];

export default function BalancedDiet() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/40">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <span className="inline-block py-1 px-4 rounded-full bg-gold/10 text-foreground/80 ring-1 ring-gold/40 text-sm font-semibold mb-4">
            {t('balanced.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('balanced.title')}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('balanced.body')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {points.map(({ Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group bg-background rounded-2xl border border-border/50 p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-gold/15 text-primary flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t(`balanced.${key}_title`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`balanced.${key}_desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
