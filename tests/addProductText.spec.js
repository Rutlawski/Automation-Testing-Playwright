import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";

test("Adds a product to cart and verifies text on button", async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.openHomepage();
    await expect(homepage.addToCartButton).toHaveText("Add to Basket");
    await homepage.addProductToCart();
    await expect(homepage.addToCartButton).toHaveText("Remove from Basket");
})