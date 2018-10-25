/**
 *
 * scrapers model to hold the meta info for the last time a scraper ran
 */

const Sequelize = require("sequelize");

module.exports = {
    table: "scrapers",
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
