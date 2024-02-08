export class Register {
    constructor(page){
        this.page = page;
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.loginInput = page.getByPlaceholder('E-Mail');
        this.passwordInput = page.getByPlaceholder('Password');
    }
    createNewUser = async (email, password) => {
        await this.loginInput.waitFor();
        await this.loginInput.fill(email);
        await this.passwordInput.waitFor();
        await this.passwordInput.fill(password);
        await this.registerButton.waitFor();
        await this.registerButton.click();
    }
}