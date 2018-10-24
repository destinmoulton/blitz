const cheerio = require("cheerio");
const Nightmare = require("nightmare");

const nightmare = Nightmare({ show: false });

const URL = "https://projects.fivethirtyeight.com/2018-nfl-predictions/games/";

getURL({ url: URL, waitFor: "section.week" })
    .then(html => {
        const $ = cheerio.load(html);
        const days = $("div.day");

        days.slice(0, 2).forEach(day => {
            console.log(day.html());
        });
    })
    .catch(err => {
        console.error(err);
    });

function getURL(options) {
    return nightmare
        .goto(options.url)
        .wait(options.waitFor)
        .evaluate(() => {
            return document.body.innerHTML;
        })
        .end()
        .catch(error => {
            throw error;
        });
}
