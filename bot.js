const Discord = require('discord.js');
const client = new Discord.Client();
var listsv = [];

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content.startsWith('&addSV')) {
        var messagesplit = message.content.split(" ");
        listsv.push(messagesplit[0]);
        return;
  	}
    
    if (message.content.startsWith('&getSV')) {
        message.reply(listsv[1]);
        return;
  	}
    
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
