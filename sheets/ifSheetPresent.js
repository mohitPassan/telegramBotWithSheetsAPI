const { getAllSheets } = require("./getAllSheets");

const ifSheetPresent = async (gsapi, name) => {
    const sheets = await getAllSheets(gsapi);

    return sheets.includes(name);
}

module.exports = {
    ifSheetPresent
}