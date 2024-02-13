import { expect } from "@playwright/test";

export class PaymentPage{
    constructor(page){
        this.page = page;
        this.totalPrice = page.locator('[data-qa="total-value"]');
        this.pricewithDiscount = page.locator('[data-qa="total-with-discount-value"]');
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]');
        this.submitDiscountButton = page.locator('[data-qa="submit-discount-button"]');
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]');
        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]');
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]');
        this.validUntilInput = page.locator('[data-qa="valid-until"]');
        this.cvcInput = page.locator('[data-qa="credit-card-cvc"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
    }
    fillDiscountCodeInInput = async () => {
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        await this.discountCodeInput.waitFor();
        await this.discountCodeInput.fill(code);
        await expect(this.discountCodeInput).toHaveValue(code);
    }
    clicksOnSubmitDiscountButton = async () => {
        const priceBefore = await this.totalPrice.innerText();
        await this.submitDiscountButton.waitFor();
        await this.submitDiscountButton.click();
        await this.discountActivatedMessage.waitFor();
        const priceAfter = await this.pricewithDiscount.innerText();
        await expect(priceBefore).not.toBe(priceAfter);
    }
    fillCardDetails = async (cardDetails) => {
        await this.creditCardOwnerInput.waitFor();
        await this.creditCardOwnerInput.fill(cardDetails.owner);
        await this.creditCardNumberInput.waitFor();
        await this.creditCardNumberInput.fill(cardDetails.number);
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