import { useEffect, useState } from "react";
import ProductCard from "./Productcard"
import { fetchProducts } from "../services/OrderCloudService";


// Define the expected product type based on your JSON
interface Variant {
  id: string;
  options: {
    Flavours: string;
    Quantity: string;
  };
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  brand: string;
  regular_price: number;
  sale_price?: number;
  inventory_quantity: number;
  images: { url: string; is_primary_image?: boolean }[];
  dimensions?: {
    height: number;
    width: number;
    length: number;
    weight: number;
  };
  variants?: Variant[];
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data ?? []);
      } catch (err: any) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  if (products.length === 0)
    return <p className="text-center text-gray-600">No products available.</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
