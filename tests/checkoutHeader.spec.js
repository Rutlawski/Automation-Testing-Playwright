import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";

test.skip("Verifies if checkout header correctly displays value", async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.openHomePage();
    const valueBeforeProduct = await homepage.getBasketCount();
    await homepage.addProductToBasket();
    const valueAfterProduct = await homepage.getBasketCount();
    await expect(valueAfterProduct).not.toEqual(valueBeforeProduct);
})