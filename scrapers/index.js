/**
 * Export all the scrapes
 *
 * Source: https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
 */
var glob = require("glob"),
    path = require("path");

let exp = {};
glob.sync(path.join(__dirname, "/**/*.scrape.js")).forEach(function(file) {
    const scraperName = path
        .basename(file)
        .split(".")
        .slice(0, 1)
        .toString();

    exp[scraperName] = require(path.resolve(file));
});

module.exports = exp;
