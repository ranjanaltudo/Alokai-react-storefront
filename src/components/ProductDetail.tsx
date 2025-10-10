import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/product";
import { SfButton, SfSelect } from "@storefront-ui/react";
import FooterBasic from "../components/Footer";
import Hero from "../components/HeroBanner";
import { useCart } from "../contexts/CartContext";
import type { Variant } from "./types";

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Selected options by option category, e.g. { Flavours: "Dark", Quantity: "250 ml" }
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      if (!productId) return;

      const productData = await getProductById(productId);
      setProduct(productData);
      setSelectedOptions({}); // reset selections on product change
      setLoading(false);
    };
    loadProduct();
  }, [productId]);

  if (loading || !product) return null;

  const hasVariants = product?.variants?.length > 0;

  // Extract option categories (keys) from the first variant's options object
  const optionCategories = hasVariants ? Object.keys(product.variants[0].options) : [];

  // Build list of unique values for each option category
  const optionsByCategory = optionCategories.reduce((acc, category) => {
  acc[category] = Array.from(
    new Set(
      product.variants
        .map((v: Variant) => v.options?.[category])
        .filter((val: unknown): val is string => typeof val === 'string')
    )
  );
  return acc;
}, {} as Record<string, string[]>);

  // Check if all option categories have a selected value
  const allOptionsSelected = optionCategories.every(
    (category) => selectedOptions[category] && selectedOptions[category] !== ""
  );

  // Find variant matching current selected options
  const matchingVariant = hasVariants
    ? product.variants.find((variant: any) =>
        optionCategories.every(
          (category) => variant.options[category] === selectedOptions[category]
        )
      )
    : null;

  const handleAddToCart = () => {
  if (!product?.id) return;

  const payload: any = {
    product_id: product.id,
    quantity: 1,
  };

  if (hasVariants && allOptionsSelected) {
    const specs = Object.entries(selectedOptions).map(([spec_id, option_id]) => ({
      spec_id: spec_id.toUpperCase(),   // if API expects upper-case keys
      option_id: option_id.toUpperCase() // optional: sanitize value
    }));
    payload.specs = specs;
  }

  addToCart(payload);
};

  return (
    <div className="max-w-full mx-auto p-6">
      <Hero />
      <nav className="text-sm mb-4 text-gray-500">
        <Link to="/" className="text-blue-500 mb-4 block">
          ← Back to products
        </Link>
        <span className="text-gray-800 font-semibold text-lg">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 items-start bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-center">
          <img
            src={product.images?.[0]?.url}
            alt={product.name}
            className="w-64 h-64 object-cover rounded-lg shadow-sm"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold mb-3">{product.name}</h1>

          <ul className="list-disc ml-5 text-gray-700 mb-4">
            <li>{product.description}</li>
          </ul>

          <div className="flex items-center gap-6 mb-6">
            <span className="text-xl font-semibold">
              Price: ${product.sale_price ?? product.regular_price}
            </span>
          </div>

          <p className="mt-1">Brand: {product.brand}</p>
          <p className="text-green-600 mb-4">{product.inventory_quantity} in stock</p>

          {/* Variant Options */}
          {hasVariants && (
            <div className="space-y-4">
              {optionCategories.map((category) => (
                <div key={category}>
                  <label className="block mb-1 font-medium">{category}</label>
                  <SfSelect
                    value={selectedOptions[category] || ""}
                    onChange={(e) =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [category]: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select {category}</option>
                    {optionsByCategory[category].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </SfSelect>
                </div>
              ))}
            </div>
          )}

          <SfButton
            size="lg"
            disabled={hasVariants && !allOptionsSelected}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-medium rounded-md transition-all duration-200 disabled:opacity-50"
            onClick={handleAddToCart}
          >
            {hasVariants && !allOptionsSelected ? "Select Options First" : "Add to Cart"}
          </SfButton>
        </div>
      </div>

      <FooterBasic />
    </div>
  );
}