const { default: test, expect } = require("@playwright/test");
import { ProductPage } from "../pages/ProductPage";

test.skip("Adds a product to Cart and verifies text on a button", async ({page}) => {
    const productPage = new ProductPage(page);
    await productPage.openHomepage();
    await productPage.addProduct();
    await expect(productPage.addButton).toHaveText("Remove from Basket");
})