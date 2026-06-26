import { SiWhatsapp } from 'react-icons/si';
import { useLanguage } from '@/context/LanguageContext';

export default function FloatingWhatsApp() {
  const { client } = useLanguage();
  const msg = encodeURIComponent('مرحبا دكتور، بحب احجز موعد استشارة 🙂');
  return (
    <a
      href={`https://wa.me/${client.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="button-floating-whatsapp"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
    >
      <SiWhatsapp className="w-7 h-7" />
    </a>
  );
}
