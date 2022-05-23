const { getDebitOrCredit } = require("../helpers/getDebitOrCredit");
const { getFullType } = require("../helpers/getFullType");
const moment = require('moment');
const { sendMessage } = require("../telegram/sendMessage");
const { ifSheetPresent } = require("./ifSheetPresent");
const { addNewSheet } = require("./addNewSheet");

const addExpense = async (gsapi, item, value, type) => {
    const month = moment().format('MMMM');
    const ifPresent = await ifSheetPresent(gsapi, month);

    if (!ifPresent) {
        await addNewSheet(gsapi, month);
    }

    const finalType = getFullType(type);
    let debitOrCredit = getDebitOrCredit(value);
    const amount = value.slice(1);
    const date = moment().format('DD MMM');

    let values = []

    if(debitOrCredit === 'Debit') {
        values.push([date, item, finalType, amount, '']);
    } else {
        values.push([date, item, finalType, '', amount]);
    }

    const updateOptions = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: `${month}!A3:C3`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: values
        }
    }

    await gsapi.spreadsheets.values.append(updateOptions);

    sendMessage(`The following is saved to sheets:\n\nDate: ${date}\nItem: ${item}\nAmount: ${amount}\nType: ${finalType}\nDebit/Credit: ${debitOrCredit}`);
}

module.exports = {
    addExpense
}