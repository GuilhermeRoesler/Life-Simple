import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types';

export default function EditProductPanel() {
  const { selectedProduct, setSelectedProduct, updateProduct, addProduct } = useProducts();
  const { register, handleSubmit, reset, setValue, watch } = useForm<Product>();

  const isOpen = selectedProduct !== null;

  useEffect(() => {
    if (selectedProduct) {
      reset(selectedProduct);
    } else {
      reset({
        id: `m-${Date.now()}`,
        nome: '',
        categoria: 'Emagrecimento',
        descricao_curta: '',
        descricao_longa: '',
        preco: '',
        imagem: 'https://via.placeholder.com/300x200'
      });
    }
  }, [selectedProduct, reset]);

  const onSubmit = (data: Product) => {
    if (selectedProduct?.id) {
      updateProduct(data);
    } else {
      addProduct(data);
    }
    setSelectedProduct(null);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {selectedProduct?.id ? 'Editar Produto' : 'Novo Produto'}
          </SheetTitle>
          <SheetDescription>
            Preencha as informações do produto manipulado
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Produto</Label>
            <Input
              id="nome"
              {...register('nome', { required: true })}
              placeholder="Ex: Slim Fórmula A"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria</Label>
            <Select
              value={watch('categoria')}
              onValueChange={(value) => setValue('categoria', value as 'Emagrecimento' | 'Academia')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Emagrecimento">Emagrecimento</SelectItem>
                <SelectItem value="Academia">Academia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preco">Preço (R$)</Label>
            <Input
              id="preco"
              type="text"
              {...register('preco', { required: true })}
              placeholder="79.90"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao_curta">Descrição Curta</Label>
            <Input
              id="descricao_curta"
              {...register('descricao_curta', { required: true })}
              placeholder="Breve descrição do produto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao_longa">Descrição Completa</Label>
            <Textarea
              id="descricao_longa"
              {...register('descricao_longa', { required: true })}
              placeholder="Descrição detalhada do produto"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagem">URL da Imagem</Label>
            <Input
              id="imagem"
              type="url"
              {...register('imagem', { required: true })}
              placeholder="https://..."
            />
          </div>

          <SheetFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" className="gradient-primary hover:opacity-90">
              {selectedProduct?.id ? 'Salvar' : 'Criar'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}