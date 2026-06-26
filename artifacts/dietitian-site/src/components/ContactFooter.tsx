import { useLanguage } from '@/context/LanguageContext';
import { SiWhatsapp, SiInstagram, SiTiktok } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Apple, Carrot, Salad, Fish, Wheat, Citrus,
  Grape, Leaf, Soup, Egg, Cherry, Croissant,
} from 'lucide-react';

// Food icons scattered across the section background. Each one slowly drifts
// and rotates so the "Book a Consultation" area feels alive and on-theme.
const floatingFood = [
  { Icon: Apple, top: '10%', left: '5%', size: 46, dur: 7, delay: 0 },
  { Icon: Carrot, top: '64%', left: '9%', size: 40, dur: 9, delay: 0.6 },
  { Icon: Salad, top: '24%', left: '20%', size: 52, dur: 8, delay: 1.2 },
  { Icon: Leaf, top: '78%', left: '26%', size: 34, dur: 6.5, delay: 0.3 },
  { Icon: Citrus, top: '14%', left: '40%', size: 44, dur: 10, delay: 0.9 },
  { Icon: Egg, top: '70%', left: '46%', size: 36, dur: 7.5, delay: 1.6 },
  { Icon: Wheat, top: '8%', left: '60%', size: 50, dur: 9.5, delay: 0.2 },
  { Icon: Grape, top: '58%', left: '66%', size: 42, dur: 8.5, delay: 1.1 },
  { Icon: Fish, top: '20%', left: '78%', size: 48, dur: 7, delay: 0.7 },
  { Icon: Cherry, top: '80%', left: '84%', size: 38, dur: 9, delay: 1.4 },
  { Icon: Croissant, top: '40%', left: '92%', size: 44, dur: 8, delay: 0.5 },
  { Icon: Soup, top: '46%', left: '34%', size: 40, dur: 10, delay: 1.9 },
];

export default function ContactFooter() {
  const { t, language, client } = useLanguage();
  const waMsg = encodeURIComponent('مرحبا دكتور، بحب احجز موعد استشارة 🙂');
  const waUrl = `https://wa.me/${client.whatsapp}?text=${waMsg}`;
  // Format the WhatsApp number for display: "+961 76 097 305"-style grouping.
  const waDisplay = '+' + client.whatsapp;

  return (
    <footer id="contact" className="relative overflow-hidden bg-foreground text-background">
      {/* Warm, food-inspired gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-primary/30" aria-hidden="true" />

      {/* Floating food icons */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {floatingFood.map(({ Icon, top, left, size, dur, delay }, i) => (
          <motion.div
            key={i}
            className="absolute text-background/[0.07]"
            style={{ top, left }}
            initial={{ y: 0, rotate: -6 }}
            animate={{ y: [0, -22, 0], rotate: [-6, 8, -6] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon style={{ width: size, height: size }} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">{t('nav.contact')}</h2>
            <p className="text-background/80 mb-8 max-w-md">
              {language === 'ar' ? 'ابدأ رحلتك نحو حياة صحية اليوم. تواصل معنا لحجز استشارتك.' : 'Start your journey to a healthier life today. Contact us to book your consultation.'}
            </p>
            
            <div className="flex flex-col gap-4">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-background hover:text-primary transition-colors text-lg">
                <SiWhatsapp className="w-5 h-5" />
                <span dir="ltr">{waDisplay}</span>
              </a>

              {(client.instagram || client.tiktok) && (
                <div className="flex items-center gap-4 mt-2">
                  {client.instagram && (
                    <a
                      href={client.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-11 h-11 rounded-full bg-background/10 hover:bg-primary text-background flex items-center justify-center transition-colors"
                    >
                      <SiInstagram className="w-5 h-5" />
                    </a>
                  )}
                  {client.tiktok && (
                    <a
                      href={client.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="w-11 h-11 rounded-full bg-background/10 hover:bg-primary text-background flex items-center justify-center transition-colors"
                    >
                      <SiTiktok className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="bg-background/5 backdrop-blur-sm p-8 rounded-2xl border border-background/10 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-background/10"
          >
            <h3 className="text-xl font-semibold mb-6">{language === 'ar' ? 'احجز موعداً' : 'Book an Appointment'}</h3>
            <Button asChild className="group w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-[1.02]">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <SiWhatsapp className="w-5 h-5 transition-transform group-hover:scale-110" />
                {t('hero.cta')}
              </a>
            </Button>
            <p className="text-center mt-4 text-sm text-background/60">
              {language === 'ar' ? 'سنقوم بالرد عليك عبر واتساب.' : 'We will reply to you via WhatsApp.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 border-t border-background/10 py-6 text-center text-sm text-background/60 mt-12">
        <p>{t('about.name')}</p>
      </div>
    </footer>
  );
}