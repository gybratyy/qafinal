const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const ApplePage = require('../pages/ApplePage');
const ComparisonTest = require("../pages/Comparison");
const ProductTest = require("../pages/Product");
let driver;
let applePage;
let productTest;
let comparisonTest;
beforeAll(async () => {
    console.log("Starting WebDriver initialization...");

    try {
        let options = new chrome.Options();
        options.addArguments("--start-maximized"); // Open Chrome in maximized mode

        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

        applePage = new ApplePage(driver);
        comparisonTest = new ComparisonTest(driver);
        productTest = new ProductTest(driver);
        await driver.get('https://www.technodom.kz/catalog/smartfony-i-gadzhety/smartfony-i-telefony/smartfony/f/brands/apple');
    } catch (error) {
        console.error("WebDriver failed to initialize:", error);
    }
}, 30000);
afterAll(async () => {
    //add timeout
    await new Promise(resolve => setTimeout(resolve, 10000));
    await driver.quit();
});
test('User can change city', async () => {
    await applePage.changeCity();
});
test('User can change language', async () => {
    await applePage.changeLanguage();
});
test("User can compare products", async () => {
    await comparisonTest.addFirstTwoProductsToCompare();
})
test('User can open characteristics', async () => {
    await productTest.openCharacteristics();
});
test('User can add product to wishlist', async () => {
    await productTest.addToWishList();
});
test('User can add product to cart', async () => {
    await productTest.addToCart();
});
test('User can increase quantity of product', async () => {
    await productTest.increaseQuantity();
});
test('User can decrease quantity of product', async () => {
    await productTest.decreaseQuantity();
});
test('User can checkout', async () => {
    await productTest.checkout();
});
test('User can remove product from cart', async () => {
    await productTest.removeProductFromCart();
});

