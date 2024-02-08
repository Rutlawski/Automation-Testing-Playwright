import { expect } from "@playwright/test";

export class Checkout {
    constructor(page){
        this.page = page;
        this.productCard = page.locator('[data-qa="basket-card"]');
        this.productPrice = page.locator('[data-qa="basket-item-price"]');
        this.removeButton = page.locator('[data-qa="basket-card-remove-item"]');
        this.cartHeader = page.locator('[data-qa="header-basket-count"]');
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');

    }
    getCartHeader = async () => {
        await this.cartHeader.waitFor();
        const textOfHeader = await this.cartHeader.innerText();
        return parseInt(textOfHeader, 10);
    }
    removeCheapProduct = async () => {
        await this.productCard.first().waitFor();
        await this.productPrice.first().waitFor();
        const allPricesText = await this.productPrice.allInnerTexts();
        const allPricesNumber = allPricesText.map((element) => {
            const withoutDollar = element.replace("$", "");
            return parseInt(withoutDollar, 10)});
        const smallestPrice = Math.min(...allPricesNumber);
        const smallestPriceIndex = allPricesNumber.indexOf(smallestPrice);
        const specificRemoveButton = this.removeButton.nth(smallestPriceIndex);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();
    }
    removeCheapProductandValidate = async () => {
        await this.productCard.first().waitFor();
        const productsBefore = await this.productCard.count();
        await this.productPrice.first().waitFor();
        const allPricesText = await this.productPrice.allInnerTexts();
        const allPricesNumber = allPricesText.map((element) => {
            const withoutDollar = element.replace("$", "");
            return parseInt(withoutDollar, 10)});
        const smallestPrice = Math.min(...allPricesNumber);
        const smallestPriceIndex = allPricesNumber.indexOf(smallestPrice);
        const specificRemoveButton = this.removeButton.nth(smallestPriceIndex);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();
        await expect(this.productCard).toHaveCount(productsBefore - 1);
    }
    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor();
        await this.continueToCheckoutButton.click();
        await this.page.waitForURL(/\/login/);
    }
}