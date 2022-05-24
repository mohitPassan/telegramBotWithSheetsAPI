// const express = require('express');
// const app = express();
const dotenv = require('dotenv');

dotenv.config();

const { connectToSheets } = require('../sheets/connection');
const { sendMessage } = require('../telegram/sendMessage');
const { addExpense } = require('../sheets/addExpense');

// app.use(express.json());

const gs = connectToSheets();

module.export = async (req, res) => {
    let text = "";

    if (req.body.hasOwnProperty('message')) {
        text = req.body.message.text;
    } else if (req.body.hasOwnProperty('edited_message')) {
        text = req.body.edited_message.text;
    } else {
        sendMessage("I'm sorry, I didn't understand that.");
        return res.sendStatus(200);
    }

    const [item, value, type] = text.split('\n');

    if (!item || !value || !type) {
        sendMessage("There was some error. Please try again.\n\nThe format should be: \nItem\n(+/-)value\n(Exp/Inv/Cr/Sal/Bill)")
        return res.sendStatus(200);
    }

    if (value[0] !== '+' && value[0] !== '-') {
        sendMessage("Value should start with + or -");
        return res.sendStatus(200);
    }

    if (type !== 'Exp' && type !== 'Inv' && type !== 'Cr' && type !== 'Sal' && type !== 'Bill') {
        sendMessage("Type should be Exp, Inv, Cr, Sal or Bill");
        return res.sendStatus(200);
    }

    await addExpense(gs, item, value, type);
    res.send('ok');
}