const axios = require("axios");

const sendMessage = async (text) => {
    const encodedText = encodeURIComponent(text);
    try {
        await axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${encodedText}`);
        console.log("Message sent: ", text);
    }
    catch (err) {
        console.log("Error sending message: ", err);
    }
}

module.exports = {
    sendMessage
}