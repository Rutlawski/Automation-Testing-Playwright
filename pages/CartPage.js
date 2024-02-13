import { expect } from "@playwright/test";

export class CartPage{
    constructor(page){
        this.page = page;
        this.cartHeader = page.locator('[data-qa="header-basket-count"]');
        this.removeProductButton = page.locator('[data-qa="basket-card-remove-item"]');
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');
        this.productCard = page.locator('[data-qa="basket-card"]');
        this.productPrice = page.locator('[data-qa="basket-item-price"]');

    }
    removeProductFromCart = async () => {
        await this.removeProductButton.waitFor();
        await this.removeProductButton.click();
    }
    removeCheapestProduct = async () => {
        await this.productCard.first().waitFor();
        await this.productPrice.first().waitFor();
        const cartCountBefore = await this.productCard.count();
        const allPricesText = await this.productPrice.allInnerTexts();
        const allPricesNumber = allPricesText.map((element) => {
            const withoutDollar = element.replace("$", "");
            return parseInt(withoutDollar, 10);
        })
        const smallestPrice = Math.min(...allPricesNumber);
        const smallestPriceIndex = allPricesNumber.indexOf(smallestPrice);
        const specificRemoveButton = await this.removeProductButton.nth(smallestPriceIndex);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();
        await expect(this.productCard).toHaveCount(cartCountBefore - 1);
    }
    getHeaderNumber = async () => {
        await this.cartHeader.waitFor();
        const cartHeaderText = await this.cartHeader.innerText();
        return await parseInt(cartHeaderText, 10);
    }
    clickOnContinueToCheckoutButton = async () => {
        await this.continueToCheckoutButton.waitFor();
        await this.continueToCheckoutButton.click();
    }
}