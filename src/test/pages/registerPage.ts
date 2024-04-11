import {expect, Page} from "@playwright/test";
import PlayWrightWrapper from "../helper/wrapper/PlayWrightWrapper";

export default class RegisterPage{
    private base: PlayWrightWrapper;

    constructor(private page:Page){
        this.base = new PlayWrightWrapper(page);
    }

    private Elements = {
        fName: "input[formcontrolname='firstname']",
        lname: "input[formcontrolname='lastname']",
        userName: "input[formcontrolname='username']",
        password: "input[formcontrolname='password']",
        confirmPassword: "input[formcontrolname='confirmPassword']",
        maleInput: "input[value='Male']",
        femaleInput: "input[value='Female']",
        maleRadioBtn: "input[value='Male']",
        femaleRadioBtn: "input[value='Female']",
        regBtn: "//span[text()='Register']" 
    }
    async navigateToRegisterPage() {
        await this.base.goto("https://bookcart.azurewebsites.net/register")
    }


    async registerUser(firstname: string, lastname: string, userName: string,
        password: string, confirmPassword: string,
        gender: string) {
        await this.page.fill(this.Elements.fName, firstname);
        await this.page.fill(this.Elements.lname, lastname);
        // this must be unique always
        await this.enterUsername(userName);
        await this.page.fill(this.Elements.password, password);
        await this.page.fill(this.Elements.confirmPassword, confirmPassword);
        if (gender == "m") {
            await this.page.click(this.Elements.maleRadioBtn);
            await expect(this.page.locator(this.Elements.maleInput)).toBeChecked();
        } else {
            await this.page.click(this.Elements.femaleRadioBtn);
            await expect(this.page.locator(this.Elements.femaleInput)).toBeChecked();
        }
        const regBtn = this.page.locator(this.Elements.regBtn);
        await regBtn.click();
    }

    async enterUsername(userName: string) {
        await this.page.fill(this.Elements.userName, userName);
        const [response] = await Promise.all([
            this.page.waitForResponse(res => {
                return res.status() == 200
                    &&
                    res.url() == `https://bookcart.azurewebsites.net/api/user/validateUserName/${userName}`
            })
        ]);
        await response.finished();
    }
}
