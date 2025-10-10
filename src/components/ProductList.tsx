import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../services/product";
import type { Product, Facet } from "./types";

const productsPerPage = 3;

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [facets, setFacets] = useState<Facet[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Toggle checkbox filter
  const toggleCheckbox = (facetName: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[facetName] || [];
      const updated = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [facetName]: updated,
      };
    });
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  // Fetch products with filters
  const loadProducts = async () => {
    setLoading(true);
    try {
      const { items, facets } = await fetchProducts(selectedFilters);
      setProducts(items);
      setFacets(facets);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedFilters]);

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginated = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="flex justify-center w-full bg-gray-50 py-8">
      <div className="flex gap-8 max-w-7xl w-full px-4">
        {/* Filter Sidebar */}
        <aside className="w-64">
          <h2 className="text-lg font-bold mb-4">Filters</h2>
          {facets.map((facet) => (
            <details key={facet.name} className="mb-4">
              <summary className="font-semibold cursor-pointer capitalize">
                {facet.name}
              </summary>
              <div className="mt-2 space-y-1 max-h-48 overflow-auto">
                {facet.values.map((v) => (
                  <label key={v.value} className="flex items-center space-x-2 capitalize">
                    <input
                      type="checkbox"
                      checked={selectedFilters[facet.name]?.includes(v.value) || false}
                      onChange={() => toggleCheckbox(facet.name, v.value)}
                    />
                    <span>{v.value} ({v.count})</span>
                  </label>
                ))}
              </div>
            </details>
          ))}
        </aside>

        {/* Product List */}
        <div className="flex-1">
          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {!loading && !error && paginated.length === 0 && (
              <p>No products match selected filters.</p>
            )}
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 border rounded"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded ${
                    page === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-3 py-1 border rounded"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}