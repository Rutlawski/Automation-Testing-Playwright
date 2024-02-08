export class MyAccountPage{
    constructor(page){
        this.page = page;
        this.emailText = page.getByText('Email:');
        this.errorMessage = page.getByText('{"message":"I am error"}');
    }
    openMyAccountPage = async () => {
        await this.page.goto("/my-account");
    }
}