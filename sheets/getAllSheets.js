const { client } = require("./connection");

const getAllSheets = async (gsapi) => {
    const res = await gsapi.spreadsheets.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        ranges: [],
        includeGridData: false,
        auth: client
    });

    const sheets = res.data.sheets;
    const sheetsNames = sheets.map(sheet => sheet.properties.title);
    return sheetsNames;
}

module.exports = {
    getAllSheets
}