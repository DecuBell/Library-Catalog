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
    expect(isLogoutBtnVisible).toBe(true);
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test("Verify My Books link is visible after login", async ( {page} ) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutBtnVisible = await logoutButton.isVisible();
    expect(isLogoutBtnVisible).toBe(true);
    const myBooksLink = await page.$('a[href="/profile"]');
    const isLinkVisible = await myBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test("Verify Add Book link is visible after login", async ( {page} ) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutBtnVisible = await logoutButton.isVisible();
    expect(isLogoutBtnVisible).toBe(true);
    const addBookLink = await page.$('a[href="/create"]');
    const isLinkVisible = await addBookLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test("Verify User's email address is visible after login", async ( {page} ) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutBtnVisible = await logoutButton.isVisible();
    expect(isLogoutBtnVisible).toBe(true);
    const emailAddress = await page.$('#user');
    const isLinkVisible = await emailAddress.isVisible();
    expect(isLinkVisible).toBe(true);
});

test("Login with valid credentials", async ( {page} ) => {
    await page.goto('http://localhost:3000/login')

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutBtnVisible = await logoutButton.isVisible();
    expect(isLogoutBtnVisible).toBe(true);
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});


test("Login with empty input fields", async ( {page} ) => {
    await page.goto('http://localhost:3000/login')

    const dialogPromise = new Promise((resolve, reject) => {
        page.once('dialog', async dialog => {
            try {
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toBe('All fields are required!');
                await dialog.accept();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

    await page.fill('#email', "");
    await page.fill('#password', "");
    await page.click('#login-form > fieldset > input');

    await dialogPromise;

    // page.on('dialog', async dialog => {
    //     expect(dialog.type()).toBe('alert');
    //     expect(dialog.message()).toBe('All fields are required!');
    //     await dialog.accept();
    // });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test("Login with empty password field", async ( {page} ) => {
    await page.goto('http://localhost:3000/login')

    const dialogPromise = new Promise((resolve, reject) => {
        page.once('dialog', async dialog => {
            try {
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toBe('All fields are required!');
                await dialog.accept();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "");
    await page.click('#login-form > fieldset > input');

    await dialogPromise;

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test("Login with empty email field", async ( {page} ) => {
    await page.goto('http://localhost:3000/login')

    const dialogPromise = new Promise((resolve, reject) => {
        page.once('dialog', async dialog => {
            try {
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toBe('All fields are required!');
                await dialog.accept();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

    await page.fill('#email', "");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    await dialogPromise;

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test("Register with valid credentials", async ( {page} ) => {
    await page.goto('http://localhost:3000/register')

    await page.fill('#email', `test-${Date.now()}@test.bg`);
    await page.fill('#password', "123456");
    await page.fill('#repeat-pass', "123456");
    await page.click('#register-form > fieldset > input');

    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test("Register with empty credentials", async ( {page} ) => {
    await page.goto('http://localhost:3000/register')

    const dialogPromise = new Promise((resolve, reject) => {
        page.once('dialog', async dialog => {
            try {
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toBe('All fields are required!');
                await dialog.accept();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

    await page.fill('#email', "");
    await page.fill('#password', "");
    await page.fill('#repeat-pass', "");
    await page.click('#register-form > fieldset > input');

    await dialogPromise;

    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test("Register with empty email", async ( {page} ) => {
    await page.goto('http://localhost:3000/register')

    const dialogPromise = new Promise((resolve, reject) => {
        page.once('dialog', async dialog => {
            try {
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toBe('All fields are required!');
                await dialog.accept();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

    await page.fill('#email', "");
    await page.fill('#password', "123456");
    await page.fill('#repeat-pass', "123456");
    await page.click('#register-form > fieldset > input');

    await dialogPromise;

    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test("Register with empty password", async ( {page} ) => {
    await page.goto('http://localhost:3000/register')

    const dialogPromise = new Promise((resolve, reject) => {
        page.once('dialog', async dialog => {
            try {
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toBe('All fields are required!');
                await dialog.accept();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

    await page.fill('#email', "test@test.com");
    await page.fill('#password', "");
    await page.fill('#repeat-pass', "123456");
    await page.click('#register-form > fieldset > input');

    await dialogPromise;

    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test("Register with empty confirm password", async ( {page} ) => {
    await page.goto('http://localhost:3000/register')

    const dialogPromise = new Promise((resolve, reject) => {
        page.once('dialog', async dialog => {
            try {
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toBe('All fields are required!');
                await dialog.accept();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

    await page.fill('#email', "test@test.com");
    await page.fill('#password', "123456");
    await page.fill('#repeat-pass', "");
    await page.click('#register-form > fieldset > input');

    await dialogPromise;

    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test("Register with different passwords", async ( {page} ) => {
    await page.goto('http://localhost:3000/register')

    const dialogPromise = new Promise((resolve, reject) => {
        page.once('dialog', async dialog => {
            try {
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toBe("Passwords don't match!");
                await dialog.accept();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

    await page.fill('#email', "test@test.com");
    await page.fill('#password', "123456");
    await page.fill('#repeat-pass', "987654");
    await page.click('#register-form > fieldset > input');

    await dialogPromise;

    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test("Add book with correct details", async ( {page} ) => {
    await page.goto('http://localhost:3000/login')

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutBtnVisible = await logoutButton.isVisible();
    expect(isLogoutBtnVisible).toBe(true);
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');

    page.click('a[href="/create"]');
    page.waitForSelector('#create-form');

    await page.fill('#title', `Test Book - ${Date.now()}`);
    await page.fill('#description', 'This is the book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form > fieldset > input');
    await page.waitForURL('http://localhost:3000/catalog');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test("Add book with empty title", async ( {page} ) => {
    await page.goto('http://localhost:3000/login')

    const dialogPromise = new Promise((resolve, reject) => {
        page.once('dialog', async dialog => {
            try {
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toBe("All fields are required!");
                await dialog.accept();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutBtnVisible = await logoutButton.isVisible();
    expect(isLogoutBtnVisible).toBe(true);
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');

    page.click('a[href="/create"]');
    page.waitForSelector('#create-form');

    await page.fill('#title', '');
    await page.fill('#description', 'This is the book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form > fieldset > input');

    await dialogPromise;

    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create')
});

test("Add book with empty description", async ( {page} ) => {
    await page.goto('http://localhost:3000/login')

    const dialogPromise = new Promise((resolve, reject) => {
        page.once('dialog', async dialog => {
            try {
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toBe("All fields are required!");
                await dialog.accept();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutBtnVisible = await logoutButton.isVisible();
    expect(isLogoutBtnVisible).toBe(true);
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');

    page.click('a[href="/create"]');
    page.waitForSelector('#create-form');

    await page.fill('#title', 'Test');
    await page.fill('#description', '');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form > fieldset > input');

    await dialogPromise;

    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
});

test("Add book with empty image", async ( {page} ) => {
    await page.goto('http://localhost:3000/login')

    const dialogPromise = new Promise((resolve, reject) => {
        page.once('dialog', async dialog => {
            try {
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toBe("All fields are required!");
                await dialog.accept();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutBtnVisible = await logoutButton.isVisible();
    expect(isLogoutBtnVisible).toBe(true);
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');

    page.click('a[href="/create"]');
    page.waitForSelector('#create-form');

    await page.fill('#title', 'Test');
    await page.fill('#description', 'Test');
    await page.fill('#image', '');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form > fieldset > input');

    await dialogPromise;

    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
});

test("Verify that all books are displayed", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutBtnVisible = await logoutButton.isVisible();
    expect(isLogoutBtnVisible).toBe(true);
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');

    await page.waitForSelector('.dashboard');
    const bookElements = await page.$$('.other-books-list li');
    expect(bookElements.length).toBeGreaterThan(0);
});

// test("Verify that no books are displayed", async ( {page} ) => {}

test("Verify that logged in users see Details button", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutBtnVisible = await logoutButton.isVisible();
    expect(isLogoutBtnVisible).toBe(true);
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');

    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('To Kill a Mockingbird');
});

