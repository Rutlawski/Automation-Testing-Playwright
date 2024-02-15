import test, { expect } from "@playwright/test";
import { v4 as uuid } from "uuid";
import { Homepage } from "../pages/Homepage";
import { CartPage } from "../pages/CartPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DeliveryDetailsPage } from "../pages/DeliveryDetailsPage";
import { userPaymentData } from "../lib/userPaymentData";

test("Adds a product, fills payment data and saves it", async ({page}) => {
    const homepage = new Homepage(page);
    const cartPage = new CartPage(page);
    const registerPage = new RegisterPage(page);
    const deliveryDetailsPage = new DeliveryDetailsPage(page);
    const email = uuid() + "@gmail.com";
    const password = uuid();
    await homepage.openHomepage();
    await homepage.addProductToCart();
    await homepage.clickOnNavigationTab(2);
    await cartPage.clickOnContinueToCheckoutButton();
    await registerPage.clickOnRegisterButton();
    await registerPage.fillUpCredentialInputs(email, password);
    await registerPage.clickOnSignUpButton();
    await deliveryDetailsPage.fillUserPaymentDetails(userPaymentData);
    await deliveryDetailsPage.clickSaveAdressButtonAndVefify();
    
})