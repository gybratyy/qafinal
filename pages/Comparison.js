const { By, until } = require('selenium-webdriver');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});

class ComparisonTest {
    constructor(driver) {
        this.driver = driver;
        this.productLinks = By.css("ul.ProductList_block__nJTj5 li a");
        this.addToCompareButton = By.css("button[data-plw='add-to-compare']");
        this.comparisonPageLink = "https://www.technodom.kz/astana/compare";
    }

    async addFirstTwoProductsToCompare() {

        // Get first two product links
        let productElements = await this.driver.findElements(this.productLinks);
        if (productElements.length < 2) {
            throw new Error("Less than two products found in catalog!");
        }

        let productUrls = [];
        for (let i = 0; i < 2; i++) {
            productUrls.push(await productElements[i].getAttribute("href"));
        }

        // Visit each product page and click "Add to Compare"
        for (let url of productUrls) {
            logger.info(`Opening product page: ${url}`);
            await this.driver.get(url);

            let compareButton = await this.driver.wait(
                until.elementLocated(this.addToCompareButton), 10000
            );
            await this.driver.wait(until.elementIsVisible(compareButton), 10000);
            await compareButton.click();
            logger.info("Added product to comparison.");

            await this.driver.sleep(1000); // Small delay to ensure action is registered
        }

        await this.driver.get(this.comparisonPageLink);

    }
}

module.exports = ComparisonTest;
