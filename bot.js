const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
const moment = require('moment')
  const Time = moment().format('M Do| h:mm:ss | ');

client.login(config.token);

client.on('ready',() =>{
          console.log (Time + 'Selfbot is Online')
          });
client.on('message', message => {
  if(message.author !== client.user) return;
    
    let prefix='.';
    
    if (!message.content.startsWith(prefix)) return;

});
