const {By, until} = require('selenium-webdriver');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});

class BookingPage {
    constructor(driver) {
        this.driver = driver;
        this.changeCityButton = By.className('CitySelector_block__gRcUu');
        this.chooseAstanaButton = By.xpath('//p[contains(text(), "Астана")]');
        this.kzLanguageLink = By.xpath("//div[@class='LocalizationSelector_block__RRT5S']/a");
    }

    async changeCity() {
        await this.clickElement(this.changeCityButton);
        await this.clickElement(this.chooseAstanaButton);
    }

    async changeLanguage() {
        await this.clickElement(this.kzLanguageLink);
        this.driver.sleep(2000);
    }

    async clickElement(locator) {
        logger.info('Clicking element:', locator);
        const element = await this.driver.wait(until.elementLocated(locator), 10000);
        await this.driver.wait(until.elementIsVisible(element), 10000);
        await element.click();
    }
}

module.exports = BookingPage;