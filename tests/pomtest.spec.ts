import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage'
import {HomePage} from '../pages/HomePage'
import {CartPage} from '../pages/CartPage'

test("User can login, and add product to cart", async({page})=>{
    await page.goto("https://www.demoblaze.com/");
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    /*
    await loginPage.clickLoginLink();
    await loginPage.enterUserName("pavanol");
    await loginPage.enterpassword("test@123");
    await loginPage.clickLoginButton();*/

    await loginPage.performLogin("pavanol","test@123");
    await page.waitForTimeout(5000);
    await homePage.addProductToCart("Nexus 6");
    await page.waitForTimeout(2000);
    await homePage.gotoCart();
    //await page.waitForTimeout(2000);
    const isProductInCart = await cartPage.checkProductInCart("Nexus 6")
    expect(isProductInCart).toBeTruthy();

})