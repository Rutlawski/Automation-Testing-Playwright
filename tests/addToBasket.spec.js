import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";

test.skip("Adds a product to Basket and verifies basket count", async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.openHomePage();
    await homepage.addProductToBasket();
    await homepage.getBasketCount();
    await expect(await homepage.basketHeader).toHaveText("1");
})