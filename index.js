require('dotenv').config({path: '.env'})
const { Client, Intents} = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
  else if (msg.content === "dimka") {
      msg.reply("is God")
  }
  else if (msg.content === "bizya") {
    msg.reply("MMO")
    }
    else if (msg.content === "danila") {
        msg.reply("tanki")
    }
})


client.login(process.env.TOKEN)