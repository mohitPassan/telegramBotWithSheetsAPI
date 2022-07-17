const express = require("express");
const router = express.Router();

const {
    connectToSheets,
    sendMessage,
    addExpense,
    getStatistics,
    fillSalary,
} = require("../sheets");

const gs = connectToSheets();

router.get("/", (req, res) => {
    res.json({
        message: "Hello world!",
    });
});

router.post("/", async (req, res) => {
    let text = "";

    if (req.body.hasOwnProperty("message")) {
        text = req.body.message.text;
    } else if (req.body.hasOwnProperty("edited_message")) {
        text = req.body.edited_message.text;
    } else {
        try {
            await sendMessage("I'm sorry, I didn't understand that.");
        } catch (err) {
            console.log("Error sending message: ", err);
        }
        return res.sendStatus(200);
    }

    const entities = req.body.message.entities;

    if (entities && entities[0].type === "bot_command") {
        if (text === "/statistics") {
            try {
                const finalText = await getStatistics(gs);
                await sendMessage(finalText, "HTML");
            } catch (err) {
                console.log("Error sending message: ", err);
            }
            return res.sendStatus(200);
        } else {
            try {
                await sendMessage(
                    "Command not found. Please check for any spelling mistakes"
                );
            } catch (err) {
                console.log("Error sending message: ", err);
            }
            return res.sendStatus(200);
        }
    }

    const [item, value, type] = text.split("\n");

    if (!item || !value || !type) {
        try {
            await sendMessage(
                "There was some error. Please try again.\n\nThe format should be: \nItem\n(+/-)value\n(Exp/Inv/Cr/Sal/Bill)"
            );
        } catch (err) {
            console.log("Error sending message: ", err);
        }
        return res.sendStatus(200);
    }

    if (value[0] !== "+" && value[0] !== "-") {
        try {
            await sendMessage("Value should start with + or -");
        } catch (err) {
            console.log("Error sending message: ", err);
        }
        return res.sendStatus(200);
    }

    if (
        type !== "Exp" &&
        type !== "Inv" &&
        type !== "Cr" &&
        type !== "Sal" &&
        type !== "Bill"
    ) {
        try {
            await sendMessage("Type should be Exp, Inv, Cr, Sal or Bill");
        } catch (err) {
            console.log("Error sending message: ", err);
        }
        return res.sendStatus(200);
    }

    if (type === "Sal") {
        console.log("Putting salary");
    }

    try {
        await addExpense(gs, item, value, type);
    } catch (err) {
        console.log(`Error adding expense\n${err}`);
        await sendMessage(
            `There was an error while adding expense. Please contact the developer with the following error message\n\n${err}`
        );
    }

    res.send("ok");
});

module.exports = router;
