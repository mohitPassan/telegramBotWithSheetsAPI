const getClosingBalance = async (gsapi, month, appendRes) => {
    const lastAppendedCell = appendRes.data.updates.updatedRange.split(':')[1];
    const rowNumber = lastAppendedCell.replace( /^\D+/g, '');

    try {
        const closingBalance = await gsapi.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: `${month}!F${rowNumber}`
        });
    
        return closingBalance.data.values[0][0];
    }
    catch(error) {
        throw new Error(error);
    }

}

module.exports = { getClosingBalance }