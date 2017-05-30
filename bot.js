/* eslint-disable no-console, eslint-disable no-eval, eslint-disable camelcase, eslint-disable no-useless-concat */
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const moment = require('moment');
const Time = moment().format('MMM D| h:mm:ss | ');


const chalk = require('chalk');
const lmgtfy = require('lmgtfy');

const sql = require('sqlite');
sql.open('./mlog.sqlite');

const urban = require('relevant-urban');

const clean = text => {
  if (typeof (text) === 'string') {
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
  }
  return text;
};

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
     if (message.guild.id === "222078108977594368"){
        if (message.content.includes('help')){
            if (!message.guild.id === '222078108977594368') return;

      sql.run('INSERT INTO mlog (userId, content, name) VALUES (?, ?, ?)', [message.author.id, message.content, message.author.username]);
      console.log((chalk.yellow(Time)) + 'Inserted User Added')
 /*.catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS mlog (userId TEXT, content TEXT, name TEXT)').then(() => {
      console.log((chalk.yellow(Time)) +'Made Table');
      sql.run('INSERT INTO mlog (userId, content, name) VALUES (?, ?, ?)', [message.author.id, message.content, message.author.username]);
        
    });
  });*/
    }
}

  if (message.author.id !== client.user.id) { /* Only my usage */
    return;
  }
  function getRandomInt() {
    return Math.round(Math.random());
  }

  if (message.content === '>coinflip') {
    getRandomInt();
    if (getRandomInt(1)) {
      message.edit({embed: ctflip});
    } else {
      message.edit({embed: tflip});
    }
  }
  const duration = moment(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
  if (message.content === '>stat') {
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
    
  if (message.content === '>help count') {
                                                         
      let hcount = sql.get('SELECT Count(*) FROM mlog').then(r =>{
    hcount = r; 
          console.log(r);
     
      message.edit('Help has been said ' + r['Count(*)'] + ' times since 5/29/2017');
  })};
  if (message.content === '>cmd') {
    if (message.channel.type === 'text') {
      message.delete();
      client.users.get('277544762326777874').send('help');
      console.log(chalk.yellow(Time) + chalk.green('Exec\'d Cmd'));
    }
  }
  if (message.content.startsWith('>urban')) {
    let args = message.content.split(' ').slice(1);
    let pop = args.join(' ');
    let op = urban(pop).then(m => {
      const embed = {
        title: pop,
        description: '```css\n' + m.definition + '```',
        color: 8624466
      };
      message.edit({embed});
      console.log(chalk.yellow(Time) + chalk.green('Found ' + Number(chalk.magenta(args)) + 'in Urban Dict.'));
    });
  }
  if (message.content === '>tflip') {
    message.edit(' (╯°□°）╯︵ ┻━┻');
    console.log(chalk.yellow(Time) + chalk.green('Exec\'d tFlip'));
  }
  if (message.content === '>ping') {
    message.delete();
    message.channel.send('Pinging...').then(sent => {
      sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms (${(sent.createdTimestamp - message.createdTimestamp) * 0.001}s)`);
      console.log(chalk.yellow(Time) + chalk.green('Ping\'d'));
    });
  }
  if (message.content.startsWith('>lmgtfy')) {
    let args = message.content.split(' ').slice(1);
    let pop = args.join(' ');
    let op = lmgtfy(pop);

    message.edit(op);
    console.log(chalk.yellow(Time) + chalk.green('Exec\'d lmgtfy (' + chalk.magenta(pop) + ')'));
  }
    /* START Eval Command */
  const args = message.content.split(' ').slice(1);

  if (message.content.startsWith('>eval')) {
    try {
      const code = args.join(' ');
      let evaled = eval(code);

      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(evaled);
      }

      message.edit('Input :envelope_with_arrow: :\n' + '```js\n' + code + '```' + '\n\n' + 'Output: :mailbox_with_no_mail: \n' + '```fix\n' + clean(evaled) + '```');
      console.log(chalk.yellow(Time) + chalk.green('Eval\'d ' + chalk.magenta(code)));
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }  /* END Eval Command */
    /* Text Formatter Stolen From https://github.com/Nyxiis/selfbot/blob/master/index.js */
    /* SpongeBob Mock Below */
  if (message.content.startsWith('>leet ')) { /* SpongeBob Mock */
    upper(message, message.content.split(' ').slice(1).join(' '));
    console.log(chalk.yellow(Time) + chalk.green('Exectued Meme Text'));
  }
    /* Prune Delete */
  const params = message.content.split(' ').slice(1);
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

function upper(message, suffix) {
  suffix = suffix.toLowerCase();
  suffix = suffix.split('');

  var on = 1;

  var i = 0;

  for (i = 0; i <= suffix.length - 1; i++) {
    if (on == 1 && suffix[i] != ' ') {
      suffix[i] = suffix[i].toLowerCase();
      on = 2;
    } else if (on == 2 && suffix[i] != ' ') {
      suffix[i] = suffix[i].toUpperCase();
      on = 1;
    }

    if (i == suffix.length - 1) {
      message.delete();
      message.channel.send(suffix.join(''));
    }
  }
}
