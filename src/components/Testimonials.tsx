import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Maria Silva',
    city: 'São Paulo, SP',
    rating: 5,
    text: 'Excelente atendimento e produtos de qualidade! Consegui atingir meus objetivos de emagrecimento com as fórmulas personalizadas.'
  },
  {
    name: 'João Santos',
    city: 'Rio de Janeiro, RJ',
    rating: 5,
    text: 'Os suplementos para academia são de primeira linha. Notei diferença significativa no meu desempenho e recuperação.'
  },
  {
    name: 'Ana Costa',
    city: 'Belo Horizonte, MG',
    rating: 5,
    text: 'Farmácia de confiança! Sempre recebo orientações detalhadas sobre o uso dos produtos. Recomendo!'
  },
  {
    name: 'Carlos Oliveira',
    city: 'Curitiba, PR',
    rating: 5,
    text: 'Entrega rápida e produtos bem embalados. A qualidade dos manipulados é incomparável.'
  },
  {
    name: 'Patrícia Lima',
    city: 'Porto Alegre, RS',
    rating: 5,
    text: 'Finalmente encontrei uma farmácia que entende minhas necessidades. Produtos personalizados fazem toda a diferença!'
  },
  {
    "name": "Ricardo Alves",
    "city": "Salvador, BA",
    "rating": 5,
    "text": "O processo de consulta online foi muito prático e a equipe foi super atenciosa para criar a fórmula ideal para mim. Resultados visíveis em poucas semanas!"
  }
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Histórias reais de pessoas que transformaram suas vidas com nossos produtos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.city}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}