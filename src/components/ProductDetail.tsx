import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts } from "../services/OrderCloudService";
import { SfButton } from "@storefront-ui/react";
import FooterBasic from '../components/Footer';
import Hero from '../components/HeroBanner';


export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const allProducts = await fetchProducts();
      const found = allProducts.find((p: any) => p.slug === slug);
      setProduct(found);
      setLoading(false);
    };
    loadProduct();
  }, [slug]);

   if (loading || !product) return null;

  return (

    <div className="max-w-full mx-auto p-6">
      <Hero />
    <nav className="text-sm mb-4 text-gray-500">
    <Link to="/" className="text-blue-500 mb-4 block">
        ← Back to products
      </Link>
        <span className="text-gray-800 font-semibold text-lg">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 items-start bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-center">
            <img src={product.images?.[0]?.url} alt={product.name} className="w-64 h-64 object-cover rounded-lg shadow-sm" />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold mb-3">
            {product.name}
          </h1>

          {/* Features */}
          <ul className="list-disc ml-5 text-gray-700 mb-4">
            <li> {product.description} </li>
            
          </ul>
          
          {/* Price + Quantity */}
          <div className="flex items-center gap-6 mb-6">
            <span className="text-xl font-semibold">Price: ${product.regular_price}</span>
          </div>
          <p className="mt-1">Brand: {product.brand}</p>

          {/* Stock Info */}
          <p className="text-green-600 mb-4">{product.inventory_quantity} in stocks</p>

          {/* Add to Cart */}
          <SfButton
            size="lg"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-medium rounded-md transition-all duration-200"
          >
            Add to cart
          </SfButton>    
        </div>
      </div> 
      <FooterBasic />            
    </div>
    
  );
}

