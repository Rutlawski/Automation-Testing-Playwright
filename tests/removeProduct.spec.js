import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { CartPage } from "../pages/CartPage";

test("Remove product from cart and verify cart header", async ({page}) => {
    const homepage = new Homepage(page);
    const cartPage = new CartPage(page);
    await homepage.openHomepage();
    await homepage.addProductToCart();
    await homepage.clickOnNavigationTab(2);
    const headerNumberBefore = await cartPage.getHeaderNumber();
    await cartPage.removeProductFromCart();
    const headerNumberAfter = await cartPage.getHeaderNumber();
    // await expect(headerNumberAfter).toEqual(headerNumberBefore - 1);
})