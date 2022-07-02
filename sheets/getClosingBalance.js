const getClosingBalance = async (gsapi, month, appendRes) => {
    const lastAppendedCell = appendRes.data.updates.updatedRange.split(":")[1];
    const rowNumber = lastAppendedCell.replace(/^\D+/g, "");

    try {
        const res = await gsapi.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: `${month}!F${rowNumber}`,
        });

        const values = res.data.values;

        if (!values || !values[0] || !values[0][0]) {
            return "No closing balance available. Please enter initial value.";
        }

        const closingBalance = values[0][0];
        return closingBalance;
    } catch (error) {
        throw new Error(`Error while getting closing balance\n${error}`);
    }
};

module.exports = { getClosingBalance };
