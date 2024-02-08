export class Navigation {
    constructor(page){
        this.page = page;
        this.cartHeader = page.locator('[data-qa="header-basket-count"]');
        this.cartLink = page.getByRole('link', { name: 'Checkout' });
    }
    getCartCount = async () => {
        await this.cartHeader.waitFor();
        const textOfHeader = await this.cartHeader.innerText();
        return parseInt(textOfHeader, 10);
    }
    clickOnCheckout = async () => {
        await this.cartLink.waitFor();
        await this.cartLink.click();
        await this.page.waitForURL("/basket");
    }
}