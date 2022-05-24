const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

const botRouter = require('./_botRouter');

app.use(`/api/${process.env.BOT_TOKEN}`, botRouter);

app.get('*', (req, res) => {
    res.send({
        message: 'Welcome to the expense tracker bot',
        route: req.url
    });
})

const port = 8080;
app.listen(port, () => {
    console.log("Listening on port: ", port);
});