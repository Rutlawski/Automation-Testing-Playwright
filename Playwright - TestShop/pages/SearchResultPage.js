import { expect } from "@playwright/test";

export class SearchResultPage{
    constructor(page){
        this.page = page;
        this.searchHeaderEmpty = page.locator('[class="page-header"]');
        this.searchHeaderTop = page.locator('[class="entry-title"]').first();
        this.blackTopHeader = page.getByRole('link', { name: 'Black Top', exact: true });
        this.genericShopButton = page.locator('//a[contains(text(), "Generic Shop")]');
    }
    clickBlackTopHeader = async () => {
        await this.blackTopHeader.waitFor();
        await this.blackTopHeader.click();
        await expect(this.page).toHaveURL(/\/black-top/);
    }
    clickGenericShopButton = async () => {
        await this.genericShopButton.waitFor();
        await this.genericShopButton.click();
    }
}