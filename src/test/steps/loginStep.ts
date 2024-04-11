import {Given, Then, When} from "@cucumber/cucumber";
import { fixture } from "../hooks/pageFixture";

Given('user navigates to the application', async function () {
    
    await fixture.page.goto(process.env.BASEURL);
    fixture.logger.info("Navigated to the BookStore Application");
  });
  Given('User clicks on login link', async function () {
    await fixture.page.locator("//span[text()=' Login ']").click();
    fixture.page.waitForLoadState();
    fixture.logger.info("waiting for 2 seconds");
   // fixture.page.waitForTimeout(2000)
  });



  Given('user enters the username as {string}', async function (username) {
    await fixture.page.locator("//mat-label[text()='Username']").fill(username);
    fixture.logger.info("entered username");
  });



  Given('user enters the password as {string}', async function (password) {
    await fixture.page.locator("//mat-label[text()='Password']").fill(password);
    fixture.logger.info("entered password");
  });



  When('user clicks on the login button', async function () {
    await fixture.page.locator("//span[text()='Login']").click();
    fixture.logger.info("Clicked on SignIn button");
  });



  Then('login should be success for {string}', async function (username) {
    let user = await fixture.page.locator("//span[text()=' "+username+"']").textContent();
    console.log("User is:"+user);
    fixture.logger.info("user successfully logged in");
  });


  Then('login should fail', async function () {
    
  });


