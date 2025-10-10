import React, { useRef, useEffect, useState } from "react";
import Hero from "./HeroBanner";
import FooterBasic from "./Footer";
import {
  SfButton,
  SfIconCheckCircle,
  SfIconClose,
  SfInput,
  SfLink,
} from "@storefront-ui/react";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getSubtotal } = useCart();
    const cartItems = cart?.items || [];

  // --- ORDER SUMMARY STATE ---
  const errorTimer = useRef(0);
  const positiveTimer = useRef(0);
  const informationTimer = useRef(0);
  const [inputValue, setInputValue] = useState("");
  const [promoCode, setPromoCode] = useState(0);
  const [informationAlert, setInformationAlert] = useState(false);
  const [positiveAlert, setPositiveAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    clearTimeout(errorTimer.current);
    if (errorAlert)
      errorTimer.current = window.setTimeout(() => setErrorAlert(false), 5000);
    return () => clearTimeout(errorTimer.current);
  }, [errorAlert]);

  useEffect(() => {
    clearTimeout(positiveTimer.current);
    if (positiveAlert)
      positiveTimer.current = window.setTimeout(() => setPositiveAlert(false), 5000);
    return () => clearTimeout(positiveTimer.current);
  }, [positiveAlert]);

  useEffect(() => {
    clearTimeout(informationTimer.current);
    if (informationAlert)
      informationTimer.current = window.setTimeout(() => setInformationAlert(false), 5000);
    return () => clearTimeout(informationTimer.current);
  }, [informationAlert]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

  const subtotal = getSubtotal();
  const itemsSubtotal = () =>
    subtotal + /* savings */ 0.0 + /* delivery */ 0.0 + /* tax */ subtotal * 0.1;
  const totalPrice = () => itemsSubtotal() + promoCode;

  const checkPromoCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if ((promoCode === -100 && inputValue.toUpperCase() === "VSF2020") || !inputValue) return;
    if (inputValue.toUpperCase() === "VSF2020") {
      setPromoCode(-100);
      setPositiveAlert(true);
    } else {
      setErrorAlert(true);
    }
  };

  const removePromoCode = () => {
    setPromoCode(0);
    setInformationAlert(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      <Hero />
      <h1 className="text-3xl font-bold mb-6">SHOPPING CART</h1>
      <p className="text-gray-600 mb-4">{cartItems.length} Items</p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-neutral-600 py-12">
              🛒 Your cart is empty.
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product_id}
                className="flex flex-col sm:flex-row items-center sm:items-start border rounded-lg p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-contain mb-3 sm:mb-0"
                />
                <div className="flex-1 sm:ml-4">
                  <h2 className="font-semibold text-lg leading-snug">{item.name}</h2>
                  <p className="text-sm text-gray-600 leading-snug">{item.desc}</p>

                  <div className="flex items-center mt-3">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                      className="px-3 py-1 border rounded text-lg"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="px-3 py-1 border rounded text-lg"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.product_id)}
                      className="ml-4 text-red-600 text-sm flex items-center"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
                <p className="font-semibold text-lg mt-2 sm:mt-0 sm:ml-4">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="border rounded-lg p-4 shadow-sm h-fit">
          <div className="flex justify-between items-end bg-neutral-100 py-2 px-4 md:px-6 md:pt-6 md:pb-4">
            <p className="text-xl font-bold">Order Summary</p>
            <p className="text-sm font-medium">(Items: {cartItems.length})</p>
          </div>

          <div className="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
            <div className="flex justify-between pb-4 text-sm">
              <div className="flex flex-col grow pr-2">
                <p>Items Subtotal</p>
                <p className="text-xs text-neutral-500">Original Price</p>
                <p className="text-xs text-secondary-700">Savings</p>
                <p className="my-2">Delivery</p>
                <p>Estimated Sales Tax</p>
              </div>
              <div className="flex flex-col text-right">
                <p>{formatPrice(itemsSubtotal())}</p>
                <p className="text-xs text-neutral-500">{formatPrice(subtotal)}</p>
                <p className="text-xs text-secondary-700">{formatPrice(0)}</p>
                <p className="my-2">{formatPrice(0)}</p>
                <p>{formatPrice(subtotal * 0.1)}</p>
              </div>
            </div>

            {promoCode ? (
              <div className="flex items-center mb-5 py-5 border-y border-neutral-200">
                <p>Promo Code</p>
                <SfButton
                  size="sm"
                  variant="tertiary"
                  className="ml-auto mr-2"
                  onClick={removePromoCode}
                >
                  Remove
                </SfButton>
                <p>{formatPrice(promoCode)}</p>
              </div>
            ) : (
              <form
                className="flex gap-x-2 py-4 border-y border-neutral-200 mb-4"
                onSubmit={checkPromoCode}
              >
                <SfInput
                  value={inputValue}
                  placeholder="Enter promo code"
                  wrapperClassName="grow"
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <SfButton type="submit" variant="secondary">
                  Apply
                </SfButton>
              </form>
            )}

            <p className="px-3 py-1.5 bg-secondary-100 text-secondary-700 text-sm rounded-md text-center mb-4">
              You are saving ${Math.abs(0).toFixed(2)} on your order today!
            </p>

            <div className="flex justify-between font-bold text-lg pb-4 mb-4 border-b border-neutral-200">
              <p>Total</p>
              <p>{formatPrice(totalPrice())}</p>
            </div>

            <SfButton size="lg" className="w-full">
              Place Order And Pay
            </SfButton>

            <div className="text-sm mt-4 text-center">
              By placing my order, you agree to our{" "}
              <SfLink href="#">Terms and Conditions</SfLink> and{" "}
              <SfLink href="#">Privacy Policy</SfLink>.
            </div>
          </div>
        </div>
      </div>

      <FooterBasic />
    </div>
  );
}
