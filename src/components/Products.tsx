import { useState } from 'react';
import { Search, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProducts } from '@/hooks/useProducts';
import ProductModal from './ProductModal';
import EditProductPanel from './EditProductPanel';
import { Product } from '@/types';

export default function Products() {
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const { products, isEditMode, setEditMode, deleteProduct } = useProducts();

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(search.toLowerCase()) ||
    product.descricao_curta.toLowerCase().includes(search.toLowerCase())
  );


  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  return (
    <section id="produtos" className="py-12 md:px-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Nossos Produtos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Fórmulas manipuladas com qualidade farmacêutica para seus objetivos
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 border-gradient-primary border-2"
            />
          </div>

          {/* Admin Toggle */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(!isEditMode)}
              >
                {isEditMode ? 'Sair do Modo Edição' : 'Modo Edição'}
              </Button>
            </div>
          )}
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="Emagrecimento" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="Emagrecimento">Emagrecimento</TabsTrigger>
            <TabsTrigger value="Academia">Academia</TabsTrigger>
            <TabsTrigger value="Pele">Pele</TabsTrigger>
          </TabsList>

          <TabsContent value="Emagrecimento" className="mt-8">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {filteredProducts
                  .filter(p => p.categoria === 'Emagrecimento')
                  .map((product) => (
                    <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                        <div className="aspect-video relative overflow-hidden bg-accent flex items-center justify-center p-4">
                          <img
                            src={product.imagem}
                            alt={product.nome}
                            className="h-full object-cover"
                          />
                          {isEditMode && (
                            <div className="absolute top-2 right-2 flex gap-2">
                              <Button
                                size="icon"
                                variant="secondary"
                                onClick={() => {/* Open edit panel */ }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => deleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl">{product.nome}</CardTitle>
                          <CardDescription>{product.descricao_curta}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold text-primary">
                            R$ {product.preco}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            size="sm"
                            onClick={() => handleViewDetails(product)}
                            className="w-full gradient-primary hover:opacity-90"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </TabsContent>

          <TabsContent value="Academia" className="mt-8">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {filteredProducts
                  .filter(p => p.categoria === 'Academia')
                  .map((product) => (
                    <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                        <div className="aspect-video relative overflow-hidden bg-accent flex items-center justify-center p-4">
                          <img
                            src={product.imagem}
                            alt={product.nome}
                            className="h-full object-cover"
                          />
                          {isEditMode && (
                            <div className="absolute top-2 right-2 flex gap-2">
                              <Button
                                size="icon"
                                variant="secondary"
                                onClick={() => {/* Open edit panel */ }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => deleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl">{product.nome}</CardTitle>
                          <CardDescription>{product.descricao_curta}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold text-primary">
                            R$ {product.preco}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            size="sm"
                            onClick={() => handleViewDetails(product)}
                            className="w-full gradient-primary hover:opacity-90"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </TabsContent>

          {/* fdssdf */}
          <TabsContent value="Pele" className="mt-8">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {filteredProducts
                  .filter(p => p.categoria === 'Pele')
                  .map((product) => (
                    <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                        <div className="aspect-video relative overflow-hidden bg-accent flex items-center justify-center p-4">
                          <img
                            src={product.imagem}
                            alt={product.nome}
                            className="h-full object-cover"
                          />
                          {isEditMode && (
                            <div className="absolute top-2 right-2 flex gap-2">
                              <Button
                                size="icon"
                                variant="secondary"
                                onClick={() => {/* Open edit panel */ }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => deleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl">{product.nome}</CardTitle>
                          <CardDescription>{product.descricao_curta}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold text-primary">
                            R$ {product.preco}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            size="sm"
                            onClick={() => handleViewDetails(product)}
                            className="w-full gradient-primary hover:opacity-90"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </TabsContent>
        </Tabs>

        {/* Product Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={showProductModal}
            onClose={() => {
              setShowProductModal(false);
              setSelectedProduct(null);
            }}
          />
        )}

        {/* Edit Product Panel */}
        <EditProductPanel />
      </div>
    </section>
  );
}