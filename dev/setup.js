const express = require('express');
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const setup = async () => {
    console.log("Setting up webhook");
    try {
        const res = await axios.get("http://localhost:4040/api/tunnels");
        const data = res.data;

        if (!data || data.tunnels.length === 0) {
            console.log("Tunnel not started. Retrying in 2 seconds");
            setTimeout(setup, 2000);
        }

        const publicUrl = data.tunnels[0].public_url;
        console.log(`Public URL is: ${publicUrl}`);
        console.log(`Bot token is: ${process.env.BOT_TOKEN}`);

        await axios.get(
            `https://api.telegram.org/bot${process.env.BOT_TOKEN}/setWebhook?url=${publicUrl}/api/${process.env.BOT_TOKEN}`
        );
        console.log("Webhook is set successfully");
    } catch (error) {
        console.log(`Error in setup.js: ${error}`);
    }
};

setup();

const app = express();

app.listen(3001, () => {
    console.log("You can start development")
});


process.on("SIGINT", async function () {
    const appURL = "https://telegram-bot-with-sheets-api.vercel.app";
    await axios.get(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/setWebhook?url=${appURL}/api/${process.env.BOT_TOKEN}`
    );
    console.log("\nProduction webhook set. Exiting app.");
    process.exit();
});
