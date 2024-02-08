import { expect } from "@playwright/test";

export class DeliveryDetails{
    constructor(page){
        this.page = page;
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
        this.streetInput = page.locator('[data-qa="delivery-address-street"]');
        this.postCodeInput = page.locator('[data-qa="delivery-postcode"]');
        this.cityInput = page.locator('[data-qa="delivery-city"]');
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]');
        this.saveAdressButton = page.locator('[data-qa="save-address-button"]');
        this.savedAdressContainer = page.locator('[data-qa="saved-address-container"]');
        this.errorMessage = page.locator('[data-qa="error-message"]');
        this.savedAdressFirstName = page.locator('[data-qa="saved-address-firstName"]');
        this.savedAdressLastName = page.locator('[data-qa="saved-address-lastName"]');
        this.savedAdressStreet = page.locator('[data-qa="saved-address-street"]');
        this.savedAdresspostCode = page.locator('[data-qa="saved-address-postcode"]');
        this.savedAdresscity = page.locator('[data-qa="saved-address-city"]');
    }
    fillDeliveryDetails = async (deliveryDetails) => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(deliveryDetails.firstName);
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(deliveryDetails.lastName);
        await this.streetInput.waitFor();
        await this.streetInput.fill(deliveryDetails.street);
        await this.postCodeInput.waitFor();
        await this.postCodeInput.fill(deliveryDetails.postCode);
        await this.cityInput.waitFor();
        await this.cityInput.fill(deliveryDetails.city);
        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption("United States of America");
        await this.continueToPaymentButton.waitFor();
        // await this.continueToPaymentButton.click();
    }
    saveDeliveryDetails = async () => {
        const saveAdressContainerBefore = await this.savedAdressContainer.count();
        await this.saveAdressButton.waitFor();
        await this.saveAdressButton.click();
        await this.savedAdressContainer.waitFor();
        await expect(this.savedAdressContainer).toHaveCount(saveAdressContainerBefore + 1);
        await this.savedAdressFirstName.waitFor();
        await expect(await this.savedAdressFirstName.innerText()).toBe(await this.firstNameInput.inputValue());
        await this.savedAdressLastName.waitFor();
        await expect(await this.savedAdressLastName.innerText()).toBe(await this.lastNameInput.inputValue());
        await this.savedAdressStreet.waitFor();
        await expect(await this.savedAdressStreet.innerText()).toBe(await this.streetInput.inputValue());
        await this.savedAdresspostCode.waitFor();
        await expect(await this.savedAdresspostCode.innerText()).toBe(await this.postCodeInput.inputValue());
        await this.savedAdresscity.waitFor();
        await expect(await this.savedAdresscity.innerText()).toBe(await this.cityInput.inputValue());
    }
    getErrorMessage = async () => {
        await this.saveAdressButton.waitFor();
        await this.saveAdressButton.click();
        await this.errorMessage.waitFor();
        await expect(this.errorMessage).toHaveText("You need to supply a firstName field");
    }
    clickContinueToPayment = async () => {
        await this.continueToPaymentButton.waitFor();
        await this.continueToPaymentButton.click();
        await this.page.waitForURL(/\/payment/, { timeout: 3000 });
    }
}