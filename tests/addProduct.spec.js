import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";

test("Adds a product to cart and verifies cart header", async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.openHomepage();
    await homepage.addProductToCart();
    await expect(homepage.cartHeader).toHaveText('1');
})