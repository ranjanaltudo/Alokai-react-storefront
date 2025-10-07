import {
  SfButton,
  SfRating,
  SfCounter,
  SfLink,
  SfIconShoppingCart,
  SfIconFavorite,
} from "@storefront-ui/react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: any; // Replace with your product type
}

export default function ProductCard({ product }: ProductCardProps) {
  const image =
    product?.images?.find((img: any) => img.is_primary_image)?.url ||
    product?.images?.[0]?.url ||
    "";

  const price = product?.regular_price ?? product?.sale_price ?? 0;

  return (
    <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">
      <div className="relative">
        <SfLink href={`/products/${product?.slug}`} className="block">
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
        <Link to={`/products/${product.slug}`} className="no-underline font-semibold">
          {product?.name}
        </Link>

        <p className="block py-2 font-normal typography-text-sm text-neutral-700">
          {product?.description}
        </p>

        <span className="block pb-2 font-bold typography-text-lg">
          ${price.toFixed(2)}
        </span>

        <SfButton size="sm" slotPrefix={<SfIconShoppingCart size="sm" />}>
          Add to cart
        </SfButton>
      </div>
    </div>
  );
}
