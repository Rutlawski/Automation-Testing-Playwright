import test from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";
import { Checkout } from "../pages/Checkout";
import { Navigation } from "../pages/navigation";
import { DeliveryDetails } from "../pages/DeliveryDetails";
import { Register } from "../pages/Register";
import { v4 as uuidv4 } from 'uuid';


test.skip("Saves user adress and verifies", async ({page}) => {
    const productPage = new ProductPage(page);
    const navigation = new Navigation(page);
    const checkout = new Checkout(page);
    const register = new Register(page);
    const deliveryDetails = new DeliveryDetails(page);
    const email = uuidv4() + "@gmail.com";
    const password = uuidv4();
    await productPage.openHomepage();
    await navigation.clickOnCheckout();
    await checkout.continueToCheckout();
    await register.createNewUser(email, password);
    await register.createNewUser(email, password);
    await deliveryDetails.getErrorMessage();
    await page.pause();
})