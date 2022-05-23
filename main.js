const { google } = require('googleapis');
const keys = require('./keys.json');

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

    gsrun();
});

const gsrun = async () => {
    const gsapi = google.sheets({
        version: 'v4',
        auth: client
    });

    const res = await gsapi.spreadsheets.get({
        spreadsheetId: '1ZLgAVOKWSNj931faJ9EiNo1ixP6WvyOtjWur6fM1VS0',
        ranges: [],
        includeGridData: false,
        auth: client
    });

    console.log(res.data.sheets);
}