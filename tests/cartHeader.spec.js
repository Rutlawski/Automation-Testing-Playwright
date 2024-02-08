const { default: test, expect } = require("@playwright/test");
import { ProductPage } from "../pages/ProductPage";

test.skip("Verifies if number on Cart Header display correctly", async ({page}) => {
    const productPage = new ProductPage(page);
    await productPage.openHomepage();
    await expect(productPage.cartHeader).toHaveText("0");
    await productPage.addProduct();
    await expect(productPage.cartHeader).toHaveText("1");
})