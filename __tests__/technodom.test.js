const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const edge = require('selenium-webdriver/edge');
const ApplePage = require('../pages/ApplePage');
const ComparisonTest = require("../pages/Comparison");
const ProductTest = require("../pages/Product");

const browsers = ['edge', 'chrome'];

describe('Cross-Browser Testing Sequentially', () => {
    let driver;
    let applePage;
    let productTest;
    let comparisonTest;

    for (const browser of browsers) {
        describe(`Running tests in ${browser}`, () => {
            beforeAll(async () => {
                console.log(`Starting WebDriver for ${browser}...`);
                let options;

                if (browser === 'chrome') {
                    options = new chrome.Options();
                    options.addArguments("--start-maximized");
                    driver = await new Builder()
                        .forBrowser('chrome')
                        .setChromeOptions(options)
                        .build();
                } else if (browser === 'edge') {
                    options = new edge.Options();
                    options.addArguments("--start-maximized");
                    driver = await new Builder()
                        .forBrowser('MicrosoftEdge')
                        .setEdgeOptions(options)
                        .build();
                }

                applePage = new ApplePage(driver);
                comparisonTest = new ComparisonTest(driver);
                productTest = new ProductTest(driver);

                await driver.get('https://www.technodom.kz/catalog/smartfony-i-gadzhety/smartfony-i-telefony/smartfony/f/brands/apple');
            }, 30000);

            test('User can change city', async () => {
                await applePage.changeCity();
            });
            test('User can change language', async () => {
                await applePage.changeLanguage();
            });
            test("User can compare products", async () => {
                await comparisonTest.addFirstTwoProductsToCompare();
            });
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

            afterAll(async () => {
                await driver.quit();
                console.log(`Closed ${browser}`);
            });
        });
    }
});
