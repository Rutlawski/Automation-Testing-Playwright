import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { CheckoutPage } from "../pages/CheckoutPage";

test.skip("Removes product from Basket and verifies Basket count", async ({page}) => {
    const homepage = new Homepage(page);
    const checkoutPage = new CheckoutPage(page);
    await homepage.openHomePage();
    await homepage.addProductToBasket();
    await homepage.clickCheckout();
    await checkoutPage.removeProduct();
    await expect(await checkoutPage.basketHeader).toHaveText("0");
})