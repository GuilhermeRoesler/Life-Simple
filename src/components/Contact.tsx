import { useState } from 'react';
import { Send, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ContactForm } from '@/types';

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
    consentimento: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consentimento) {
      setSubmitMessage('Por favor, aceite os termos de consentimento.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Placeholder API call
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitMessage('Mensagem enviada com sucesso! Nossa equipe responderá em até 24h úteis.');
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          mensagem: '',
          consentimento: false
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitMessage('Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato via WhatsApp.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  return (
    <section id="contato" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nossa equipe da Life Simple está pronta para atender você com cuidado e profissionalismo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="nome">Nome *</Label>
                    <Input
                      id="nome"
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefone">Telefone (opcional)</Label>
                    <Input
                      id="telefone"
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mensagem">Mensagem *</Label>
                    <Textarea
                      id="mensagem"
                      required
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      placeholder="Como podemos ajudar você?"
                      rows={4}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consentimento"
                      checked={formData.consentimento}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, consentimento: checked as boolean })
                      }
                    />
                    <Label htmlFor="consentimento" className="text-sm text-muted-foreground">
                      Concordo com o processamento dos meus dados pessoais de acordo com a política de privacidade e LGPD.
                    </Label>
                  </div>

                  {submitMessage && (
                    <div className={`p-3 rounded-lg text-sm ${
                      submitMessage.includes('sucesso') 
                        ? 'bg-success/10 text-success' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {submitMessage}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full gradient-primary hover:opacity-90"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Endereço</h3>
                    <p className="text-muted-foreground">
                      Rua das Farmácias, 123<br />
                      Centro - São Paulo, SP<br />
                      CEP: 01234-567
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Horário de Funcionamento</h3>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 8h às 20h<br />
                      Sábado: 8h às 14h<br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefones</h3>
                    <p className="text-muted-foreground">
                      WhatsApp: (11) 99999-9999<br />
                      Telefone: (11) 3333-3333<br />
                      E-mail: contato@farmacia.com.br
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Perguntas Frequentes</h3>
                <div className="space-y-3">
                  <details className="group">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                      Quanto tempo leva para manipular meu medicamento?
                    </summary>
                    <p className="mt-2 text-sm text-muted-foreground pl-4">
                      Geralmente de 24 a 48 horas úteis, dependendo da complexidade da fórmula.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                      Vocês entregam em domicílio?
                    </summary>
                    <p className="mt-2 text-sm text-muted-foreground pl-4">
                      Sim, entregamos em toda a região metropolitana com taxa variável conforme distância.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                      Preciso de receita médica?
                    </summary>
                    <p className="mt-2 text-sm text-muted-foreground pl-4">
                      Para alguns medicamentos sim. Entre em contato para saber mais sobre seu caso específico.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                      Qual a validade dos produtos manipulados?
                    </summary>
                    <p className="mt-2 text-sm text-muted-foreground pl-4">
                      A validade varia de 3 a 6 meses, dependendo da formulação. Sempre indicamos na embalagem.
                    </p>
                  </details>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}