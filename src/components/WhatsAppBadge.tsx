import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WHATSAPP_NUMBER } from '@/utils/products';

export default function WhatsAppBadge() {
  const handleClick = () => {
    const message = encodeURIComponent('Olá! Vim pelo site e gostaria de mais informações.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-24 right-6 z-30 md:hidden gradient-primary hover:opacity-90 shadow-lg rounded-full px-4 py-2"
      size="sm"
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      Fale no WhatsApp
    </Button>
  );
}