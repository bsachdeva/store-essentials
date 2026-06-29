"use client";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { NavBar } from "@/components/NavBar";
import { CartSummary } from "@/components/CartSummary";
import { loadCart, saveCart } from "@/lib/cart";
import type { Product } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Storefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Record<number, number>>(loadCart());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch(() => setError("Unable to load products."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const itemCount = useMemo(() => Object.values(cart).reduce((sum, qty) => sum + qty, 0), [cart]);

  const addToCart = (productId: number) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  return (
    <main>
      <NavBar />
      <div className="container">
        <h1>Product Catalog</h1>
        <div className="notice">Cart items: {itemCount}. Products are served from the backend API.</div>
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={() => addToCart(product.id)} />
          ))}
        </div>
        <section className="card" style={{ marginTop: "2rem" }}>
          <CartSummary cart={cart} products={products} />
        </section>
      </div>
    </main>
  );
}
