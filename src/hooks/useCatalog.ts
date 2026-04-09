import { useCatalogContext } from '../CatalogContext';
export type { CompanyProfile, Category, Product } from '../CatalogContext';

export function useCatalog() {
  return useCatalogContext();
}
