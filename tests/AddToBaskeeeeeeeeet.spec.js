const { default: test, expect } = require("@playwright/test");

test.skip("Opens URL and adds a product to cart", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Art Shopping Store");
    const checkoutButton = page.locator('[data-qa="header-basket-count"]');
    const AddToCartButton = page.locator('[data-qa = "product-button"]').first();
    await checkoutButton.waitFor();
    await AddToCartButton.waitFor();
    await expect(await checkoutButton).toHaveText("0");
    await expect(await AddToCartButton).toHaveText("Add to Basket");
    await AddToCartButton.click();
    await AddToCartButton.waitFor();
    await checkoutButton.waitFor();
    await expect(await AddToCartButton).toHaveText("Remove from Basket");
    await expect(await checkoutButton).toHaveText("1");
    const checkoutLink = page.getByRole('link', { name: 'Checkout' });
    await checkoutLink.waitFor();
    await checkoutLink.click();
    await page.waitForURL("/basket");
    await page.pause();
})