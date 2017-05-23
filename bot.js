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
    /* START Eval Command*/
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
  }
    /*END Eval Command*/
  let prefix = '.'; // zalways use a prefix it's good practice.
});

