const { addExpense } = require("./addExpense");
const { addNewSheet } = require("./addNewSheet");
const { connectToSheets, client } = require("./connection");
const { fillSalary } = require("./fillSalary");
const { getAllSheets } = require("./getAllSheets");
const { getClosingBalance } = require("./getClosingBalance");
const { getStatistics } = require("./getStatistics");
const { ifSheetPresent } = require("./ifSheetPresent");
const { setInitialValue } = require("./setInitialValue");

module.exports = {
    addExpense,
    addNewSheet,
    connectToSheets,
    client,
    fillSalary,
    getAllSheets,
    getClosingBalance,
    getStatistics,
    ifSheetPresent,
    setInitialValue
};
