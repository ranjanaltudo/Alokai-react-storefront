import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../services/OrderCloudService";

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
  category: string
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

const productsPerPage = 3;

export default function ProductList() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);


const toggleCheckbox = (
  value: string,
  selected: string[],
  setter: (v: string[]) => void
) => {
  if (!Array.isArray(selected)) return;

  if (selected.includes(value)) {
    setter(selected.filter((v) => v !== value));
  } else {
    setter([...selected, value]);
  }
};

// initial fetch
useEffect(() => {
  const load = async () => {
    setLoading(true);
    try {
      const { items, facets } = await fetchProducts();  // 👈 Fix: destructure
      setAllProducts(items);
      setFilteredProducts(items);

      const categoryFacet = facets.find((f: any) => f.name === "Category");
      setCategoryList(categoryFacet?.values?.map((v: any) => v.value) || []);

      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);




  // Apply filters
useEffect(() => {
  const load = async () => {
    setLoading(true);
    try {
      const { items, facets } = await fetchProducts({
        brands: selectedBrands,
        categories: selectedCategories,
      });

      setAllProducts(items);
      setFilteredProducts(items);
      setError(null);

      const categoryFacet = facets.find((f: any) => f.name === "Category");
      setCategoryList(categoryFacet?.values?.map((v: any) => v.value) || []);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  load();
}, [selectedBrands, selectedCategories]);


  // Extract brand facets from all products
  const allBrands = Array.from(new Set(allProducts.map((p) => p.brand)));
  
 /* const allCategories = Array.from(
    new Set(allProducts.flatMap((p) => p.category || []))
  );*/


  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const paginated = filteredProducts.slice(startIdx, startIdx + productsPerPage);


  return (
    <div className="flex justify-center w-full bg-gray-50 py-8">
      <div className="flex gap-8 max-w-7xl w-full px-4">
        <aside className="w-64">
          <h2 className="text-lg font-bold mb-4">Filters</h2>
          <details>
            <summary className="font-semibold cursor-pointer">Brand</summary>
            <div className="mt-2 space-y-1 max-h-48 overflow-auto">
              {allBrands.map((b) => (
                <label key={b} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => toggleCheckbox(b, selectedBrands, setSelectedBrands)}
                  />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </details>
          {/* Category Filter */}
          <details>
            <summary className="font-semibold cursor-pointer mt-4">Category</summary>
            <div className="mt-2 space-y-1 max-h-48 overflow-auto">
              {categoryList.map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() =>
                      toggleCheckbox(cat, selectedCategories, setSelectedCategories)
                    }
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </details>
        </aside>

      <div className="flex-1">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {paginated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}className="px-3 py-1 border rounded">
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${
                  page === currentPage ? "bg-blue-600 text-white" : "bg-white text-black"
                }`}
              >
                {page}
              </button>
            ))}
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="px-3 py-1 border rounded">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}
