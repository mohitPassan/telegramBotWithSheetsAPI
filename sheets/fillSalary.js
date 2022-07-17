const moment = require('moment');

const getSalary = async (gsapi) => {
    const month = moment().format("MMMM");
    try {
        const res = await gsapi.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: `${month}!I3`,
        });

        const values = res.data.values;

        if (!values) {
            return 0;
        } else {
            const salaryFromSheet = values[0][0];
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
        const finalSalary = parseInt(salary) + parseInt(initialSalary);

        await setSalary(gsapi, finalSalary);
    } catch (err) {
        throw new Error(`Error in fillSalary.js: ${err}`);
    }
};

module.exports = { fillSalary };
