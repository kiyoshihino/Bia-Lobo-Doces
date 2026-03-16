import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Brigadeiros Gourmet',
    description: 'Caixa com 12 unidades de brigadeiros em sabores variados (Pistache, Belga, Ninho e Caramelo).',
    price: 45.00,
    image: 'https://drive.google.com/thumbnail?id=1aYGFBGabNtOD9_g8f5vu7m5oGOHEq1EV&sz=w600',
    category: 'Docinhos',
    tags: ['Best Seller', 'Artesanal']
  },
  {
    id: '2',
    name: 'Bolo Decorado P',
    description: 'Bolo artesanal de 15cm (10-12 fatias). Escolha massa e recheio personalizados.',
    price: 180.00,
    image: 'https://drive.google.com/thumbnail?id=1jDRq9hbR4nN7cI5FzGUzP-0l5WUQH4Hk&sz=w600',
    category: 'Bolos',
    tags: ['Festa', 'Personalizado']
  },
  {
    id: '3',
    name: 'Docinhos Finos',
    description: 'Seleção de doces para eventos (Camafeu, Ouriço, Fondados). Unidade.',
    price: 3.50,
    image: 'https://drive.google.com/thumbnail?id=1HvNazS3y_P3GaJpYneMFpMkr3usPXSKB&sz=w600',
    category: 'Docinhos',
    tags: ['Casamento', 'Eventos']
  }
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bia_lobo_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('bia_lobo_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return { products, addProduct, updateProduct, deleteProduct };
}
