const moment = require("moment");

const getStatistics = async (gsapi) => {
    const month = moment().format("MMMM");

    try {
        const res = await gsapi.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: `${month}!H3:I15`,
        });

        const valuesArray = res.data.values;
        const arrayWithoutEmptySpaces = valuesArray.filter(
            (value) => value.length !== 0
        );

        const statisticsText = `Here are statistics for ${month}:\n\n${arrayWithoutEmptySpaces.map((value) => `<b>${value[0]}:</b> ${value[1]}\n`).join('')}`;

        return statisticsText;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { getStatistics };
