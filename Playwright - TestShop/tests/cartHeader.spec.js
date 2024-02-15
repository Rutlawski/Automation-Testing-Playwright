import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { timeout } from "../playwright.config";

test("Adds a product to cart and verifies cart header", async ({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await homePage.openHomePage();
    const priceBeforeProduct = await homePage.getCartHeaderNumber();
    await homePage.addProductToCart();
    await homePage.clickGenericShop();
    await page.reload();
    const priceAfterProduct = await cartPage.getCartHeaderNumber();
    await expect(priceAfterProduct).toBeGreaterThan(priceBeforeProduct);
})