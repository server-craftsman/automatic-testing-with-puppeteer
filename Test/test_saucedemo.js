const puppeteer = require('puppeteer-core'); // Use puppeteer-core instead of puppeteer
const fs = require('fs');
const path = require('path');
const data = require('../Data/data_saucedemo'); //

const logFilePath = path.join(__dirname, '..', 'Log', 'log_saucedemo.txt');


// Replace this path with the path to your Microsoft Edge executable
const edgePath = 'C:\\Program Files\\Google\\Chrome\\Application\\\chrome.exe';
// const userDataDir = '';

const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
};
// Function to clear an input field

(async () => {
    const browser = await puppeteer.launch({
        executablePath: edgePath,
        headless: false,
        args: [
            '--start-maximized'
            // ,`--user-data-dir=${userDataDir}`
        ]
    });
    const page = await browser.newPage();

    // Set the viewport to the maximum screen resolution
    const { width, height } = await page.evaluate(() => {
        return {
            width: window.screen.width,
            height: window.screen.height
        };
    });
    await page.setViewport({ width, height });

    const startTime = new Date().toISOString();
    // access page
    await page.goto('https://www.saucedemo.com/');
    fs.appendFileSync(logFilePath, `\nBegin Testing\n`);
    await delay(2000);
    // ---- Edit Test Case Here -----//

    // Test Login
    // Case1: Input correct info and login success
    try {
        const userNameBox = 'input[name="user-name"]';
        await page.waitForSelector(userNameBox, { timeout: 60000 });
        await page.type(userNameBox, data.userName, { delay: 100 });

        const passwordBox = 'input[name="password"]';
        await page.waitForSelector(passwordBox, { timeout: 60000 });
        await page.type(passwordBox, data.password, { delay: 100 });
        await delay(500);
        await page.click("#login-button");

        // // Wait for an element that appears only after a successful login
        // const inventoryPageSelector = '.inventory_list';
        // await page.waitForSelector(inventoryPageSelector, { timeout: 30000 });

        const currentUrl = page.url();
        const endTime = new Date().toISOString();

        if (currentUrl === 'https://www.saucedemo.com/inventory.html') {
            // Login was successful
            const logMessage = `Test Case 1: Login successful\n started at ${startTime}, ended at ${endTime}\n`;
            console.log(logMessage);
            fs.appendFileSync(logFilePath, logMessage);
        } else {
            // Login failed, check for failure message
            const errorMessageSelector = "#login_button_container > div > form > div.error-message-container.error > h3";
            const errorElement = await page.$(errorMessageSelector);
            if (errorElement) {
                const errorText = await page.evaluate(el => el.textContent, errorElement);
                const logMessage = `Test Case 1: Login failed\n started at ${startTime}, ended at ${endTime}\nerror: ${errorText}\n`;
                console.log(logMessage);
                fs.appendFileSync(logFilePath, logMessage);
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        const errorTime = new Date().toISOString();
        const logMessage = `Login error: started at ${startTime}, ended at ${errorTime}, error: ${error.message}\n`;
        console.log(logMessage);
        fs.appendFileSync(logFilePath, logMessage);

    }
    // end Test Case 1
    await delay(2000);
    // Case 2: Input incorrect info and login failed
    try {
        await page.goto('https://www.saucedemo.com/'); // return to login page 
        const userNameBox = 'input[name="user-name"]';
        await page.waitForSelector(userNameBox, { timeout: 60000 });
        await page.type(userNameBox, data.fakeUserName, { delay: 100 });

        const passwordBox = 'input[name="password"]';
        await page.waitForSelector(passwordBox, { timeout: 60000 });
        await page.type(passwordBox, data.fakePassword, { delay: 100 });

        await delay(500);
        await page.click("#login-button");

        const currentUrl = page.url();
        const endTime = new Date().toISOString();

        if (currentUrl === 'https://www.saucedemo.com/inventory.html') {
            // Login was successful
            const logMessage = `Test Case 2: Login successful\n started at ${startTime}, ended at ${endTime}\n`;
            console.log(logMessage);
            fs.appendFileSync(logFilePath, logMessage);
        } else {
            // Login failed, check for failure message
            const errorMessageSelector = "#login_button_container > div > form > div.error-message-container.error > h3";
            const errorElement = await page.$(errorMessageSelector);
            if (errorElement) {
                const errorText = await page.evaluate(el => el.textContent, errorElement);
                const logMessage = `Test Case 2: Login failed\n started at ${startTime}, ended at ${endTime}\nerror: ${errorText}\n`;
                console.log(logMessage);
                fs.appendFileSync(logFilePath, logMessage);
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        const errorTime = new Date().toISOString();
        const logMessage = `Login error: started at ${startTime}, ended at ${errorTime}, error: ${error.message}\n`;
        console.log(logMessage);
        fs.appendFileSync(logFilePath, logMessage);
    }

    // end Test Case 2
    await delay(3000);
    await page.evaluate(() => {
        document.querySelector('#user-name').value = '';
        document.querySelector('#password').value = '';
    });
    // Case 3: Input missing password and login failed
    try {
        await page.goto('https://www.saucedemo.com/');
        const userNameBox = 'input[name="user-name"]';
        await page.waitForSelector(userNameBox, { timeout: 60000 });
        await page.type(userNameBox, data.userName, { delay: 100 });

        const passwordBox = 'input[name="password"]';
        await page.waitForSelector(passwordBox, { timeout: 60000 });
        await page.type(passwordBox, data.emptyPassword, { delay: 100 });

        await delay(500);
        await page.click("#login-button");

        const currentUrl = page.url();
        const endTime = new Date().toISOString();

        if (currentUrl === 'https://www.saucedemo.com/inventory.html') {
            // Login was successful
            const logMessage = `Test Case 3: Login successful\n started at ${startTime}, ended at ${endTime}\n`;
            console.log(logMessage);
            fs.appendFileSync(logFilePath, logMessage);
        } else {
            // Login failed, check for failure message
            const errorMessageSelector = "#login_button_container > div > form > div.error-message-container.error > h3";
            const errorElement = await page.$(errorMessageSelector);
            if (errorElement) {
                const errorText = await page.evaluate(el => el.textContent, errorElement);
                const logMessage = `Test Case 3: Login failed\n started at ${startTime}, ended at ${endTime}\nerror: ${errorText}\n`;
                console.log(logMessage);
                fs.appendFileSync(logFilePath, logMessage);
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        const errorTime = new Date().toISOString();
        const logMessage = `Login error: started at ${startTime}, ended at ${errorTime}, error: ${error.message}\n`;
        console.log(logMessage);
        fs.appendFileSync(logFilePath, logMessage);
    }
    // end Test Case 3
    await delay(3000);
    // Test Shopping (from login to buy item success)
    console.log("Test Add to Cart");
    fs.appendFileSync(logFilePath, "Test Add to Cart\n");
    try {
        await page.goto('https://www.saucedemo.com/');
        const userNameBox = 'input[name="user-name"]';
        await page.waitForSelector(userNameBox, { timeout: 60000 });
        await page.type(userNameBox, data.userName, { delay: 100 });

        const passwordBox = 'input[name="password"]';
        await page.waitForSelector(passwordBox, { timeout: 60000 });
        await page.type(passwordBox, data.password, { delay: 100 });
        await delay(500);
        await page.click("#login-button");
        await delay(2000);
        // choose product to add cart
        await page.click("#add-to-cart-sauce-labs-bolt-t-shirt", { delay: 500 });
        // await page.click("#remove-sauce-labs-bolt-t-shirt", { delay: 500 }); // remove
        await page.click("#add-to-cart-sauce-labs-bike-light", { delay: 500 });
        await page.click("#add-to-cart-sauce-labs-backpack", { delay: 500 });
        await delay(2000);
        //checkout
        await page.click(".shopping_cart_link");
        await delay(3000);
        await page.click("#checkout");
        await delay(2000);
        //fill checkout form
        console.log("Fill checkout form");
        fs.appendFileSync(logFilePath, "Fill checkout form\n");
        try {
            // case 4: not input anything -> error
            try {
                await delay(400);
                await page.click("#continue");
                await delay(1000);

                // Check and log result for case 4
                const errorMessageSelector = "#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error > h3";
                const errorElement = await page.$(errorMessageSelector);
                if (errorElement) {
                    const errorText = await page.evaluate(el => el.textContent, errorElement);
                    const logMessage = `Test Case 4: \nerror: ${errorText}\n`;
                    console.log(logMessage);
                    fs.appendFileSync(logFilePath, logMessage);
                }
            } catch (error) {
                console.error(`Error during test case 4: ${error.message}`);
            }

            // case 5: only input name -> error
            try {
                await page.type("#first-name", data.firstName, { delay: 100 });
                await page.type("#last-name", data.lastName, { delay: 100 });
                await delay(500);
                await page.click("#continue");
                await delay(500);

                // Check and log result for case 5
                const errorMessageSelector = "#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error > h3";
                const errorElement = await page.$(errorMessageSelector);
                if (errorElement) {
                    const errorText = await page.evaluate(el => el.textContent, errorElement);
                    const logMessage = `Test Case 5: \nerror: ${errorText}\n`;
                    console.log(logMessage);
                    fs.appendFileSync(logFilePath, logMessage);
                }
            } catch (error) {
                console.error(`Error during test case 5: ${error.message}`);
            }
            // end test case 5
            // clear output
            await page.evaluate(() => {
                document.querySelector("#first-name", { delay: 100 }).value = '';
                document.querySelector("#last-name").value = '';
            });
            // case 6: input full info -> can process checkout
            try {

                await page.type("#first-name", data.firstName, { delay: 100 });
                await page.type("#last-name", data.lastName, { delay: 100 });
                await page.type("#postal-code", data.postalCode, { delay: 100 });
                await delay(500);
                await page.click("#continue");
                await delay(500);

                // Check and log result for case 6
                const errorMessageSelector = "#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error > h3";
                const errorElement = await page.$(errorMessageSelector);
                if (errorElement) {
                    const errorText = await page.evaluate(el => el.textContent, errorElement);
                    const logMessage = `Test Case 6: \nerror: ${errorText}\n`;
                    console.log(logMessage);
                    fs.appendFileSync(logFilePath, logMessage);
                } else {
                    const logMessage = `Test Case 6: fill checkout form success`;
                    console.log(logMessage);
                    fs.appendFileSync(logFilePath, logMessage);
                }
            } catch (error) {
                console.error(`Error during test case 6: ${error.message}`);
            }
        } catch (error) {
            console.error('fill checkout form:', error);
            const errorTime = new Date().toISOString();
            const logMessage = `Fill checkout form: ended at ${errorTime}, error: ${error.message}\n`;
            console.log(logMessage);
            fs.appendFileSync(logFilePath, logMessage);
        }
        // process payment
        await delay(500);
        await click("#continue");
        await delay(3000);
        await click("#finish");
        fs.appendFileSync(logFilePath, "Process Payment Complete");
        await delay(1500);
        await click("#back-to-products");
        //

        // Logout
        await delay(1000);
        await click("#react-burger-menu-btn");
        await delay(500);
        await click("#logout_sidebar_link");

    } catch (error) {
        console.error('Add To Cart Error:', error);
            const errorTime = new Date().toISOString();
            const logMessage = `Add To Cart Error:: ended at ${errorTime}, error: ${error.message}\n`;
            console.log(logMessage);
            fs.appendFileSync(logFilePath, logMessage);
    }


    await delay(2000);
    await page.goto('https://www.saucedemo.com/');
    fs.appendFileSync(logFilePath, `\nEnd Testing\n`);
    await delay(500);
    await browser.close(); // close browser
})();