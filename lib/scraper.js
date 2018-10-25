const scrapersMM = require("../models/scrapers.model");

class Scraper {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    initialize() {
        this.ScrapersMM = this.sequelize.define(
            scrapersMM.table,
            scrapersMM.attributes
        );
    }
}
