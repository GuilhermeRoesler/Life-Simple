import { Instagram, MessageCircle, Mail, MapPin, Shield } from 'lucide-react';
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from '@/utils/products';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Life Simple</h3>
            <p className="text-sm opacity-90">
              Farmácia de manipulação especializada em fórmulas personalizadas para sua saúde e bem-estar.
            </p>
            <div className="flex items-center mt-4 space-x-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Farmácia Registrada</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#produtos" className="hover:underline opacity-90 hover:opacity-100">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:underline opacity-90 hover:opacity-100">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:underline opacity-90 hover:opacity-100">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:underline opacity-90 hover:opacity-100">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="opacity-90">Tv. São José, 455</span>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline opacity-90 hover:opacity-100"
                >
                  (51) 98935-4834
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a 
                  href="mailto:atendimento.lifesimple@gmail.com"
                  className="hover:underline opacity-90 hover:opacity-100"
                >
                 atendimento.lifesimple@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-3 mb-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="text-sm opacity-90">
              <p className="font-semibold mb-1">Horário:</p>
              <p>Segunda-Sexta: 8h às 20h</p>
              <p>Sábado: 8h às 14h</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="opacity-90">
              © {currentYear} Life Simple. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="/privacy" className="hover:underline opacity-90 hover:opacity-100">
                Política de Privacidade
              </a>
              <a href="/terms" className="hover:underline opacity-90 hover:opacity-100">
                Termos de Uso
              </a>
              <a href="/lgpd" className="hover:underline opacity-90 hover:opacity-100">
                LGPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}