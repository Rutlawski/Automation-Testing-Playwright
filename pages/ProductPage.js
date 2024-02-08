import { expect } from "@playwright/test";
import { Navigation } from "./navigation";

export class ProductPage {
    constructor (page){
        this.page = page;
        this.addButton = page.locator('[data-qa = "product-button"]').first();
        this.addButtons = page.locator('[data-qa = "product-button"]');
        this.dropdown = page.locator('[data-qa="sort-dropdown"]');
        this.productTitle = page.locator('[data-qa="product-title"]');
        this.myAccountButton = page.locator('[data-qa="desktop-nav-link"]').first();
    }
    openHomepage = async () => {
        await this.page.goto("/");
    }
    openHomepageAndVerify = async () => {
        await this.page.goto("/");
        await expect(this.page).toHaveTitle("Art Shopping Store");
    }
    selectDropdownValue = async () => {
        await this.dropdown.waitFor();
        await this.dropdown.selectOption("price-asc");
        await expect(this.dropdown).toHaveValue("price-asc");
    }
    selectSecondDropdownValue = async () => {
        await this.dropdown.waitFor();
        await this.dropdown.selectOption("default");
        await expect(this.dropdown).toHaveValue("default");
    }
    selectDropdownValueAndVerify = async () => {
        await this.dropdown.waitFor();
        await this.productTitle.first().waitFor();
        const productTileBefore = await this.productTitle.allInnerTexts();
        await this.dropdown.selectOption("price-asc");
        await this.productTitle.first().waitFor();
        const productTileAfter = await this.productTitle.allInnerTexts();
        await expect(productTileAfter).not.toEqual(productTileBefore);
        }
    addProduct = async () => {
        await this.addButton.waitFor();
        await this.addButton.click();
    }
    addProducts = async(number) => {
        const navigation = new Navigation(this.page);
        const specificAddButton = this.addButtons.nth(number);
        await specificAddButton.waitFor();
        const countBeforeClicking = await navigation.getCartCount();
        await expect(specificAddButton).toHaveText("Add to Basket");
        await specificAddButton.click();
        const countAfterClicking = await navigation.getCartCount();
        await expect(specificAddButton).toHaveText("Remove from Basket");
        await expect(countAfterClicking).toBeGreaterThan(countBeforeClicking);
    }
    clickMyAccountButton = async () => {
        await this.myAccountButton.waitFor();
        await this.myAccountButton.click();
    }
}