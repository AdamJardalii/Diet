import { useLanguage } from '@/context/LanguageContext';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';

export default function ContactFooter() {
  const { t, language } = useLanguage();
  const waMsg = encodeURIComponent('مرحبا دكتور، بحب احجز موعد استشارة 🙂');
  const waUrl = `https://wa.me/96176097305?text=${waMsg}`;

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
              <a href={waUrl} className="flex items-center gap-3 text-background hover:text-primary transition-colors text-lg">
                <SiWhatsapp className="w-5 h-5" />
                <span dir="ltr">+961 76 097 305</span>
              </a>
            </div>
          </div>
          
          <div className="bg-background/5 p-8 rounded-2xl border border-background/10">
            <h3 className="text-xl font-semibold mb-6">{language === 'ar' ? 'احجز موعداً' : 'Book an Appointment'}</h3>
            <Button asChild className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                {t('hero.cta')}
              </a>
            </Button>
            <p className="text-center mt-4 text-sm text-background/60">
              {language === 'ar' ? 'سنقوم بالرد عليك عبر واتساب.' : 'We will reply to you via WhatsApp.'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-background/10 py-6 text-center text-sm text-background/60 mt-12">
        <p>© {new Date().getFullYear()} {t('about.name')}. {t('footer.rights')} - {t('footer.tagline')}</p>
      </div>
    </footer>
  );
}