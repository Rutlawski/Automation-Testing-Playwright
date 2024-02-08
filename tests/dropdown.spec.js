import test, { expect } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";

test.skip("Verifies if dropdown works", async ({page}) => {
    const productPage = new ProductPage(page);
    await productPage.openHomepage();
    await productPage.selectDropdownValue();
    await productPage.selectSecondDropdownValue();
})