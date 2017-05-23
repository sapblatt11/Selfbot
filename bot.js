/* eslint-disable no-console, eslint-disable no-eval */
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const moment = require('moment');
const Time = moment().format('M Do| h:mm:ss | ');

const clean = text => {
  if (typeof (text) === 'string') {
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
  }
  return text;
};

client.login(config.token);

client.on('ready', () => {
  console.log(Time + 'Selfbot is Online');
  client.user.setGame('with codez');
});
client.on('message', message => {
  if (message.author.id !== client.user.id) { /* Only my usage */
    return;
  }
  if (message.content === '.cmd') {
    if (message.channel.type === 'text') {
      message.delete();
      client.users.get('277544762326777874').send('help');
    }
  }
  if (message.content === '.tflip') {
    message.edit(' (╯°□°）╯︵ ┻━┻');
  }

    /* START Eval Command */
  const args = message.content.split(' ').slice(1);

  if (message.content.startsWith('.eval')) {
    try {
      const code = args.join(' ');
      let evaled = eval(code);

      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(evaled);
      }

      message.edit('Input :envelope_with_arrow: :\n' + '```js\n' + code + '```' + '\n\n' + 'Output: :mailbox_with_no_mail: \n' + '```fix\n' + clean(evaled) + '```');
    } catch (err) {
      message.edit(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }  /* END Eval Command */
    /* Text Formatter Stolen From https://github.com/Nyxiis/selfbot/blob/master/index.js */
    /* SpongeBob Mock Below */
  if (message.content.startsWith('.l ')) { /* SpongeBob Mock */
    upper(message, message.content.split(' ').slice(1).join(' '));
  }

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
});
