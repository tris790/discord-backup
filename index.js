const fs = require("fs");
const Eris = require("eris");

const discord_token = ""; 
const discord_channel_id = "";

var bot = new Eris(discord_token);

const max_limit = 100000;
const channel_id = discord_channel_id;
bot.on("ready", async () => {
    console.log(`Bot is fetching messages from channel #${channel_id}`);
    let msgs = (await bot.getMessages(channel_id, { limit: max_limit })).map(x => {return {c: x.content, d: new Date(x.timestamp)}});
    console.log(`Archiving ${msgs.length} messages`);

    fs.writeFile(`discord-${channel_id}.json`, JSON.stringify(msgs), function (err) {
        if (err) throw err;
        console.log('Archive has been created');
    });

    bot.disconnect();
});

bot.on("error", (err) => {
    console.error(err);
});

bot.connect();
