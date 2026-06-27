import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Heart, Soup, Scale, Apple, Salad, Wheat, Citrus, Leaf, Grape } from 'lucide-react';
import { asset } from '@/lib/asset';

const points = [
  { Icon: Heart, key: 'point1', img: '/balanced1.webp', alt: 'Lebanese mezze plate' },
  { Icon: Soup, key: 'point2', img: '/balanced2.webp', alt: 'Fresh Lebanese salad with bread' },
  { Icon: Scale, key: 'point3', img: '/balanced3.webp', alt: 'Balanced nutrition bowl' },
];

// Food icons that gently drift in the background as you scroll to the section.
const floatingFood = [
  { Icon: Apple, top: '12%', left: '6%', size: 40, dur: 7, delay: 0 },
  { Icon: Salad, top: '70%', left: '12%', size: 46, dur: 9, delay: 0.7 },
  { Icon: Wheat, top: '22%', left: '88%', size: 44, dur: 8, delay: 0.3 },
  { Icon: Citrus, top: '78%', left: '82%', size: 38, dur: 10, delay: 1.1 },
  { Icon: Leaf, top: '8%', left: '46%', size: 34, dur: 6.5, delay: 0.5 },
  { Icon: Grape, top: '84%', left: '50%', size: 40, dur: 9.5, delay: 1.4 },
];

export default function BalancedDiet() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-b from-background to-muted/40">
      {/* Drifting food icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {floatingFood.map(({ Icon, top, left, size, dur, delay }, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/[0.06]"
            style={{ top, left }}
            initial={{ y: 0, rotate: -6 }}
            animate={{ y: [0, -20, 0], rotate: [-6, 8, -6] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon style={{ width: size, height: size }} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="inline-block py-1 px-4 rounded-full bg-gold/10 text-foreground/80 ring-1 ring-gold/40 text-sm font-semibold mb-4">
            {t('balanced.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('balanced.title')}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('balanced.body')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {points.map(({ Icon, key, img, alt }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group relative bg-background rounded-2xl border border-border/50 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={asset(img)}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Icon badge straddles the image edge — kept OUTSIDE the image's
                  overflow-hidden box so it isn't clipped. */}
              <div className="absolute top-44 left-5 rtl:left-auto rtl:right-5 -translate-y-1/2 w-12 h-12 rounded-xl bg-background shadow-md ring-1 ring-gold/30 flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <Icon className="w-6 h-6" />
              </div>
              <div className="p-6 pt-8">
                <h3 className="text-lg font-bold text-foreground mb-2">{t(`balanced.${key}_title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`balanced.${key}_desc`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
