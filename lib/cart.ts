export const CART_KEY = "store-essentials-cart";

export function loadCart(): Record<number, number> {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function saveCart(cart: Record<number, number>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
