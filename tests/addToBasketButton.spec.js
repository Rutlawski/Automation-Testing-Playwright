import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";

test("Verifies id 'Add to Basket' button displays correctly", async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.openHomePage();
    await expect(homepage.addToBasketButton).toHaveText("Add to Basket");
    await homepage.addProductToBasket();
    await expect(homepage.addToBasketButton).toHaveText("Remove from Basket");
})