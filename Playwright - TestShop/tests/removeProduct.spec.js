import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { text } from "../lib/text";

test("Removes a product from cart and validates", async ({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await homePage.openHomePage();
    await homePage.addProductToCart();
    await homePage.clickGoToCartButton();
    await page.reload();
    await cartPage.clickRemoveButton();
    await cartPage.clickUpdateCartButton();
    const emptyCartText = await cartPage.cartEmptyText.innerText();
    await expect(emptyCartText).toBe(text.EmptyCartText);
})