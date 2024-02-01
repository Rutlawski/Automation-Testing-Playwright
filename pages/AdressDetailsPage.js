import { expect } from "@playwright/test";

export class AdressDetailsPage{
    constructor(page){
        this.page = page;
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
        this.streetInput = page.locator('[data-qa="delivery-address-street"]');
        this.postcodeInput = page.locator('[data-qa="delivery-postcode"]');
        this.cityInput = page.locator('[data-qa="delivery-city"]');
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
        this.saveAdressButton = page.locator('[data-qa="save-address-button"]');
        this.continueToPayment = page.locator('[data-qa="continue-to-payment-button"]');
        this.errorMessage = page.locator('[data-qa="error-message"]');
        this.saveAdressFirstName = page.locator('[data-qa="saved-address-firstName"]');
    }
    fillAdressDetailsWithoutName = async (userDetails) => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill("");
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(userDetails.surname);
        await this.streetInput.waitFor();
        await this.streetInput.fill(userDetails.street);
        await this.postcodeInput.fill(userDetails.zipCode);
        await this.cityInput.waitFor();
        await this.cityInput.fill(userDetails.city);
        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption("United States of America");
        await this.continueToPayment.waitFor();
        await this.continueToPayment.click();
    }
    fillAdressDetailsWithNumber = async (userDetails) => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill("123");
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(userDetails.surname);
        await this.streetInput.waitFor();
        await this.streetInput.fill(userDetails.street);
        await this.postcodeInput.fill(userDetails.zipCode);
        await this.cityInput.waitFor();
        await this.cityInput.fill(userDetails.city);
        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption("United States of America");
        await this.continueToPayment.waitFor();
        await this.continueToPayment.click();
    }
    fillAdressDetails = async (userDetails) => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(userDetails.name);
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(userDetails.surname);
        await this.streetInput.waitFor();
        await this.streetInput.fill(userDetails.street);
        await this.postcodeInput.fill(userDetails.zipCode);
        await this.cityInput.waitFor();
        await this.cityInput.fill(userDetails.city);
        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption("United States of America");
        await this.continueToPayment.waitFor();
        await this.continueToPayment.click();
    }
    fillAdressDetailsSave = async (userDetails) => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(userDetails.name);
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(userDetails.surname);
        await this.streetInput.waitFor();
        await this.streetInput.fill(userDetails.street);
        await this.postcodeInput.fill(userDetails.zipCode);
        await this.cityInput.waitFor();
        await this.cityInput.fill(userDetails.city);
        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption("United States of America");
        await this.saveAdressButton.waitFor();
        await this.saveAdressButton.click();
        await this.saveAdressFirstName.waitFor();
        await expect(await this.saveAdressFirstName.innerText()).toBe(await this.firstNameInput.inputValue());
    }
}