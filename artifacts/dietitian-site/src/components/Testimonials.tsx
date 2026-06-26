import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Quote, MapPin } from 'lucide-react';
import { asset } from '@/lib/asset';

const clientImgs = [
  '/client1.webp',
  '/client2.webp',
  '/client3.webp',
  '/client4.webp',
  '/client5.webp',
  '/client6.webp',
];

const starColors = [
  'text-yellow-400',
];

export default function Testimonials() {
  const { t } = useLanguage();
  const reviews = [0, 1, 2, 3, 4, 5];

  return (
    <section id="testimonials" className="py-16 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            {t('testimonials.title')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-primary mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reviews.map((id) => (
            <motion.div
              key={id}
              data-testid={`card-testimonial-${id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: id * 0.08, duration: 0.5 }}
              className="flex flex-col bg-background border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-6 flex flex-col flex-1">
                <Quote className="w-8 h-8 text-primary/25 mb-3" />

                <p className="text-foreground/80 leading-relaxed flex-grow text-sm mb-6">
                  "{t(`testimonials.items.${id}.text`)}"
                </p>

                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-auto border-t border-border/40 pt-4">
                  <img
                    src={asset(clientImgs[id])}
                    alt={t(`testimonials.items.${id}.name`)}
                    data-testid={`img-client-${id}`}
                    loading="lazy"
                    decoding="async"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-foreground leading-tight truncate">
                      {t(`testimonials.items.${id}.name`)}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t(`testimonials.items.${id}.role`)}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-primary shrink-0" />
                      <span className="text-xs text-primary font-medium">
                        {t(`testimonials.items.${id}.city`)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
