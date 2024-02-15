import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";

test("Adds a product to cart and verifies product on cart page", async ({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await homePage.openHomePage();
    await homePage.addProductToCart();
    await homePage.clickGoToCartButton();
    await page.reload();
    await expect(cartPage.productInCart).toHaveCount(1);
})