const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

const botRouter = require('./routes/botRouter');


// Iteration 1:
// Taking an input in the format: item\n(+/-)value\n(Exp/Inv/Cr/Sal/Bill)

// TODO:
// 1. Get all the sheets
// 2. Check if it exists, if it does, then update the value
// 3. If it doesn't, then duplicate from the template
// 4. Update the value
// 5. Also, add formulas in the requests below

app.use(`/${process.env.BOT_TOKEN}`, botRouter);

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
});