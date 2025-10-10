import {
  SfButton,
  SfLink,
  SfIconShoppingCart,
} from "@storefront-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  product: any; // Ideally, replace 'any' with your actual product type
}

export default function ProductCard({ product }: ProductCardProps) {
  const image =
    product?.images?.find((img: any) => img.is_primary_image)?.url ||
    product?.images?.[0]?.url ||
    "";

  const price = product?.regular_price ?? product?.sale_price ?? 0;

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const hasVariants = product?.variants?.length > 0;

  const handleAddToCart = () => {
    if (hasVariants) {
      // Redirect to product detail to select variant
      navigate(`/products/${product.id}`);
    } else {
      // Simple product, add directly
      addToCart({ product_id: product.id });
    }
  };

  return (
    <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">
      <div className="relative">
        <SfLink href={`/products/${product?.id}`} className="block">
          <img
            src={image}
            alt={product?.name || "Product"}
            className="object-cover h-auto rounded-md aspect-square"
            width="300"
            height="300"
          />
        </SfLink>
      </div>
      <div className="p-4 border-t border-neutral-200">
        <Link to={`/products/${product.id}`} className="no-underline font-semibold">
          {product?.name}
        </Link>

        <p className="block py-2 font-normal typography-text-sm text-neutral-700">
          {product?.description}
        </p>

        <span className="block pb-2 font-bold typography-text-lg">
          ${price.toFixed(2)}
        </span>

        <SfButton
          size="sm"
          slotPrefix={<SfIconShoppingCart size="sm" />}
          onClick={handleAddToCart}
        >
          {hasVariants ? "Select options" : "Add to cart"}
        </SfButton>
      </div>
    </div>
  );
}