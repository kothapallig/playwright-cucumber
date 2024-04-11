import { Given, Then, When, setDefaultTimeout} from "@cucumber/cucumber";
import { chromium, Browser, Page, expect } from "@playwright/test"
import { fixture } from "../hooks/pageFixture";


setDefaultTimeout(60*1000)
Given('user search for the product {string}', async function (product) {
   await fixture.page.locator("input[type='search']").fill(product);
   await fixture.page.locator("mat-option[role='option'] span").click();
   fixture.logger.info("product is searched");
  });


  When('user clicks on the addtocart button', async function () {
   await fixture.page.locator("//span[text()[normalize-space()='Add to Cart']]").click();
   fixture.logger.info("User Clicked on AddtoCart button");
  });


  When('user clicks on cart icon', async function () {
   await fixture.page.locator("(//mat-icon[text()='shopping_cart'])[1]").click();
   fixture.logger.info("Cart icon is clicked on");
  });



  Then('user should check the qty added to be {int}', async function (qty) {
    qty = await fixture.page.locator("(//div[@class='d-flex align-items-center']//div)[2]").textContent();
    expect(Number(qty)).toBeGreaterThan(0);
    fixture.logger.info("successfully validated the no of items added to the cart");
  });