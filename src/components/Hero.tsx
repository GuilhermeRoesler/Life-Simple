import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  // Define the WhatsApp number directly in the component
  const WHATSAPP_NUMBER = '5551999999999'; // Replace with the actual number

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá! Gostaria de informações sobre produtos manipulados.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const scrollToProducts = () => {
    document.querySelector('#produtos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const backgroundImageUrl = 'https://media.revistavanityfair.es/photos/66a35335ccce6c5c77cb7e3e/16:9/w_2560%2Cc_limit/GettyImages-1404722226.jpg';

  return (
    <section 
      id="home" 
      className="relative pt-20 lg:pt-24 min-h-screen flex items-center justify-center px-8 bg-cover bg-center text-white"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 place-items-center">
          {/* Centered Content */}
          <div className="animate-fade-in text-center flex flex-col items-center">

          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
            <span style={{fontFamily: 'Inter', fontWeight: '350'}}>Life Simple Phar.</span>
          </h1>

            <p className="text-base lg:text-lg text-gray-300 mb-8 leading-relaxed max-w-4xl" style={{fontFamily: 'Inter', fontWeight: '400'}}>
              Cuidar da sua saúde é a nossa prioridade.
              Aqui você encontra medicamentos, produtos de bem-estar e cuidados pessoais com atendimento atencioso e de confiança.
              Nosso compromisso é oferecer praticidade, orientação segura e qualidade em cada detalhe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="gradient-primary hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Fale conosco
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToProducts}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Ver Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Farmácia Registrada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Entrega Rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Qualidade Garantida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

