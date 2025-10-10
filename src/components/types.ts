export interface Variant {
  id: string;
  options: {
    [key: string]: string; // <- allows indexing with string
  };
}

export interface Product {
  id: string;
  slug?: string;
  name: string;
  description?: string;
  brand?: string;
  regular_price: number;
  sale_price?: number;
  inventory_quantity?: number;
  isSale?: boolean;
  size?: "5.5" | "6.0" | "6.5";
  color?: "Red" | "Green" | "Blue";
  img?: string; // optional quick-access image
  images?: { url: string; is_primary_image?: boolean }[];
  dimensions?: {
    height?: number;
    width?: number;
    length?: number;
    weight?: number;
  };
  variants?: Variant[];
}

export interface FacetValue {
  value: string;
  count: number;
}

export interface Facet {
  name: string;
  values: FacetValue[];
}

export interface CartItem {
  product_id: string;
  name: string;
  desc?: string;
  image?: string;
  price: number;
  quantity: number;
  specs?: SpecSelection[];
}

export interface Cart {
  cart_id: string;
  user_id: string;
  item_count: number;
  items: CartItem[];
  subtotal: number;
  tax_total: number;
  fees: number;
  discount_total: number;
  shipping_total: number;
  total: number;
  promotions: any[];
  specs?: SpecSelection[];
}

export interface CartAddItem {
  product_id: string;
  specs?: SpecSelection[];
  quantity: number;
}


export interface SpecSelection {
  spec_id: string;
  option_id: string;
}