const {By, until} = require('selenium-webdriver');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});

class ProductTest {
    constructor(driver) {
        this.driver = driver;
        this.addToWishListButton = By.css("button[data-plw='add-to-wishlist']");
        this.addToCartButton = By.css(".ProductCardAddToCartBtn_isOnlyOne__2_A1q");
        this.wishlistPageLink = "https://www.technodom.kz/astana/my-account/wishlist";
        this.cartPageLink = "https://www.technodom.kz/astana/cart";
        this.productPageLink = "https://www.technodom.kz/astana/p/smartfon-gsm-apple-iphone-13-128gb-thx-61-12-5-midnight-252945";
        this.openCharacteristicsButton = By.xpath('//p[contains(text(), "Раскрыть весь список")]');
        this.increaseQuantityButton = By.css("button[data-plw='increase']");
        this.decreaseQuantityButton = By.css("button[data-plw='decrease']");
        this.removeFromCartButton = By.css("button[data-plw='delete-product']");
        this.acceptRemoveButton = By.css("button[data-action='actions-btn-delete']");
        this.checkoutButton = By.css("button[data-plw='to-checkout-button']");
    }


    async openCharacteristics() {
        await this.driver.get(this.productPageLink);
        logger.info(`Opening product page: ${this.productPageLink}`);
        await this.clickElement(this.openCharacteristicsButton);
    }
    async addToWishList() {

        await this.clickElement(this.addToWishListButton);
        logger.info("Added product to wishlist.");
        await this.driver.get(this.wishlistPageLink);

    }
    async addToCart(){
        await this.clickElement(this.addToCartButton);
        logger.info("Added product to cart.");
        await this.driver.get(this.cartPageLink);
    }

    async increaseQuantity(){
        await this.clickElement(this.increaseQuantityButton);
        logger.info("Increased quantity of product.");
    }

    async decreaseQuantity(){
        await this.clickElement(this.decreaseQuantityButton);
        logger.info("Decreased quantity of product.");
    }

    async checkout(){
        await this.clickElement(this.checkoutButton);
        logger.info("Checked out.");
    }
    async removeProductFromCart(){
        await this.driver.get(this.cartPageLink);
        await this.clickElement(this.removeFromCartButton);
        await this.clickElement(this.acceptRemoveButton);
        logger.info("Removed product from cart.");
    }



    async clickElement(locator) {
        logger.info('Clicking element:', locator);
        const element = await this.driver.wait(until.elementLocated(locator), 10000);
        await this.driver.wait(until.elementIsVisible(element), 10000);
        await element.click();
    }

}

module.exports = ProductTest;
