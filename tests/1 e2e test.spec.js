import test, { expect } from "@playwright/test";
import { v4 as uuid } from "uuid";
import { Homepage } from "../pages/Homepage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { LoginPage } from "../pages/loginPage";
import { AdressDetailsPage } from "../pages/AdressDetailsPage";
import { userDetails } from "../lib/userDetails.js";
import { PaymentPage } from "../pages/PaymentPage.js";
import { cardDetails } from "../lib/cardDeatils.js";
 
test.skip("E2E - a full user journey", async ({page}) => {
    const homepage = new Homepage(page);
    const checkoutPage = new CheckoutPage(page);
    const loginPage = new LoginPage(page);
    const adressDetailsPage = new AdressDetailsPage(page);
    const paymentPage = new PaymentPage(page);
    const email = uuid() + "@gmail.com";
    const password = uuid();
    await homepage.openHomePageandVerify();
    await homepage.testDropdownValue();
    await homepage.addProductsToBasket(0);
    await homepage.addProductsToBasket(1);
    await homepage.addProductsToBasket(2);
    await homepage.clickCheckout();
    await checkoutPage.removeCheapestProduct();
    await checkoutPage.clickContinueToCheckout();
    await loginPage.register(email, password);
    await adressDetailsPage.fillAdressDetails(userDetails);
    await paymentPage.submitDiscount();
    await paymentPage.fillCardDetails(cardDetails);
    await paymentPage.clickPayButton();
    await expect(page).toHaveURL(/\/thank-you/);
})