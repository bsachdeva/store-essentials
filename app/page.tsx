import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <div>Store Essentials</div>
        <div>
          <Link href="/products">Products</Link>
          <span style={{ margin: "0 1rem" }}>|</span>
          <Link href="/cart">Cart</Link>
        </div>
      </nav>
      <div className="container">
        <section className="hero">
          <h1>Clean MERN Storefront</h1>
          <p>
            A portfolio application that reuses React component patterns, integrates an Express + MongoDB backend, and includes full-stack functionality with routing, cart state, and order capture.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/products" className="button">
              Browse Products
            </Link>
            <Link href="/cart" className="button secondary">
              View Cart
            </Link>
          </div>
        </section>
        <section className="grid" style={{ marginTop: "2rem" }}>
          <div className="card">
            <h2>Product discovery</h2>
            <p>Fetch product data from a Node/Express API and display a responsive catalog with add-to-cart interactions.</p>
          </div>
          <div className="card">
            <h2>Cart management</h2>
            <p>Keep a client-side cart for buyers and place orders using a server-side endpoint with MongoDB persistence.</p>
          </div>
          <div className="card">
            <h2>Tested delivery</h2>
            <p>Built with Vitest and React Testing Library for component verification and Playwright for real world workflows.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
