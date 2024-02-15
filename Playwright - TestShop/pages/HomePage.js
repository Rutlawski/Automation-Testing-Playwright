import { expect } from "@playwright/test";
import { titles } from "../lib/titles.js"

export class HomePage{
    constructor(page){
        this.page = page;
        this.searchInput = page.locator('[id="search-field-top-bar"]');
        this.searchSubmitButton = page.locator('[id="search-top-bar-submit"]');
        this.cartHeader = page.locator('[class="top-cart"]');
        this.addToCartButton = page.locator('//a[contains(text(), " Add to cart")]').first();
        this.genericShopButton = page.locator('//a[contains(text(), "Generic Shop")]');
        this.myAccountButton = page.locator('[class="top-account"]');
    }
    openHomePage = async () => {
        await this.page.goto('/');
    }
    openHomePageAndVerify = async () => {
        await this.page.goto('/');
        await expect(this.page).toHaveURL('/');
        await expect(this.page).toHaveTitle(titles.HomePageTitle);
    }
    fillSearchInputCloth = async () => {
        await this.searchInput.waitFor();
        await this.searchInput.fill("cloth");
        await this.searchSubmitButton.waitFor();
        await this.searchSubmitButton.click();
    }
    fillSearchInputTop = async () => {
        await this.searchInput.waitFor();
        await this.searchInput.fill("top");
        await this.searchSubmitButton.waitFor();
        await this.searchSubmitButton.click();
    }
    getCartHeaderNumber = async () => {
        await this.cartHeader.waitFor();
        const cartHeaderText = await this.cartHeader.innerText();
        const withoutText = cartHeaderText.replace("My Cart - zł ", "");
        return parseInt(withoutText, 10);
    }
    addProductToCart = async () => {
        await this.addToCartButton.first().waitFor();
        await this.addToCartButton.first().click();
    }
    clickGoToCartButton = async () => {
        await this.cartHeader.waitFor();
        await this.cartHeader.click();
    }
    clickGenericShop = async () => {
        await this.genericShopButton.waitFor();
        await this.genericShopButton.click();
    }
    clickMyAccountButton = async () => {
        await this.myAccountButton.waitFor();
        await this.myAccountButton.click();
        await expect(this.page).toHaveURL(/\my-account/);
    }
    addProductToCartAndVerifyHeader = async () => {
        const cartHeaderBefore = await this.getCartHeaderNumber();
        await this.addToCartButton.first().waitFor();
        await this.addToCartButton.first().click();
        await this.cartHeader.waitFor();
        await this.cartHeader.click();
        const cartHeaderAfter = await this.getCartHeaderNumber();
        await expect(cartHeaderAfter).not.toBe(cartHeaderBefore + 1);
    }
}