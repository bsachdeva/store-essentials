import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "@/components/ProductCard";

test("renders product card and calls add handler", async () => {
  const product = { id: 1, title: "Test", description: "Test product", price: 23.5 };
  const add = vi.fn();
  render(<ProductCard product={product} onAdd={add} />);
  expect(screen.getByText("Test product")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /Add to cart/i }));
  expect(add).toHaveBeenCalledTimes(1);
});
