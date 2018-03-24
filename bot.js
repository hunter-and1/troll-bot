const Discord = require('discord.js');
const client = new Discord.Client();
var listsv = [];

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {

     if (message.content.startsWith('?say')) {
        message.channel.send('/tts '+message.content.replace('?say','')); 
         return;
  	}
    
    if (message.content.startsWith('?add')) {
        var messagesplit = message.content.split(" ");
        listsv.push(messagesplit[1]);

  	}
    
    if (message.content.startsWith('?sv')) {
        var textreplay = "";
        for (var i = 1; i <= listsv.length; i++){
            textreplay += i+' - '+listsv[i-1]+'\n';
        }
        message.channel.send(textreplay);
        
  	}
    
   if (message.content.startsWith("?clear")) {
       listsv = [];
     }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
