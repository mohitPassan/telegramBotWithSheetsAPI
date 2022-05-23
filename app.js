const express = require('express');
const app = express();
const dotenv = require('dotenv');

const { connectToSheets } = require('./sheets/connection');
const { sendMessage } = require('./telegram/sendMessage');
const { addExpense } = require('./sheets/addExpense');

dotenv.config();

app.use(express.json());

// Iteration 1:
// Taking an input in the format: item\n(+/-)value\n(Exp/Inv/Cr/Sal/Bill)

// TODO:
// 1. Get all the sheets
// 2. Check if it exists, if it does, then update the value
// 3. If it doesn't, then duplicate from the template
// 4. Update the value
// 5. Also, add formulas in the requests below

const gs = connectToSheets();

app.post(`/${process.env.BOT_TOKEN}`, async (req, res) => {
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
})

// Iteration 2:
// Starting the process using a bot command and then taking the input from the user one by one
// app.post(`/${process.env.BOT_TOKEN}`, (req, res) => {
//     const { message } = req.body;

//     if (message.hasOwnProperty('entities')) {
//         const { entities } = message;
//         if (entities[0].type === 'bot_command') {
//             if (message.text === '/new') {
//                 const text = "No command found";
//                 axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=1539343567&text=${text}`);
//                 res.send('ok');
//                 res.send('ok');
//             }
//             else {
//                 const text = "No command found";
//                 axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=1539343567&text=${text}`);
//                 res.send('ok');
//             }
//         }
//     }
//     else {
//         const text = "Hi there, to add a new expense, type /new";
//         axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=1539343567&text=${text}`);
//         res.send('ok');
//     }
// })

const port = 8080;
app.listen(port, () => {
    console.log("Listening on port: ", port);
})