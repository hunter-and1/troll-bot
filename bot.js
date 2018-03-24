const Discord = require('discord.js');
const client = new Discord.Client();
var listsv = [];

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
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
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('⚠ | **لا يوجد لديك صلاحية لمسح الشات**');
        var msg;
        msg = parseInt();
      
      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "Done | تــم مسح الشات",
        color: 0x06DF00,
        description: "تم مسح الرسائل "
      }}).then(msg => {msg.delete(3000)});
     }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
