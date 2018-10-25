const cheerio = require("cheerio");
const _ = {
    difference: require("lodash/difference"),
    keys: require("lodash/keys"),
    map: require("lodash/map")
};
const Nightmare = require("nightmare");

const ScrapersMetaModel = require("../models/scrapersmeta.model");

const scrapers = require("../scrapers");

class Scrape {
    constructor(sequelize) {
        this.sequelize = sequelize;

        this.scrapersMetaModel = new ScrapersMetaModel(sequelize);

        this.models = {};

        this.nightmare = Nightmare({ show: false });
    }

    async end() {
        return this.nightmare
            .end()
            .then()
            .catch(err => {
                throw err;
            });
    }

    async update() {
        await this.initializeModels();
        await this.scrapersMetaModel.initialize();

        this.meta = await this.scrapersMetaModel.getAll();

        await this.scrapeNew();
    }

    async scrapeNew() {
        const unscraped = this.compareModelsAndMeta();

        return unscraped.map(async toscrape => {
            const scraper = scrapers[toscrape];

            try {
                const rawHTML = await this.getURL(scraper.url, scraper.waitFor);
                const scraped = scraper.scrape(cheerio.load(rawHTML));
                console.log(scraped);
            } catch (err) {
                console.error(err);
            }

            try {
                await this.scrapersMetaModel.add({ scraper: toscrape });
            } catch (err) {
                console.error(err);
            }

            //const mappedData = scraper.associate(scraped);
        });
    }

    async initializeModels() {
        _.keys(scrapers).map(async name => {
            const model = scrapers[name].model;
            try {
                this.models[name] = await this.sequelize
                    .define(model.table, model.attributes)
                    .sync();
            } catch (err) {
                throw err;
            }
        });
    }

    async getURL(url, waitFor) {
        return this.nightmare
            .goto(url)
            .wait(waitFor)
            .evaluate(() => {
                return document.body.innerHTML;
            })
            .catch(error => {
                throw error;
            });
    }

    compareModelsAndMeta() {
        const metaScrapers = _.map(this.meta, "scraper");
        const fileScrapers = _.keys(scrapers);

        return _.difference(fileScrapers, metaScrapers);
    }
}

module.exports = Scrape;
