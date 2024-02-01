import { expect } from "@playwright/test";
import { cardDetails } from "../lib/cardDeatils";

export class PaymentPage{
    constructor(page){
        this.page = page;
        this.priceBefore = page.locator('[data-qa="total-value"]');
        this.priceAfter = page.locator('[data-qa="total-with-discount-value"]');
        this.submitDiscountButton = page.locator('[data-qa="submit-discount-button"]');
        this.discountInput = page.locator('[data-qa="discount-code-input"]');
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
        this.cardOwnerInput = page.locator('[data-qa="credit-card-owner"]');
        this.cardNumberInput = page.locator('[data-qa="credit-card-number"]');
        this.validUntilInput = page.locator('[data-qa="valid-until"]');
        this.cvcInput = page.locator('[data-qa="credit-card-cvc"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
    }
    getPriceBefore = async () => {
        const priceBeforeText = await this.priceBefore.innerText();
        return parseInt(priceBeforeText, 10);
    }
    getPriceAfter = async () => {
        const priceAfterText = await this.priceAfter.innerText();
        return parseInt(priceAfterText, 10);
    }
    submitDiscount = async () => {
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        await this.discountInput.waitFor();
        await this.discountInput.fill(code);
        await expect(this.getPriceAfter).not.toEqual(this.getPriceBefore);
    }
    fillCardDetails = async () => {
        await this.cardOwnerInput.waitFor();
        await this.cardOwnerInput.fill(cardDetails.owner);
        await this.cardNumberInput.waitFor();
        await this.cardNumberInput.fill(cardDetails.number);
        await this.validUntilInput.waitFor();
        await this.validUntilInput.fill(cardDetails.validUntil);
        await this.cvcInput.waitFor();
        await this.cvcInput.fill(cardDetails.cvc);
    }
    clickPayButton = async () => {
        await this.payButton.waitFor();
        await this.payButton.click();
    }
}