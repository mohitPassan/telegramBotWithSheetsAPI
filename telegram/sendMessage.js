const axios = require("axios");

const sendMessage = (text) => {
    const encodedText = encodeURIComponent(text);
    axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${encodedText}`);
}

module.exports = {
    sendMessage
}