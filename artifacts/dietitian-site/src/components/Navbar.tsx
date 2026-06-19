import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#transformations', label: t('nav.transformations') },
    { href: '#testimonials', label: t('nav.testimonials') },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="#home" className="text-xl font-bold tracking-tight text-primary">
            {language === 'ar' ? 'نور الحسن' : 'Nour Al-Hassan'}
          </a>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={toggleLanguage} className="font-bold cursor-pointer">
              {language === 'ar' ? 'EN' : 'عربي'}
            </Button>
            <Button asChild>
              <a href="#contact">{t('nav.contact')}</a>
            </Button>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <Button variant="ghost" onClick={toggleLanguage} className="font-bold cursor-pointer px-2">
            {language === 'ar' ? 'EN' : 'عربي'}
          </Button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-foreground">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium py-2 border-b border-border/50"
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="w-full mt-2">
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</a>
          </Button>
        </div>
      )}
    </nav>
  );
}