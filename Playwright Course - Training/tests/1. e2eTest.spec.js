import test, { expect } from "@playwright/test";
import { v4 as uuid } from "uuid";
import { Homepage } from "../pages/Homepage";
import { CartPage } from "../pages/CartPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DeliveryDetailsPage } from "../pages/DeliveryDetailsPage";
import { userPaymentData } from "../lib/userPaymentData";
import { PaymentPage } from "../pages/PaymentPage";
import { cardDetails } from "../lib/cardDetails";

test("E2E - A full user journey", async ({page}) => {
    const homepage = new Homepage(page);
    const cartPage = new CartPage(page);
    const registerPage = new RegisterPage(page);;
    const deliveryDetailsPage = new DeliveryDetailsPage(page);
    const paymentPage = new PaymentPage(page)
    const email = uuid() + "@gmail.com";
    const password = uuid();
    await homepage.openHomepageAndVerify();
    await homepage.setDropdownAndVerify();
    await homepage.addProductsToCart(0);
    await homepage.addProductsToCart(1);
    await homepage.addProductsToCart(2);
    await homepage.clickOnNavigationTab(2);
    await cartPage.removeCheapestProduct();
    await cartPage.clickOnContinueToCheckoutButton();
    await registerPage.clickOnRegisterButton();
    await registerPage.fillUpCredentialInputs(email, password);
    await registerPage.clickOnSignUpButton();
    await deliveryDetailsPage.fillUserPaymentDetails(userPaymentData);
    await deliveryDetailsPage.clickSaveAdressButtonAndVefify();
    await deliveryDetailsPage.clickContinueToPaymentButton();
    await paymentPage.fillDiscountCodeInInput();
    await paymentPage.clicksOnSubmitDiscountButton();
    await paymentPage.fillCardDetails(cardDetails);
    await paymentPage.clickPayButton();
    await expect(page).toHaveURL(/\/thank-you/);
})