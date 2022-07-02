const { getAllSheets } = require("./getAllSheets");

const setInitialValue = async (gsapi) => {
    try {
        const allSheets = await getAllSheets(gsapi);
        const currentSheet = allSheets[allSheets.length - 1];
        const previousSheet = allSheets[allSheets.length - 2];

        const res = await gsapi.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: `${previousSheet}!F:F`,
        });

        const values = res.data.values;
        const initialValue = values[values.length - 1][0];

        var numberPattern = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
        const finalValue = initialValue.match(numberPattern).join("");

        let valuesToSet = [[finalValue]];

        await gsapi.spreadsheets.values.update({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: `${currentSheet}!B1`,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: valuesToSet,
            },
        });
    } catch (err) {
        throw new Error(`Error setting initial value\n${err}`);
    }
};

module.exports = { setInitialValue };
