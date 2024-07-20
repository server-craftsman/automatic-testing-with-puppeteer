const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Correctly specifying the log file path as a string
const logFilePath = path.join(__dirname, 'Log', 'log_sieuthiphatgiao.txt');
const testCase = path.join(__dirname, 'Log', 'TestCase_sieuthiphatgiao.txt');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();

    // Set the viewport to the maximum screen resolution
    const { width, height } = await page.evaluate(() => {
        return {
            width: window.screen.width,
            height: window.screen.height
        };
    });
    // edit test here

    await page.setViewport({ width, height });

    const startTime = new Date().toISOString();
    const endTime = new Date().toISOString();

    // input 
    const firstName = 'anh';
    const lastName = 'ba';
    const DOB = '03/19/2003'; // mm//dd/yyyy
    const email = 'automaticTest3@gmail.com';
    const password = 'securepassword123';


    try {
        // access page
        await page.goto('https://sieuthiphatgiaohienthuy.vn/');
        //create account and login
        await page.click("a[id='site-account-handle'] span[class='box-text']");
        await page.click("a[class='link']");
        // register
        // #case 1: input full and correct info
        const lastNameBox = 'input[name="customer[last_name]"]';
        await page.waitForSelector(lastNameBox, { timeout: 60000 });
        await page.type(lastNameBox, lastName, { delay: 100 });

        const firstNameBox = 'input[name="customer[first_name]"]';
        await page.waitForSelector(firstNameBox, { timeout: 60000 });
        await page.type(firstNameBox, firstName, { delay: 100 });

        // Select radio button
        const radioSelector = "label[for='radio2']";   // radio1 for women, radio2 for men
        await page.waitForSelector(radioSelector, { timeout: 60000 });
        await page.click(radioSelector);

        const DOBBox = 'input[name="customer[birthday]"]';
        await page.waitForSelector(DOBBox, { timeout: 60000 });
        await page.type(DOBBox, DOB, { delay: 100 });

        const emailBox = '#email';
        await page.waitForSelector(emailBox, { timeout: 60000 });
        await page.type(emailBox, email, { delay: 100 });

        const passwordBox = '#password';
        await page.waitForSelector(passwordBox, { timeout: 60000 });
        await page.type(passwordBox, password, { delay: 100 });

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }), // Wait for navigation to complete
            page.click("input[value='Đăng ký']"), // Click the Đăng ký button
        ]);


        const errorSelector = "div[class='errors'] ul li"; // Corrected selector for error element

        // Check for success or error message
        if (await page.$(errorSelector) !== null) {
            const message = 'Test case 1 failed';
            fs.appendFileSync(testCase, message + '\n'); // Append message to log file
            console.log(message);
        } else {
            const message = 'Test case 1 outcome unclear';
            fs.appendFileSync(testCase, message + '\n'); // Append message to log file
            console.log(message);
        }

        //end test case 1

        // Clear all data or reset state (example: reload the page)
        // await page.reload({ waitUntil: 'networkidle0' });

        // Test Case 2: dulpicate email 
        await page.goto('https://sieuthiphatgiaohienthuy.vn/account/register');
        


        // Login
        await page.goto('https://sieuthiphatgiaohienthuy.vn/account/login');
        // Test case 4
        const inputEmail = 'input[name="customer[email]"]';
        await page.waitForSelector(inputEmail, { timeout: 60000 });
        await page.type(inputEmail, email, { delay: 100 });

        const inputPassword = 'input[name="customer[password]"]';
        await page.waitForSelector(inputPassword, { timeout: 60000 });
        await page.type(inputPassword, password, { delay: 100 });

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }), // Wait for navigation to complete
            page.click("input[value='Đăng nhập']"), // Click the Đăng ký button
        ]);

        const errorSelectorCase2 = "div.errors ul li"; // Corrected selector for error element

        // Check for success or error message
        if (await page.$(errorSelectorCase2) !== null) {
            const message = 'Test case 4 failed';
            fs.appendFileSync(testCase, message + '\n'); // Append message to log file
            console.log(message);
        } else {
            const message = 'Test case 4 successful: Login OK';
            fs.appendFileSync(testCase, message + '\n'); // Append message to log file
            console.log(message);
        }


        // logout to test aonther case
        await page.goto('https://sieuthiphatgiaohienthuy.vn/account/login');
        await page.click("a[id='site-account-handle'] span[class='box-text']");
        await page.click("body > div:nth-child(2) > div:nth-child(1) > header:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(4) > a:nth-child(1)");
        console.log("Log Out Successfull");

        //  log successful
        const successMessage = `Test successfully\nStart time: ${startTime}\nEnd time: ${endTime}\n\n`;
        fs.appendFileSync(logFilePath, successMessage);
        console.log('Test successfully');
    } catch (error) {
        // Log failure and error details
        const endTime = new Date().toISOString();
        const errorMessage = `Test failed\nStart time: ${startTime}\nEnd time: ${endTime}\nError: ${error.message}\n\n`;
        fs.appendFileSync(logFilePath, errorMessage);
        console.log('Test failed');
    } finally {

    }

})();