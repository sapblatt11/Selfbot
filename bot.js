const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const moment = require('moment');
const Time = moment().format('M Do| h:mm:ss | ');


const num = parseInt(message.content.split(' ')[1]);
const rand = Math.floor(Math.random()*num);
client.login(config.token);

client.on('ready', () => {
  console.log(Time + 'Selfbot is Online');
});
client.on('message', message => {
  if (message.author !== client.user) {
    return;
  }

  let prefix = '.';

  if (!message.content.startsWith(prefix)) {
    return;
    if(message.content === prefix + "rng"){
      message.content.split(' ')[1] // => "56"
      client.msg.reply (rand);
  }
  }});
