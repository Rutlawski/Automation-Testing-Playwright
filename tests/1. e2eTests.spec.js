const { default: test, expect } = require("@playwright/test");
import { v4 as uuidv4 } from 'uuid';
import { ProductPage } from "../pages/ProductPage";
import { Navigation } from "../pages/navigation";
import { Checkout } from "../pages/Checkout";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { DeliveryDetails } from '../pages/DeliveryDetails';
import { deliveryDetails as userDetails } from '../data/deliveryDetails.js';
import { PaymentPage } from '../pages/PaymentPage';
import { paymentDetails } from '../data/paymentDetails.js';

test.skip("Tests the whole page in a e2e test", async ({ page }) => {
    const productPage = new ProductPage(page);
    const navigation = new Navigation(page);
    const checkout = new Checkout(page);
    const login = new Login(page);
    const register = new Register(page);
    const deliveryDetails = new DeliveryDetails(page);
    const paymentPage = new PaymentPage(page);
    const email = uuidv4() + "@gmail.com";
    const password = uuidv4();
    await productPage.openHomepageAndVerify();
    await productPage.selectDropdownValueAndVerify();
    await productPage.addProducts(0);
    await productPage.addProducts(1);
    await productPage.addProducts(2);
    await navigation.clickOnCheckout();
    await checkout.removeCheapProductandValidate();
    await checkout.continueToCheckout();
    await login.goToRegisterPage();
    await register.createNewUser(email, password);
    await deliveryDetails.fillDeliveryDetails(userDetails);
    await deliveryDetails.saveDeliveryDetails();
    await deliveryDetails.clickContinueToPayment();
    await paymentPage.activateDiscountCode();
    await paymentPage.fillPaymentDetails(paymentDetails);
    await paymentPage.clickPayButton();
})