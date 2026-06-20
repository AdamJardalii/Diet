import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';

export default function NoFoodBan() {
  const { t } = useLanguage();
  const msg = encodeURIComponent('مرحبا دكتور، بحب احجز موعد استشارة 🙂');
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          {t('nofood.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-lg md:text-xl leading-relaxed opacity-90 mb-10"
        >
          {t('nofood.body')}
        </motion.p>
        <motion.a
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          href={`https://wa.me/96176097305?text=${msg}`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="button-nofoodban-whatsapp"
          className="inline-flex items-center gap-3 bg-white text-primary font-bold py-4 px-8 rounded-2xl text-base hover:bg-white/90 transition-all duration-200"
        >
          <SiWhatsapp className="w-5 h-5 text-green-600" />
          {t('hero.cta')}
        </motion.a>
      </div>
    </section>
  );
}