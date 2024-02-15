import { expect } from "@playwright/test";
import { links } from "../lib/links";
import { paymentDetails } from "../lib/paymentDetails"; 

export class CheckoutPage{
    constructor(page){
        this.page = page;
        this.firstNameInput = page.locator('[id="billing_first_name"]');
        this.lastNameInput = page.locator('[id="billing_last_name"]');
        this.countryDropdown = page.locator('[id="billing_country"]');
        this.streetInput = page.locator('[id="billing_address_1"]');
        this.postCodeInput = page.locator('[id="billing_postcode"]');
        this.cityInput = page.locator('[id="billing_city"]');
        this.phoneInput = page.locator('[id="billing_phone"]');
        this.emailAdressInput = page.locator('[id="billing_email"]');
        this.payRadioButton = page.locator('[id="payment_method_cod"]');
        this.placeOrderButton = page.locator('[id="place_order"]');
        this.errorMessage = page.locator('[class="woocommerce-error"]');
    }
    fillPaymentDetailsOk = async (paymentDetails) => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(paymentDetails.name);
        await this.page.waitForLoadState('networkidle');
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(paymentDetails.surname);
        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption("United Kingdom (UK)");
        await this.streetInput.waitFor();
        await this.streetInput.fill(paymentDetails.street);
        await this.postCodeInput.waitFor();
        await this.postCodeInput.fill(paymentDetails.code);
        await this.cityInput.waitFor();
        await this.cityInput.fill(paymentDetails.city);
        await this.phoneInput.waitFor();
        await this.phoneInput.fill(paymentDetails.phone);
    }
    fillPaymentDetailsEmpty = async () => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill("");
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill("");
        await this.streetInput.waitFor();
        await this.streetInput.fill("");
        await this.postCodeInput.waitFor();
        await this.postCodeInput.fill("");
        await this.cityInput.waitFor();
        await this.cityInput.fill("");
        await this.phoneInput.waitFor();
        await this.phoneInput.fill("");
        await this.emailAdressInput.waitFor();
        await this.emailAdressInput.fill("");
    }
    fillPaymentDetailsIncorrect = async () => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill("1111");
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill("1111");
        await this.streetInput.waitFor();
        await this.streetInput.fill("1111");
        await this.postCodeInput.waitFor();
        await this.postCodeInput.fill("Marek");
        await this.cityInput.waitFor();
        await this.cityInput.fill("1111");
        await this.phoneInput.waitFor();
        await this.phoneInput.fill("Marek");
        await this.emailAdressInput.waitFor();
        await this.emailAdressInput.fill("Marek");
    }
    selectPayRadioButton = async () => {
        await this.payRadioButton.waitFor();
        await this.payRadioButton.click();
    }
    clickPlaceOrderButton = async () => {
        await this.placeOrderButton.waitFor();
        await this.placeOrderButton.click();
    }
}