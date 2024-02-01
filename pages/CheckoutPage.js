import { expect } from "@playwright/test";

export class CheckoutPage{
    constructor(page){
        this.page = page;
        this.removeButton = page.locator('[data-qa="basket-card-remove-item"]');
        this.productPrices = page.locator('[data-qa="basket-item-price"]');
        this.basketHeader = page.locator('[data-qa="header-basket-count"]');
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');
        this.productCard = page.locator('[data-qa="basket-card"]');
    }
    getBasketCount = async () => {
        await this.basketHeader.waitFor();
        const basketHeaderText = await this.basketHeader.innerText();
        return parseInt(basketHeaderText, 10);
    }
    removeProduct = async () => {
        await this.removeButton.waitFor();
        await this.removeButton.click();
    }
    clickContinueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor();
        await this.continueToCheckoutButton.click();
        await expect(this.page).toHaveURL(/\/delivery-details/);
    }
    removeCheapestProduct = async () => {
        await this.productCard.first().waitFor();
        const productCardsBefore = await this.productCard.count();
        await this.productPrices.first().waitFor();
        const allPricesText = await this.productPrices.allInnerTexts();
        const allPricesNumber = allPricesText.map((element) => {
            const withoutDollar = element.replace("$", "");
            return parseInt(withoutDollar, 10);
        })
        const smallestPrice = Math.min(...allPricesNumber);
        const smallestPriceIndex = allPricesNumber.indexOf(smallestPrice);
        const specificRemoveButton = this.removeButton.nth(smallestPriceIndex);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();
        await expect(this.productCard).toHaveCount(productCardsBefore - 1);
    }






    //     removeCheapProduct = async () => {
    //     await this.productCard.first().waitFor();
    //     await this.productPrice.first().waitFor();
    //     const allPricesText = await this.productPrice.allInnerTexts();
    //     const allPricesNumber = allPricesText.map((element) => {
    //         const withoutDollar = element.replace("$", "");
    //         return parseInt(withoutDollar, 10)});
    //     const smallestPrice = Math.min(...allPricesNumber);
    //     const smallestPriceIndex = allPricesNumber.indexOf(smallestPrice);
    //     const specificRemoveButton = this.removeButton.nth(smallestPriceIndex);
    //     await specificRemoveButton.waitFor();
    //     await specificRemoveButton.click();
    // }
}