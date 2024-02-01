import { expect } from "@playwright/test";

export class Homepage{
    constructor(page){
        this.page = page;
        this.addToBasketButton = page.locator('[data-qa="product-button"]').first();
        this.addToBasketButtons = page.locator('[data-qa="product-button"]')
        this.basketHeader = page.locator('[data-qa="header-basket-count"]');
        this.dropdownElement = page.locator('[data-qa="sort-dropdown"]');
        this.productTitle = page.locator('[data-qa="product-title"]').first();
        this.checkoutButton = page.getByRole('link', { name: 'Checkout' });
    }
    openHomePage = async () => {
        await this.page.goto("http://localhost:2221/");
    }
    openHomePageandVerify = async () => {
        await this.page.goto("http://localhost:2221/");
        await expect(this.page).toHaveTitle("Art Shopping Store");
    }
    getproductTitle = async () => {
        await this.productTitle.waitFor();
        return this.productTitle.innerText();
    }
    setsDropdownValueAsc = async () => {
        await this.dropdownElement.waitFor();
        await this.dropdownElement.selectOption("Price ascending");
        await expect(await this.dropdownElement).toHaveValue("price-asc");
    }
    setsDefaultDropdownValue = async () => {
        await this.dropdownElement.waitFor();
        await this.dropdownElement.selectOption("Popularity (default)");
        await expect(await this.dropdownElement).toHaveValue("default");
    }
    testDropdownValue = async () => {
        await this.dropdownElement.waitFor();
        await this.dropdownElement.selectOption("Price ascending");
        await expect(await this.dropdownElement).toHaveValue("price-asc");
        await expect(this.productTitle).toHaveText("Baby Zebra with butterfly");
        await this.dropdownElement.waitFor();
        await this.dropdownElement.selectOption("Popularity (default)");
        await expect(await this.dropdownElement).toHaveValue("default");
        await expect(await this.productTitle).toHaveText("Astronaut dabbing");
    }
    getBasketCount = async () => {
        await this.basketHeader.waitFor();
        const basketHeaderText = await this.basketHeader.innerText();
        return parseInt(basketHeaderText, 10);
    }
    addProductToBasket = async () => {
        await this.addToBasketButton.waitFor();
        await this.addToBasketButton.click();
    }
    addProductsToBasket = async (number) => {
        const specificAddButton = await this.addToBasketButtons.nth(number);
        await this.basketHeader.waitFor();
        const basketHeaderBefore = await this.getBasketCount();
        await specificAddButton.waitFor();
        await specificAddButton.click();
        const basketHeaderAfter = await this.getBasketCount();
        await expect(basketHeaderAfter).toBeGreaterThan(basketHeaderBefore);
    }
    clickCheckout = async () => {
        await this.checkoutButton.waitFor();
        await this.checkoutButton.click();
        await expect(this.page).toHaveURL(/\/basket/);
    }
}