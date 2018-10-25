modules.export = {
    name: "CBS NFL Injuries Report",
    url: "https://www.cbssports.com/nfl/injuries/",
    waitFor: "section.wisbb_body",
    selectionMap: [
        {
            type: "loop",
            selector: "div.Page-colMain > div.TableBase",
            map: null,
            subselectors: [
                {
                    type: "single",
                    selector: "span.TeamLogoNameLockup-name",
                    map: {
                        table: "teams"
                    }
                }
            ]
        }
    ]
};
