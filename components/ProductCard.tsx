"use client";
import type { Product } from "@/types";

export function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <article className="card">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <button className="button" onClick={onAdd}>
        Add to cart
      </button>
    </article>
  );
}
