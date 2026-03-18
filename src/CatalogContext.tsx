import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface CatalogContextType {
  profile: CompanyProfile;
  updateProfile: (newProfile: CompanyProfile) => void;
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updated: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  isLoading: boolean;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

// API Local na pasta /api/ (funciona tanto no Hostinger quanto local se tiver virtualhost PHP)
const API_URL = '/api/index.php';

const apiCall = async (action: string, data?: any) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, data })
    });
    if (!response.ok) throw new Error('Network response error');
  } catch (error) {
    console.error(`Falha ao executar ${action} na API. Mude para produção ou rode o setup.php.`, error);
  }
};

const DEFAULT_COMPANY: CompanyProfile = {
  name: 'Bia Lobo',
  logo: './assets/logo.png',
  phone: '+55 61 99259-0209',
  whatsapp: '5561992590209',
  address: 'Qri 15 casa 12c 5 - Santa Maria (Residencial Santos Dumont), Brasília - DF',
  addressShort: 'Santa Maria, Brasília e região',
  instagram: 'bialobodoces',
  facebook: 'bialobodoces',
  email: 'contato@bialobodoces.com.br',
  bio: 'Há mais de 8 anos, Bia Lobo transforma ingredientes...',
  experience: '8+'
};

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<CompanyProfile>(DEFAULT_COMPANY);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.profile && Object.keys(data.profile).length > 0) {
          setProfile(data.profile);
        }
        if (data.categories) setCategories(data.categories);
        if (data.products) setProducts(data.products);
      })
      .catch(err => {
        console.warn('Backend PHP não encontrado ou com erro. Utilizando layout vazio provisório.', err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const updateProfile = (newProfile: CompanyProfile) => {
    setProfile(newProfile);
    apiCall('updateProfile', newProfile);
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, name: category.name.trim(), id: Date.now().toString() };
    setCategories(prev => [...prev, newCategory]);
    apiCall('addCategory', newCategory);
  };

  const updateCategory = (id: string, updated: Partial<Category>) => {
    const newName = updated.name?.trim();
    const oldCategory = categories.find(c => c.id === id);
    
    // Cascata: muda o nome da categoria no produto se o nome da categoria mudar
    if (newName && oldCategory && oldCategory.name !== newName) {
      setProducts(prev => prev.map(p => p.category === oldCategory.name ? { ...p, category: newName } : p));
    }
    
    // Atualiza
    setCategories(prev => prev.map(c => {
      if (c.id === id) {
        const fullCat = { ...c, ...updated, name: newName || c.name };
        apiCall('updateCategory', fullCat);
        return fullCat;
      }
      return c;
    }));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    apiCall('deleteCategory', { id });
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, name: product.name.trim(), category: product.category.trim(), id: Date.now().toString() };
    setProducts(prev => [...prev, newProduct]);
    apiCall('addProduct', newProduct);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const fullProd = {
          ...p,
          ...updated,
          name: updated.name?.trim() ?? p.name,
          category: updated.category?.trim() ?? p.category
        };
        apiCall('updateProduct', fullProd);
        return fullProd;
      }
      return p;
    }));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    apiCall('deleteProduct', { id });
  };

  return (
    <CatalogContext.Provider value={{
      profile, updateProfile,
      categories, addCategory, updateCategory, deleteCategory,
      products, addProduct, updateProduct, deleteProduct,
      isLoading
    }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalogContext = () => {
  const context = useContext(CatalogContext);
  if (context === undefined) {
    throw new Error('useCatalogContext must be used within a CatalogProvider');
  }
  return context;
};
