import { expect } from "@playwright/test";

export class PaymentPage{
    constructor(page){
        this.page = page;
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
        this.codeInput = page.locator('[data-qa="discount-code-input"]');
        this.submitDiscountButton = page.locator('[data-qa="submit-discount-button"]');
        this.discountMessage = page.getByText('Discount activated!');
        this.priceBeforeDiscount = page.locator('[data-qa="total-value"]');
        this.priceAfterDiscount = page.locator('[data-qa="total-with-discount-value"]');
        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]');
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]');
        this.validUntilInput = page.locator('[data-qa="valid-until"]');
        this.creditCardCvcInput = page.locator('[data-qa="credit-card-cvc"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
    }
    getPriceValueBefore = async () => {
        await this.priceBeforeDiscount.waitFor();
        const priceBeforeDiscountText = await this.priceBeforeDiscount.innerText();
        return (parseInt(priceBeforeDiscountText, 10));
    }
    getPriceValueAfter = async () => {
        await this.priceAfterDiscount.waitFor();
        const priceAfterDiscountText = await this.priceAfterDiscount.innerText();
        return (parseInt(priceAfterDiscountText, 10));
    }
    activateDiscountCode = async () => {
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        await this.codeInput.waitFor();
        await this.codeInput.fill(code);
        await expect(this.codeInput).toHaveValue(code);
        // await this.codeInput.focus();
        // await this.page.keyboard.type(code, {delay: 1000});
        await expect(this.discountMessage).not.toBeVisible();
        await this.submitDiscountButton.waitFor();
        await this.submitDiscountButton.click();
        await this.discountMessage.waitFor();
        const finalPriceBefore = await this.getPriceValueBefore();
        const finalPriceAfter = await this.getPriceValueAfter();
        await expect(finalPriceBefore).toBeGreaterThan(finalPriceAfter)
    }
    fillPaymentDetails = async (paymentDetails) => {
        await this.creditCardOwnerInput.waitFor();
        await this.creditCardOwnerInput.fill(paymentDetails.creditCardOwner);
        await this.creditCardNumberInput.waitFor();
        await this.creditCardNumberInput.fill(paymentDetails.creditCardNumber);
        await this.validUntilInput.waitFor();
        await this.validUntilInput.fill(paymentDetails.validUntil);
        await this.creditCardCvcInput.waitFor();
        await this.creditCardCvcInput.fill(paymentDetails.creditCardCvc);
    }
    clickPayButton = async () => {
        await this.payButton.waitFor();
        await this.payButton.click();
        await expect(this.page).toHaveURL(/\/thank-you/, { timeout: 3000 });
    }
}