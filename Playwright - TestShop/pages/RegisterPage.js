import { expect } from "@playwright/test";
import { links } from "../lib/links";

export class RegisterPage{
    constructor(page){
        this.page = page;
        this.emailInputLogin = page.locator('[id="reg_email"]');
        this.passwordInputLogin = page.locator('[id="reg_password"]');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.p = page.locator('//p[contains(text(), "From your account dashboard you can view your ")]');
        this.genericShopButton = page.locator('//a[contains(text(), "Generic Shop")]');
    }
    openRegisterPage = async () => {
        await this.page.goto(links.RegisterPageURL);
    }
    fillRegisterCredentails = async (email, password) => {
        await this.emailInputLogin.waitFor();
        await this.emailInputLogin.fill(email);
        await this.passwordInputLogin.waitFor();
        await this.passwordInputLogin.fill(password);
    }
    clickRegisterButton = async () => {
        await this.registerButton.waitFor();
        await this.registerButton.click();
    }
    clickGenericShopButton = async () => {
        await this.genericShopButton.waitFor();
        await this.genericShopButton.click();
        await expect(this.page).toHaveURL('/');
    }
}