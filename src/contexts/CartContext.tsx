// contexts/CartContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Cart, CartAddItem, SpecSelection } from "../components/types"; // Ensure correct types
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
} from "../services/cart";

interface CartContextValue {
  cart: Cart | null;
  addToCart: (item: { product_id: string; specs?: SpecSelection[] }, qty?: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getSubtotal: () => number;
  refreshCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch the current cart
const refreshCart = async () => {
  setLoading(true);
  try {
    const res = await getCart();

    const apiCart = res?.data;

    if (!apiCart) {
      setCart(null);
      return;
    }

    const transformedCart: Cart = {
      cart_id: apiCart.cart_id,
      user_id: apiCart.user_id,
      item_count: apiCart.item_count,
      subtotal: apiCart.subtotal,
      tax_total: apiCart.tax_total,
      fees: apiCart.fees,
      discount_total: apiCart.discount_total,
      shipping_total: apiCart.shipping_total,
      total: apiCart.total,
      promotions: apiCart.promotions,
      specs: [],
      items: apiCart.items.map((item: any) => ({
        product_id: item.product_id,
        name: item.product?.name || "Unnamed Product",
        desc: item.product?.description || "",
        image: item.product?.image || "", // You may need to enhance this later
        //image: item.product?.images?.find(img => img.is_primary_image)?.url || "",
        price: item.unit_price,
        quantity: item.quantity,
        specs: item.specs?.map((spec: any) => ({
          spec_id: spec.spec_id,
          option_id: spec.option_id,
        })) || [],
      })),
    };

    setCart(transformedCart);
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    setCart(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    refreshCart();
  }, []);

  // Add item to cart (with optional variants)
  const addToCart = async (
    item: { product_id: string; specs?: SpecSelection[] },
    qty = 1
  ) => {
    try {
      const payload: CartAddItem = {
        product_id: item.product_id,
        quantity: qty,
        specs: item.specs || [],
      };

      await addCartItem(payload);
      await refreshCart();
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  // Update item quantity
  const updateQuantity = async (id: string, qty: number) => {
    try {
      await updateCartItem(id, qty);
      await refreshCart();
    } catch (error) {
      console.error("Update quantity failed:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (id: string) => {
    try {
      await removeCartItem(id);
      await refreshCart();
    } catch (error) {
      console.error("Remove item failed:", error);
    }
  };

  // Clear all items in cart
  const clearCart = async () => {
    if (!cart?.items?.length) return;
    try {
      for (const item of cart.items) {
        await removeCartItem(item.product_id);
      }
      await refreshCart();
    } catch (error) {
      console.error("Clear cart failed:", error);
    }
  };

  // Calculate subtotal
  const getSubtotal = () => cart?.subtotal ?? 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getSubtotal,
        refreshCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};