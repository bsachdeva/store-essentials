"use client";
import Link from "next/link";

export function NavBar() {
  return (
    <nav className="navbar">
      <div>Store Essentials</div>
      <div>
        <Link href="/products">Products</Link>
        <span style={{ margin: "0 1rem" }}>|</span>
        <Link href="/cart">Cart</Link>
      </div>
    </nav>
  );
}
