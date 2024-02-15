import { expect } from "@playwright/test";
import { userPaymentData } from "../lib/userPaymentData";
import { use } from "../playwright.config";

export class DeliveryDetailsPage{
    constructor(page){
        this.page = page;
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
        this.streetInput = page.locator('[data-qa="delivery-address-street"]');
        this.postCodeInput = page.locator('[data-qa="delivery-postcode"]');
        this.cityInput = page.locator('[data-qa="delivery-city"]');
        this.countryDropdownElement = page.locator('[data-qa="country-dropdown"]');
        this.SaveAdressButton = page.locator('[data-qa="save-address-button"]');
        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]');
        this.errorMessage = page.locator('[data-qa="error-message"]')
        this.saveAdressContainer = page.locator('[data-qa="saved-address-container"]');
        }
    fillUserPaymentDetails = async (userPaymentData) => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(userPaymentData.firstName);
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(userPaymentData.lastName);
        await this.streetInput.waitFor();
        await this.streetInput.fill(userPaymentData.street);
        await this.postCodeInput.waitFor();
        await this.postCodeInput.fill(userPaymentData.postCode);
        await this.cityInput.waitFor();
        await this.cityInput.fill(userPaymentData.city);
        await this.countryDropdownElement.waitFor();
        await this.countryDropdownElement.selectOption("United States of America");
    }
    fillUserPaymentDetailsIncorrect = async () => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill("11111111");
    }
    clickContinueToPaymentButton = async () => {
        await this.continueToPaymentButton.waitFor();
        await this.continueToPaymentButton.click();
    }
    clickSaveAdressButtonAndVefify = async () => {
        await this.SaveAdressButton.waitFor();
        await this.SaveAdressButton.click();
        await this.saveAdressContainer.waitFor();
        await expect(this.saveAdressContainer).toHaveCount(1);
    }
    }