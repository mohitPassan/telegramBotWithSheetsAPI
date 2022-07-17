const getSalary = async (gsapi) => {
    try {
        const res = await gsapi.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: `${month}!I3`,
        });

        const salaryFromSheet = res.data.values;

        if (!salaryFromSheet) {
            return 0;
        } else {
            let numberPattern = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
            const salaryNumber = salaryFromSheet.match(numberPattern).join("");

            return salaryNumber;
        }
    } catch (err) {
        throw new Error(`Error in getSalary: ${err}`);
    }
};

const setSalary = async (gsapi, finalSalary) => {
    const month = moment().format("MMMM");
    const valuesToSet = [[finalSalary]];
    try {
        await gsapi.spreadsheets.values.update({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: `${month}!I3`,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: valuesToSet,
            },
        });
    } catch (err) {
        throw new Error(`Error in setSalary: ${err}`);
    }
};

const fillSalary = async (gsapi, salary) => {
    try {
        const initialSalary = await getSalary(gsapi);
        const finalSalary = salary + initialSalary;

        await setSalary(gsapi, finalSalary);
    } catch (err) {
        throw new Error(`Error in fillSalary.js: ${err}`);
    }
};

module.exports = { fillSalary };
