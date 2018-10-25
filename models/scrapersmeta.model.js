/**
 *
 * scrapers model to hold the meta info for the last time a scraper ran
 */

const Sequelize = require("sequelize");

const model = {
    table: "scrapers_meta",
    attributes: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        scraper: Sequelize.STRING,
        last_scraped: Sequelize.DATE
    }
};

class ScrapersMetaModel {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async initialize() {
        this.ScrapersMeta = await this.sequelize
            .define(model.table, model.attributes)
            .sync();
    }

    async getAll() {
        return await this.ScrapersMeta.findAll();
    }

    async add(data) {
        return await this.ScrapersMeta.create(data);
    }
}

module.exports = ScrapersMetaModel;
