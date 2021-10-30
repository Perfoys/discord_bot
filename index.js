const Discord = require("discord.js");
const client = new Discord.Client();

const TOKEN = OTAzOTc4OTExOTA4NjI2NDcz.YX019w.K-GeM7_abt4s96Tu3W_bWagc1cY;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
})

client.login(TOKEN)