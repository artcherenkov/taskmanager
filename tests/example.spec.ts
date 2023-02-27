import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const p = await page.getByText(/save to reload/i);

  await expect(p).toBeVisible();
});
