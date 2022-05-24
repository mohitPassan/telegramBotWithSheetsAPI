const { getAllSheets } = require("./getAllSheets");

const ifSheetPresent = async (gsapi, name) => {
    try {
        const sheets = await getAllSheets(gsapi);
        return sheets.includes(name);
    }
    catch(err) {
        console.log("Error checking if sheet present: ", err);
    }
}

module.exports = {
    ifSheetPresent
}