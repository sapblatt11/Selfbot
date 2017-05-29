/* eslint-disable no-console, eslint-disable no-eval, eslint-disable camel-case, eslint-disable no-useless-concat */
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const moment = require('moment');
const Time = moment().format('MMM D| h:mm:ss | ');

const chalk = require('chalk');
const lmgtfy = require('lmgtfy');

const urban = require('relevant-urban');


const tflip = {
  title: 'Coin Flipped',
  description: 'It\'s Tails',
  color: 15467544,
  thumbnail: {
    url: 'http://i.imgur.com/HHrAxbH.png'
  }
};
const ctflip = {
  title: 'Coin Flipped',
  description: 'It\'s Heads',
  color: 3700184,
  thumbnail: {
    url: 'http://i.imgur.com/tXZhmts.pngg'
  }
};

client.login(config.token);

client.on('ready', () => {
  console.log(chalk.cyan(Time + chalk.green('Selfbot is Online')));
});
client.on('message', message => {


  function getRandomInt() {
    return Math.round(Math.random());
  }
  if (message.content === config.prefix + 'coinflip') {
    getRandomInt();
    if (getRandomInt(1)) {
      message.channel.send({embed: ctflip});
    } else {
      message.channel.send({embed: tflip});
    }
  }
  const duration = moment(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
  if (message.content === config.prefix + 'stat') {
    message.edit(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${Discord.version}`);
    console.log(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${Discord.version}`);
  }

  if (message.content === config.prefix + 'cmd') { // Do Later <<<<<<<<<<<
    if (message.channel.type === 'text') {
      message.delete();
      client.users.get('277544762326777874').send('help');
      console.log(chalk.yellow(Time) + chalk.green('Exec\'d Cmd'));
    }
  }
  if (message.content.startsWith(config.prefix + 'urban')) {
    let args = message.content.split(' ').slice(1);
    let pop = args.join(' ');
    let op = urban(pop).then(m => {
      const embed = {
        title: pop,
        description: '```css\n' + m.definition + '```',
        color: 8624466
      };
      message.channel.send({embed});
      console.log(chalk.yellow(Time) + chalk.green('Found ' + Number(chalk.magenta(args)) + 'in Urban Dict.'));
    });
  }
  if (message.content === config.prefix + 'tflip') {
    message.channel.send(' (╯°□°）╯︵ ┻━┻');
    console.log(chalk.yellow(Time) + chalk.green('Exec\'d tFlip'));
  }
  if (message.content === config.prefix + 'ping') {
    message.delete();
    message.channel.send('Pinging...').then(sent => {
      sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms (${(sent.createdTimestamp - message.createdTimestamp) * 0.001}s)`);
      console.log(chalk.yellow(Time) + chalk.green('Ping\'d'));
    });
  }
  if (message.content.startsWith(config.prefix + 'lmgtfy')) {
    let args = message.content.split(' ').slice(1);
    let pop = args.join(' ');
    let op = lmgtfy(pop);

    message.channel.send(op);
    console.log(chalk.yellow(Time) + chalk.green('Exec\'d lmgtfy (' + chalk.magenta(pop) + ')'));
  }

    /* Prune Delete */
  const params = message.content.split(' ').slice(1); // Add Permissions <<<<<<<<<<<<<<<
  if (message.content.startsWith('>prune')) {
    // get number of messages to prune
    let messagecount = parseInt(params[0]);
    // get the channel logs
    message.channel.fetchMessages({
      limit: 100
    })
      .then(messages => {
        let msg_array = messages.array();
        // filter the message to only your own
        msg_array = msg_array.filter(m => m.author.id === client.user.id);
        // limit to the requested number + 1 for the command message
        msg_array.length = messagecount + 1;
        // Has to delete messages individually. Cannot use `deleteMessages()` on selfbots.
        msg_array.map(m => m.delete().catch(console.error));
        console.log(chalk.yellow(Time) + chalk.green('Prune\'d ' + chalk.magenta(params)));
      });
  }
});
