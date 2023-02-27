const dotenv = require('dotenv'); // need to import
const line = require('@line/bot-sdk');
const express = require('express');
const app = express();
const port = 3000;

dotenv.config();
const lineConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(lineConfig);

app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
    try {
        const events = req.body.events;
        console.log(events);
        res.status(200).end();
        return await events.map(item => handleEvent(item));
    } catch (error) {
        res.status(500).end();
    }
});

const handleEvent = async (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return null;
    } else if (event.type === 'message') {
        return client.replyMessage(event.replyToken, {type: 'text', text: 'Test'});
    }
}

    
// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.

// app.listen(port, function () {
//     console.log(`Example app listening on port ${port}!`);
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});