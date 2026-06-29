"use client";
import type { Product } from "@/types";
import { useMemo, useState } from "react";

export function CartSummary({ cart, products }: { cart: Record<number, number>; products: Product[] }) {
  const [message, setMessage] = useState("");
  const lineItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const product = products.find((item) => item.id === Number(id));
        if (!product || qty === 0) return null;
        return { product, quantity: qty };
      })
      .filter(Boolean) as { product: Product; quantity: number }[];
  }, [cart, products]);

  const total = lineItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const checkout = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const response = await fetch(`${apiUrl}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: lineItems.map((item) => ({ productId: item.product.id, quantity: item.quantity })) }),
    });
    if (response.ok) {
      setMessage("Order received. Thank you!");
    } else {
      setMessage("Failed to submit order.");
    }
  };

  return (
    <div>
      <h2>Cart Summary</h2>
      {lineItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {lineItems.map((item) => (
              <li key={item.product.id}>
                {item.quantity} × {item.product.title} = ${ (item.product.price * item.quantity).toFixed(2) }
              </li>
            ))}
          </ul>
          <p>Total: ${total.toFixed(2)}</p>
          <button className="button" onClick={checkout}>
            Checkout
          </button>
        </>
      )}
      {message && <p className="notice">{message}</p>}
    </div>
  );
}
