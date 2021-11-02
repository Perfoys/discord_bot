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

client.on('interactionCreate', async (interection) => {
  if(!interection.isCommand()) return;
  
  const serverQueue = queue.get(interection.guildId)

  switch(interection.commandName) {
    case `ping`:
      interection.reply(`pong`)
      break;
    case `dimka`:
      interection.reply(`is God`)
      break;
    case `bizya`:
      interection.reply(`MMO`)
      break;
    case `danila`:
      interection.reply(`tanki`)
      break;
    case `${PREFIX}meme`:
      interection.channel.send('Here is your Meme!')
      const img = await getMeme()
      interection.channel.send(img)
      break;
    case `${PREFIX}play`:
      execute(message, serverQueue);
      break;
    case `${PREFIX}skip`:
      skip(message, serverQueue);
    case `${PREFIX}stop`:
      stop(message, serverQueue);
    default: 
      interection.channel.send('You need to enter a valid command!')
  }

})

const getMeme = async () => {
  const res = await axios.request(options);
  return res.data.url;
} 

client.login(process.env.TOKEN)