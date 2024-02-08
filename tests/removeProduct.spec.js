import test, { expect } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";
import { Navigation } from "../pages/navigation";
import { Checkout } from "../pages/Checkout";

test.skip("Adds multiple products to cart and removes one", async ({page}) => {
    const productPage = new ProductPage(page);
    const navigation = new Navigation(page);
    const checkout = new Checkout(page);
    await productPage.openHomepage();
    await productPage.addProducts(0);
    await productPage.addProducts(1);
    await productPage.addProducts(2);
    await navigation.clickOnCheckout();
    await checkout.removeCheapProduct();
    await expect(checkout.cartHeader).toHaveText("2");
})