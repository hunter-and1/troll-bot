const Discord = require('discord.js');
const client = new Discord.Client();
var listsv = [];

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content.startsWith('&addSV')) {
        var messagesplit = message.content.split(" ");
        listsv.push(messagesplit[1]);
  	}
    
    if (message.content.startsWith('&getSV')) {
        message.channel.send(listsv.toString());
  	}
    
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
