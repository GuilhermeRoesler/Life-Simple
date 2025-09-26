import { useState, useEffect } from 'react';
import { Instagram, MessageCircle, Menu, X } from 'lucide-react';
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from '@/utils/products';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Produtos', href: '#produtos' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`absolute top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300'
      }`}>
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="flex items-center space-x-3">
              {/* <img src={"/icon.png"} alt="Life Simple" className="h-20 lg:h-20 w-auto" style={{ height: '8rem' }} /> */}
              <span className="text-xl lg:text-2xl text-white" style={{ fontFamily: 'Inter', fontWeight: '300' }}>Life Simple</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-white hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Social Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
              >
                <MessageCircle className="h-5 w-5 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(INSTAGRAM_URL, '_blank')}
              >
                <Instagram className="h-5 w-5 text-white" />
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden bg-primary text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-up px-4 bg-white">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-accent-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center space-x-3 pt-3 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
                  className="flex-1"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(INSTAGRAM_URL, '_blank')}
                  className="flex-1"
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}