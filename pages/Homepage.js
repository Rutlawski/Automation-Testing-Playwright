import { expect } from "@playwright/test";
import { titles } from "../lib/titles";

export class Homepage{
    constructor(page){
        this.page = page;
        this.navigationTabs = page.locator('[data-qa="desktop-nav-link"]');
        this.productCard = page.locator('[data-qa="product-card"]').first();
        this.productCards = page.locator('[data-qa="product-card"]');
        this.productCardTitle = page.locator('[data-qa="product-title"]').first();
        this.addToCartButton = page.locator('[data-qa="product-button"]').first();
        this.addToCartButtons = page.locator('[data-qa="product-button"]');
        this.cartHeader = page.locator('[data-qa="header-basket-count"]');
        this.dropdownElement = page.locator('[data-qa="sort-dropdown"]');
    }
    openHomepage = async () => {
        await this.page.goto('/');
    }
    openHomepageAndVerify = async () => {
        await this.page.goto('/');
        await expect(this.page).toHaveURL('/');
        await expect(this.page).toHaveTitle(titles.homepageTitle);
    }
    clickOnNavigationTab = async (number) => {
        const specifcNavigationTab = await this.navigationTabs.nth(number);
        await specifcNavigationTab.waitFor();
        await specifcNavigationTab.click();
    }
    addProductToCart = async () => {
        await this.productCard.waitFor();
        await this.addToCartButton.waitFor();
        await this.addToCartButton.click();
    }
    addProductsToCart = async (number) => {
        const specificAddButton = this.addToCartButtons;
        await specificAddButton.nth(number).waitFor();
        const textBeforeAdding = await specificAddButton.nth(number).innerText();
        const cartHeaderCountBeforeAdding = await this.getHeaderNumber();
        await specificAddButton.nth(number).click();
        const textAfterAdding = await specificAddButton.nth(number).innerText();
        const cartHeaderCountAfterAdding = await this.getHeaderNumber();
        await expect(cartHeaderCountAfterAdding).toBeGreaterThan(cartHeaderCountBeforeAdding);
        await expect(textAfterAdding).not.toBe(textBeforeAdding);
    }
    setDropdownValueAsc = async () => {
        await this.dropdownElement.waitFor();
        await this.dropdownElement.selectOption("Price ascending");
    }
    setDropdownAndVerify = async () => {
        await this.dropdownElement.waitFor();
        await this.dropdownElement.selectOption("Price ascending");
        await this.productCard.waitFor();
        await expect(this.dropdownElement).toHaveValue("price-asc");
        await expect(this.productCardTitle).toHaveText("Baby Zebra with butterfly");
        await this.dropdownElement.selectOption("Popularity (default)");
        await this.productCard.waitFor();
        await expect(this.dropdownElement).toHaveValue("default");
        await expect(this.productCardTitle).toHaveText("Astronaut dabbing");        
    }
    setDropdownValueDefault = async () => {
        await this.dropdownElement.waitFor();
        await this.dropdownElement.selectOption("Popularity (default)");
    }
    getHeaderNumber = async () => {
        await this.cartHeader.waitFor();
        const cartHeaderText = await this.cartHeader.innerText();
        return await parseInt(cartHeaderText, 10);
    }
}