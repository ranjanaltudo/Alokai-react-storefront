import {
  SfButton,
  SfRating,
  SfCounter,
  SfLink,
  SfIconShoppingCart,
  SfIconFavorite,
} from "@storefront-ui/react";

interface ProductCardProps {
  product: any; // Replace with your product type
}

export default function ProductCard({ product }: ProductCardProps) {
  const image =
    product?.images?.find((img: any) => img.is_primary_image)?.url ||
    product?.images?.[0]?.url ||
    "https://via.placeholder.com/300";

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
        <SfButton
          variant="tertiary"
          size="sm"
          square
          className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
          aria-label="Add to wishlist"
        >
          <SfIconFavorite size="sm" />
        </SfButton>
      </div>
      <div className="p-4 border-t border-neutral-200">
        <SfLink
          href={`/products/${product?.slug}`}
          variant="secondary"
          className="no-underline"
        >
          {product?.name}
        </SfLink>

        <div className="flex items-center pt-1">
          <SfRating size="xs" value={5} max={5} />{" "}
          {/* No rating in API → hardcoded */}
          <SfLink href="#" variant="secondary" className="pl-1 no-underline">
            <SfCounter size="xs">{123}</SfCounter>{" "}
            {/* Hardcoded count for now */}
          </SfLink>
        </div>

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
