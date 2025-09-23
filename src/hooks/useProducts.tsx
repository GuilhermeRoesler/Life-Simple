import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';
import { initialProducts } from '@/utils/products';

interface ProductStore {
  products: Product[];
  isEditMode: boolean;
  selectedProduct: Product | null;
  setEditMode: (mode: boolean) => void;
  setSelectedProduct: (product: Product | null) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  exportProducts: () => string;
  importProducts: (jsonString: string) => void;
}

export const useProducts = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      isEditMode: false,
      selectedProduct: null,
      
      setEditMode: (mode) => set({ isEditMode: mode }),
      
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      
      updateProduct: (product) => {
        set((state) => ({
          products: state.products.map(p => 
            p.id === product.id ? product : p
          ),
          selectedProduct: null
        }));
      },
      
      addProduct: (product) => {
        set((state) => ({
          products: [...state.products, product],
          selectedProduct: null
        }));
      },
      
      deleteProduct: (productId) => {
        set((state) => ({
          products: state.products.filter(p => p.id !== productId)
        }));
      },
      
      exportProducts: () => {
        const state = get();
        return JSON.stringify(state.products, null, 2);
      },
      
      importProducts: (jsonString) => {
        try {
          const products = JSON.parse(jsonString);
          if (Array.isArray(products)) {
            set({ products });
          }
        } catch (error) {
          console.error('Error importing products:', error);
        }
      }
    }),
    {
      name: 'pharmacy-products'
    }
  )
);