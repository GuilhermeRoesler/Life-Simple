import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Product } from '@/types';
import { WHATSAPP_NUMBER } from '@/utils/products';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá, gostaria de informações sobre o produto: ${product.nome} - Categoria: ${product.categoria}.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.nome}</DialogTitle>
          <DialogDescription className="text-base">
            Categoria: {product.categoria}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 py-4">
          <div>
            <img
              src={product.imagem}
              alt={product.nome}
              className="w-full rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Descrição</h3>
              <p className="text-muted-foreground">{product.descricao_longa}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Modo de Uso</h3>
              <p className="text-muted-foreground">
                Conforme orientação do farmacêutico ou prescrição médica.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Contraindicações</h3>
              <p className="text-muted-foreground">
                Consulte um profissional de saúde antes do uso. Não recomendado para gestantes, lactantes e menores de 18 anos.
              </p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-3xl font-bold text-primary">
                R$ {product.preco}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleWhatsApp}
            className="w-full gradient-primary hover:opacity-90"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Fale Conosco no WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}