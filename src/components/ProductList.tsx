import { useEffect, useState } from "react";
import ProductCard from "./ProductCard"
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

  const brands = Array.from(new Set(products.map((p) => p.brand)));
  const flavours = Array.from(new Set(products.flatMap((p) => p.variants?.map(v => v.options.Flavours) || [])));
  const quantities = Array.from(new Set(products.flatMap((p) => p.variants?.map(v => v.options.Quantity) || [])));

return (
    <div className="flex gap-8">
      {/* LEFT: Facets Sidebar */}
      <aside className="w-64">
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        {/* Brand */}
        <details open className="mb-4">
          <summary className="cursor-pointer font-semibold">Brand</summary>
          <div className="mt-2 space-y-1">
            {brands.map((b) => (
              <label key={b} className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>{b}</span>
              </label>
            ))}
          </div>
        </details>

        {/* Flavours */}
        <details open className="mb-4">
          <summary className="cursor-pointer font-semibold">Flavours</summary>
          <div className="mt-2 space-y-1">
            {flavours.map((f) => (
              <label key={f} className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>{f}</span>
              </label>
            ))}
          </div>
        </details>

        {/* Quantity */}
        <details open className="mb-4">
          <summary className="cursor-pointer font-semibold">Quantity</summary>
          <div className="mt-2 space-y-1">
            {quantities.map((q) => (
              <label key={q} className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>{q}</span>
              </label>
            ))}
          </div>
        </details>

        {/* Availability */}
        <details open>
          <summary className="cursor-pointer font-semibold">Availability</summary>
          <label className="flex items-center space-x-2 mt-2">
            <input type="checkbox" />
            <span>In Stock</span>
          </label>
        </details>
      </aside>

      {/* RIGHT: Product Grid */}
      <div className="flex-1">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
