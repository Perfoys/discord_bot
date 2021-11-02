require('dotenv').config({path: '.env'})
const { Client, Intents} = require("discord.js");
const axios = require('axios');
const {execute, skip, stop} = require('./yt-actions');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const PREFIX = process.env.PREFIX;
const queue = new Map();

const options = {
  method: 'GET',
  url: 'https://humor-jokes-and-memes.p.rapidapi.com/memes/random',
  params: {
    'api-key': process.env.API_MEME_KEY,
    number: '3',
    'media-type': 'image',
    'keywords-in-image': 'true',
    'min-rating': '7'
  },
  headers: {
    'x-rapidapi-host': 'humor-jokes-and-memes.p.rapidapi.com',
    'x-rapidapi-key': process.env.RAPID_KEY
  }
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const serverQueue = queue.get(message.guildId)

  switch(message.content) {
    case `ping`:
      message.reply(`pong`)
      break;
    case `dimka`:
      message.reply(`is God`)
      break;
    case `bizya`:
      message.reply(`MMO`)
      break;
    case `danila`:
      message.reply(`tanki`)
      break;
    case `${PREFIX}meme`:
      message.channel.send('Here is your Meme!')
      const img = await getMeme()
      message.channel.send(img)
      break;
  }

  if (message.content.startsWith(`${PREFIX}play`)) {
    execute(message, serverQueue, queue);
    return;
  } else if (message.content.startsWith(`${PREFIX}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${PREFIX}stop`)) {
    stop(message, serverQueue);
    return;
  } else {
    message.channel.send("You need to enter a valid command!");
  }
})

const getMeme = async () => {
  const res = await axios.request(options);
  return res.data.url;
} 

client.login(process.env.TOKEN)