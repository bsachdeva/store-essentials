import { test, expect } from "@playwright/test";

test("should browse products and add to cart", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Store Essentials/);
  await page.getByRole("link", { name: /Products/i }).click();
  await page.getByRole("heading", { name: /Product Catalog/i }).toBeVisible();
  await page.getByRole("button", { name: /Add to cart/i }).first().click();
  await expect(page.getByText(/Cart items:/)).toContainText("1");
});
