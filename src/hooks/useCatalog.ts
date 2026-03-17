import { useState, useEffect } from 'react';

export interface CompanyProfile {
  name: string;
  logo: string;
  phone: string;
  whatsapp: string;
  address: string;
  addressShort: string;
  instagram: string;
  facebook: string;
  email: string;
  bio: string;
  experience: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
}

const DEFAULT_COMPANY: CompanyProfile = {
  name: 'Bia Lobo',
  logo: '/assets/logo.png',
  phone: '+55 61 99259-0209',
  whatsapp: '5561992590209',
  address: 'Qri 15 casa 12c 5 - Santa Maria (Residencial Santos Dumont), Brasília - DF',
  addressShort: 'Santa Maria, Brasília e região',
  instagram: 'bialobodoces',
  facebook: 'bialobodoces',
  email: 'contato@bialobodoces.com.br',
  bio: 'Há mais de 8 anos, Bia Lobo transforma ingredientes simples em experiências doces únicas. Nascida em Brasília e apaixonada pela arte da confeitaria, ela descobriu seu dom de criar doces artesanais que contam histórias e conectam pessoas.',
  experience: '8+'
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Docinhos', image: 'https://drive.google.com/thumbnail?id=1aYGFBGabNtOD9_g8f5vu7m5oGOHEq1EV&sz=w600' },
  { id: 'cat-2', name: 'Bolos', image: 'https://drive.google.com/thumbnail?id=1jDRq9hbR4nN7cI5FzGUzP-0l5WUQH4Hk&sz=w600' },
  { id: 'cat-3', name: 'Kits', image: 'https://drive.google.com/thumbnail?id=10QlmFgimPU3H5gU9D02bLVDxVf_JTYL7&sz=w600' },
  { id: 'cat-4', name: 'Mesa de Doces', image: 'https://drive.google.com/thumbnail?id=1HvNazS3y_P3GaJpYneMFpMkr3usPXSKB&sz=w600' }
];

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
  }
];

export function useCatalog() {
  const [profile, setProfile] = useState<CompanyProfile>(() => {
    const saved = localStorage.getItem('bia_lobo_profile');
    let profile = saved ? JSON.parse(saved) : DEFAULT_COMPANY;
    
    // Migration: Update old name and emoji logo to new brand
    if (profile.name === 'Bia Lobo Doces') {
      profile.name = 'Bia Lobo';
    }
    if (profile.logo === '🌸' || profile.logo === '') {
      profile.logo = '/assets/logo.png';
    }
    
    return profile;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('bia_lobo_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bia_lobo_products');
    let items: Product[] = saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    
    // Migration & Cleanup
    return items.map(p => {
      const trimmedCategory = p.category.trim();
      // If the product category is slightly off (whitespace), fix it. 
      // If it doesn't exist at all, we keep it but it might not show up unless "Todos" is selected.
      return {
        ...p,
        name: p.name.trim(),
        category: trimmedCategory
      };
    });
  });

  useEffect(() => {
    try {
      localStorage.setItem('bia_lobo_profile', JSON.stringify(profile));
    } catch (e) { console.error('Error saving profile:', e); }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('bia_lobo_categories', JSON.stringify(categories));
    } catch (e) { console.error('Error saving categories:', e); }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('bia_lobo_products', JSON.stringify(products));
    } catch (e) { console.error('Error saving products:', e); }
  }, [products]);

  // Profile actions
  const updateProfile = (newProfile: CompanyProfile) => setProfile(newProfile);

  // Category actions
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, name: category.name.trim(), id: Date.now().toString() };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (id: string, updated: Partial<Category>) => {
    const newName = updated.name?.trim();
    const oldCategory = categories.find(c => c.id === id);
    
    // If name changed, update products using this category
    if (newName && oldCategory && oldCategory.name !== newName) {
      setProducts(prev => prev.map(p => p.category === oldCategory.name ? { ...p, category: newName } : p));
    }
    
    setCategories(categories.map(c => c.id === id ? { ...c, ...updated, name: newName || c.name } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  // Product actions
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, name: product.name.trim(), category: product.category.trim(), id: Date.now().toString() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(products.map(p => {
      if (p.id !== id) return p;
      return { 
        ...p, 
        ...updated, 
        name: updated.name?.trim() ?? p.name, 
        category: updated.category?.trim() ?? p.category 
      };
    }));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return {
    profile,
    updateProfile,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };
}
