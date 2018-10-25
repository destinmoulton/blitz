const Sequelize = require("sequelize");
const slugify = require("slugify");

module.exports = {
    name: "NFL Teams",
    url: "https://www.foxsports.com/nfl/teams",
    waitFor: "section.wisbb_body",
    // Sequelize model
    model: {
        table: "sxp_teams",
        attributes: {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            city: Sequelize.STRING,
            name: Sequelize.STRING,
            league: Sequelize.STRING,
            division: Sequelize.STRING,
            city_slug: Sequelize.STRING,
            name_slug: Sequelize.STRING,
            full_slug: Sequelize.STRING
        }
    },

    scrape: $ => {
        const $divisions = $("body").find("div.wisbb_divisionSection");

        let scrapeData = [];
        $divisions.each((i, division) => {
            const divisionTitle = $(division)
                .find("h3.wisbb_h3")
                .text();

            const $teams = $(division).find("div.wisbb_fullTeamStacked");

            $teams.each((i, team) => {
                const parts = $(team).find("span");

                scrapeData.push({
                    city: $(parts[0]).text(),
                    name: $(parts[1]).text(),
                    division: divisionTitle
                });
            });
        });
        return scrapeData;
    },
    associate: data => {
        return {
            city: data["city"],
            name: data["name"],
            league: data["division"].split(" ")[0],
            division: data["division"],
            city_slug: slugify(data["city"]),
            name_slug: slugify(data["name"]),
            full_slug: slugify(data["city"] + " " + data["name"])
        };
    }
};
