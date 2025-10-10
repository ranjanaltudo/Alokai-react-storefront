import client from './client'

interface SearchFilters {
  brands?: string[]
  categories?: string[]
}

interface ProductSearchResponse {
  items: any[]
  facets: any[]
}

export const fetchProducts = async (filters: Record<string, string[]> = {}): Promise<ProductSearchResponse> => {
  try {
    // Remove empty filters
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, values]) => Array.isArray(values) && values.length > 0)
    );

    const body = {
      page: 1,
      page_size: 20,
      includes: ['facets', 'variants'],
      filters: cleanedFilters,
    };

    const response = await client.post('/products/search', body);

    const data = response?.data?.data;
    const items = Array.isArray(data?.items) ? data.items : [];
    const facets = Array.isArray(data?.meta?.facets) ? data.meta.facets : [];

    return { items, facets };
  } catch (error: any) {
    console.error('Error fetching products:', error.response?.data || error.message);
    return { items: [], facets: [] };
  }
};

export const getProductById = async (productId: string): Promise<any | null> => {
  try {
    const response = await client.get(`/products/${productId}`)
    return response?.data?.data || null
  } catch (error: any) {
    console.error(`Error fetching product ${productId}:`, error.response?.data || error.message)
    return null
  }
}