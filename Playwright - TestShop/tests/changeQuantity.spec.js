import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";

test("Changes product quantity in cart and verifies price", async ({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await homePage.openHomePage();
    await homePage.addProductToCart();
    await homePage.clickGoToCartButton();
    await page.reload();
    const priceBefore = await cartPage.getTotalPrice();
    await cartPage.clickAddButton();
    await cartPage.clickUpdateCartButton();
    await homePage.clickGoToCartButton();
    const priceAfter = await cartPage.getTotalPrice();
    await expect(priceAfter).toBeGreaterThan(priceBefore);
})