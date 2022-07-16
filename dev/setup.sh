#!/bin/bash

osascript -e 'tell app "Terminal"
    do script "cd ~/Documents/Projects_Or_Trials/TelegramBot && nodemon ./api/index.js"
    do script "ngrok http 8080"
    do script "cd ~/Documents/Projects_Or_Trials/TelegramBot && node ./dev/setup.js"
end tell'