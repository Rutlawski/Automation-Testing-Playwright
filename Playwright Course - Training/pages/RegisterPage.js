export class RegisterPage{
    constructor(page){
        this.page = page;
        this.registerButton = page.locator('[data-qa="go-to-signup-button"]');
        this.emailInput = page.getByPlaceholder('E-Mail');
        this.passwordInput = page.getByPlaceholder('Password');
        this.signUpButton = page.locator('//div[contains(text(), "Register")]');
    }
    clickOnRegisterButton = async () => {
        await this.registerButton.waitFor();
        await this.registerButton.click();
    }
    fillUpCredentialInputs = async (email, password) => {
        await this.emailInput.waitFor();
        await this.emailInput.fill(email);
        await this.passwordInput.waitFor();
        await this.passwordInput.fill(password);
    }
    clickOnSignUpButton = async () => {
        await this.signUpButton.waitFor();
        await this.signUpButton.click();
    }
}