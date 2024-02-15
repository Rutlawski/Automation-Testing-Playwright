export class CartPage{
    constructor(page){
        this.page = page;
        this.cartHeader = page.locator('[class="top-cart"]');
        this.productInCart = page.locator('[data-title="Product"]');
        this.addButton = page.locator('[data-increment="up"]');
        this.removeButton = page.locator('[data-increment="down"]');
        this.totalPrice = page.locator('[data-title="Total"]').first();
        this.updateCartButton = page.locator('[name="update_cart"]');
        this.cartEmptyText = page.getByText('Your cart is currently empty.');
        this.proceedToCheckoutButton = page.locator(' //a[contains(text(), "Proceed to checkout")]')
    }
    getCartHeaderNumber = async () => {
        await this.cartHeader.waitFor();
        const cartHeaderText = await this.cartHeader.innerText();
        const withoutText = cartHeaderText.replace("My Cart - zł ", "");
        return parseInt(withoutText, 10);
    }
    clickAddButton = async () => {
        await this.addButton.waitFor();
        await this.addButton.click();
    }
    clickRemoveButton = async () => {
        await this.removeButton.waitFor();
        await this.removeButton.click();
    }
    clickUpdateCartButton = async () => {
        await this.updateCartButton.waitFor();
        await this.updateCartButton.click();
    }
    getTotalPrice = async () => {
        await this.totalPrice.waitFor();
        const totalPriceText = await this.totalPrice.innerText();
        return parseInt(totalPriceText, 10);
    }
    clickProceedToCheckoutButton = async () => {
        await this.proceedToCheckoutButton.waitFor();
        await this.proceedToCheckoutButton.click();
    }
}