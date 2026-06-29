"use client";
import { useEffect, useMemo, useState } from "react";
import { NavBar } from "@/components/NavBar";
import { loadCart, saveCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function CartPage() {
  const [cart, setCart] = useState<Record<number, number>>(loadCart());
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    fetch(`${apiUrl}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const lineItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const product = products.find((item) => item.id === Number(id));
        if (!product) return null;
        return { product, quantity: qty };
      })
      .filter(Boolean) as { product: Product; quantity: number }[];
  }, [cart, products]);

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) => {
      const quantity = Math.max(0, (prev[productId] || 0) + delta);
      const next = { ...prev };
      if (quantity === 0) {
        delete next[productId];
      } else {
        next[productId] = quantity;
      }
      return next;
    });
  };

  const checkout = async () => {
    const response = await fetch(`${apiUrl}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: lineItems.map((item) => ({ productId: item.product.id, quantity: item.quantity })) }),
    });
    if (response.ok) {
      setCart({});
      saveCart({});
      setStatus("Order created successfully.");
    } else {
      setStatus("Unable to place order.");
    }
  };

  return (
    <main>
      <NavBar />
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="notice">Update quantities and submit an order to the backend.</div>
        <div className="card">
          {lineItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {lineItems.map((item) => (
                <li key={item.product.id} style={{ marginBottom: "1rem" }}>
                  <strong>{item.product.title}</strong>
                  <div>
                    Quantity: {item.quantity} <button className="button secondary" style={{ marginLeft: "0.5rem" }} onClick={() => updateQuantity(item.product.id, -1)}>-</button>
                    <button className="button secondary" style={{ marginLeft: "0.5rem" }} onClick={() => updateQuantity(item.product.id, 1)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button className="button" onClick={checkout} disabled={lineItems.length === 0}>
            Place Order
          </button>
          {status && <p className="notice">{status}</p>}
        </div>
      </div>
    </main>
  );
}
