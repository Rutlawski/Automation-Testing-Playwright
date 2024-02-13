// import { expect } from "@playwright/test";
// import { links } from "../lib/links";

export class MyAccountPage{
    constructor(page){
        this.page = page;
        this.emailText = page.getByText('Email: admin');
        this.errorMessage = page.locator('[data-qa="error-message"]');
    }
    openMyAccountPage = async () => {
        await this.page.goto("/my-account");
    }
}