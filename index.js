require('dotenv').config({path: '.env'})
const { Client, Intents} = require("discord.js");
const axios = require('axios');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

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

client.on('message', async (msg) => {

  switch(msg.content) {
    case 'ping':
      msg.reply("pong")
      break;
    case 'dimka':
      msg.reply("is God")
      break;
    case 'bizya':
      msg.reply("MMO")
      break;
    case 'danila':
      msg.reply("tanki")
      break;
    case '!meme':
      msg.channel.send('Here is your Meme!')
      const img = await getMeme()
      msg.channel.send(img)
      break;
  }

})

const getMeme = async () => {
  const res = await axios.request(options);
  return res.data.url;
} 

client.login(process.env.TOKEN)