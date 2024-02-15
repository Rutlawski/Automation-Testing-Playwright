import test, { expect } from "@playwright/test";
import { v4 as uuid } from "uuid";
import { HomePage } from "../pages/HomePage";
import { SearchResultPage } from "../pages/SearchResultPage"; 
import { CheckoutPage } from "../pages/CheckoutPage";
import { CartPage } from "../pages/CartPage";
import { RegisterPage } from "../pages/RegisterPage.js"
import { paymentDetails } from "../lib/paymentDetails.js";

test("E2E Test - A full user journey", async ({page}) => {
    const email = uuid() + "@gmail.com";
    const password = uuid();
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page);
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);
    const registerPage = new RegisterPage(page);
    await homePage.openHomePageAndVerify();
    await homePage.clickMyAccountButton();
    await registerPage.fillRegisterCredentails(email, password);
    await page.waitForLoadState('networkidle');
    await registerPage.clickRegisterButton();
    await registerPage.clickRegisterButton();
    await registerPage.clickGenericShopButton();
    await homePage.fillSearchInputTop();
    await searchResultPage.clickBlackTopHeader();
    await searchResultPage.clickGenericShopButton();
    await homePage.addProductToCartAndVerifyHeader();
    await cartPage.clickAddButton();
    await cartPage.clickProceedToCheckoutButton();
    await checkoutPage.fillPaymentDetailsOk(paymentDetails);
    await checkoutPage.selectPayRadioButton();
    await checkoutPage.clickPlaceOrderButton();
    await expect(page).toHaveURL(/\/order-received/);
})