const Discord = require('discord.js');
const client = new Discord.Client();
var listsv = [];

client.on('ready', () => {
  console.log('I am ready!');
  client.user.setUsername("MD-Team");
});

client.on('message', message => {

  //if (message.content.startsWith('?say')) {
    //message.channel.send(message.content.replace('?say',''), {tts: true});
  //}
    
  if (message.content.startsWith('?clan')) {
    message.channel.send("˜͙ᴹᴰ྅ཱི"+message.author.username);
  }
    
  if (message.content.startsWith('?add')) {
    var messagesplit = message.content.split(" ");
    listsv.push(messagesplit[1]);
	}
    
  if (message.content.startsWith('?sv')) {
    var textreplay = "";
    for (var i = 1; i <= listsv.length; i++)
      textreplay += i+' - '+listsv[i-1]+'\n';
    
    message.channel.send(textreplay);
  }

  if (message.content.startsWith("?clear")) {
    listsv = [];
  }

  if (message.content.startsWith('?tfari9a')) {
    if(Math.round(Math.random()))
    {
      message.channel.send("Njma", {
        file: "https://i.imgur.com/TFCW1IG.png"
      });
    }
    else{
      message.channel.send("Ras", {
        file: "https://i.imgur.com/BVwKciA.png"
      });      
    }
  }
    

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
