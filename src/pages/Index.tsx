import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Products from '@/components/Products';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import WhatsAppBadge from '@/components/WhatsAppBadge';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Products />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <WhatsAppBadge />
    </div>
  );
};

export default Index;
