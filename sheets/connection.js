const { google } = require('googleapis');
const keys = require('../keys.json');

const client = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null,
    process.env.PRIVATE_KEY,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize((err, tokens) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Connected to sheets');
});

const connectToSheets = () => {
    const gs = google.sheets({
        version: 'v4',
        auth: client
    });

    return gs;
}

module.exports = {
    connectToSheets,
    client
}