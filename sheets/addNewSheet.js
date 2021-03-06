const { client } = require("./connection");
const moment = require('moment');
const { setInitialValue } = require("./setInitialValue");

const addNewSheet = async (gsapi, month) => {
    try {
        const index = moment().format('MM');
    
        await gsapi.spreadsheets.batchUpdate({
            spreadsheetId: process.env.SPREADSHEET_ID,
            resource: {
                requests: [
                    {
                        duplicateSheet: {
                            sourceSheetId: process.env.TEMPLATE_ID,
                            insertSheetIndex: parseInt(index) + 1,
                            newSheetName: month
                        }
                    }
                ]
            },
            auth: client
        });

        await setInitialValue(gsapi);
    }
    catch (err) {
        console.log("Error adding new sheet: ", err);
    }
}

module.exports = {
    addNewSheet
}