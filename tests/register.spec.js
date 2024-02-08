import test from "@playwright/test";
import { v4 as uuidv4 } from 'uuid';
import { ProductPage } from "../pages/ProductPage";
import { Register } from "../pages/Register";

test.skip("Opens register page and fills in", async ({page}) => {
    const productPage = new ProductPage(page);
    const register = new Register(page);
    const email = uuidv4() + "@gmail.com";
    const password = uuidv4();
    await productPage.openHomepage();
    await productPage.clickMyAccountButton();
    await register.createNewUser(email, password);
})