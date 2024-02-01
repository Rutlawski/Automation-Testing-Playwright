import test, { expect } from "@playwright/test";
import { v4 as uuid } from "uuid";
import { Homepage } from "../pages/Homepage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { AdressDetailsPage } from "../pages/AdressDetailsPage";
import { userDetails } from "../lib/userDetails";
import { LoginPage } from "../pages/loginPage";

test.skip("Fills in user's adress details and verifies", async ({page}) => {
    const homepage = new Homepage(page);
    const checkoutPage = new CheckoutPage(page);
    const adressDetailsPage = new AdressDetailsPage(page);
    const loginPage = new LoginPage(page);
    const email = uuid() + "@gmail.com";
    const password = uuid();
    await homepage.openHomePage();
    await homepage.addProductToBasket();
    await homepage.clickCheckout();
    await checkoutPage.clickContinueToCheckout();
    await loginPage.register(email, password);
    await adressDetailsPage.fillAdressDetails(userDetails);
    await expect(page).toHaveURL(/\/payment/);
})