const { expect, test } = require('@playwright/test');
const baseUrl = "http://localhost:3000"

test("Verify All Books link is visible", async ( {page} ) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test("Verify Login button is visible", async ( {page} ) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isloginButton = await loginButton.isVisible();
    expect(isloginButton).toBe(true);
});

test("Verify Register button is visible", async ( {page} ) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButton = await registerButton.isVisible();
    expect(isRegisterButton).toBe(true);
});

test("Verify All Books link is visible after login", async ( {page} ) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutBtnVisible = await logoutButton.isVisible();
    // expect(isLogoutBtnVisible).toBe(true);
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});
