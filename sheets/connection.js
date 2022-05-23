const { google } = require('googleapis');
const keys = require('../api/keys.json');

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
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