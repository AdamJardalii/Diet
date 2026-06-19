import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SiInstagram, SiTiktok, SiWhatsapp } from 'react-icons/si';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactFooter() {
  const { t, language } = useLanguage();

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">{t('nav.contact')}</h2>
            <p className="text-background/80 mb-8 max-w-md">
              {language === 'ar' ? 'ابدأ رحلتك نحو حياة صحية اليوم. تواصل معنا لحجز استشارتك.' : 'Start your journey to a healthier life today. Contact us to book your consultation.'}
            </p>
            
            <div className="flex flex-col gap-4">
              <a href="tel:+966501234567" className="flex items-center gap-3 text-background hover:text-primary transition-colors text-lg">
                <Phone className="w-5 h-5" />
                <span dir="ltr">+966 50 123 4567</span>
              </a>
            </div>
            
            <div className="flex gap-4 mt-8">
              <Button size="icon" variant="outline" className="bg-transparent border-background/20 hover:bg-background/10 rounded-full w-12 h-12" asChild>
                <a href="#" aria-label="Instagram">
                  <SiInstagram className="w-5 h-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" className="bg-transparent border-background/20 hover:bg-background/10 rounded-full w-12 h-12" asChild>
                <a href="#" aria-label="TikTok">
                  <SiTiktok className="w-5 h-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" className="bg-transparent border-background/20 hover:bg-background/10 rounded-full w-12 h-12 border-green-500 text-green-500 hover:bg-green-500/10" asChild>
                <a href="https://wa.me/966501234567" aria-label="WhatsApp">
                  <SiWhatsapp className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="bg-background/5 p-8 rounded-2xl border border-background/10">
            <h3 className="text-xl font-semibold mb-6">{language === 'ar' ? 'احجز موعداً' : 'Book an Appointment'}</h3>
            <Button className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
              {t('hero.cta')}
            </Button>
            <p className="text-center mt-4 text-sm text-background/60">
              {language === 'ar' ? 'سنقوم بالرد عليك خلال ٢٤ ساعة.' : 'We will get back to you within 24 hours.'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-background/10 py-6 text-center text-sm text-background/60">
        <p>© {new Date().getFullYear()} {t('about.name')}. {t('footer.rights')} - {t('footer.tagline')}</p>
      </div>
    </footer>
  );
}