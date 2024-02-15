import test, { expect } from "@playwright/test";
import { CheckoutPage } from "../pages/CheckoutPage";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { text } from "../lib/text";

test("Fills in empty payment details and verifies error", async ({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await homePage.openHomePage();
    await homePage.addProductToCart();
    await homePage.clickGoToCartButton();
    await page.reload();
    await cartPage.clickProceedToCheckoutButton();
    await checkoutPage.fillPaymentDetailsEmpty();
    await checkoutPage.clickPlaceOrderButton();
    await expect(await checkoutPage.errorMessage.innerText()).toContain(text.ErrorMessageEmpty);
})