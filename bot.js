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
    message.channel.send("ᴹᴰ✮"+message.author.username);
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
    
  if(message.content.toLowerCase().indexOf("dab") >= 0){
    message.channel.send({files: [
      {
        attachment: 'images/DAB.jpeg',
        name: "DAB.jpeg"
      }
    ]});
  }
  if(message.content.toLowerCase().indexOf("ree") >= 0){
    message.channel.send({files: [
      {
        attachment: 'images/REE.gif',
        name: "REE.gif"
      }
    ]});
  }
  if(message.content.toLowerCase().indexOf("??") >= 0){
    message.channel.send({files: [
      {
        attachment: 'images/WHAT.png',
        name: "WHAT.PNG"
      }
    ]});
  }
  if(message.content.toLowerCase().indexOf("oof") >= 0){
    message.channel.send({files: [
      {
        attachment: 'images/OOF.png',
        name: "OOF.png"
      }
    ]});
  }
  if(message.content.toLowerCase().indexOf("yeet") >= 0){
    message.channel.send({files: [
      {
        attachment: 'images/YEET.png',
        name: "YEET.png"
      }
    ]});
  }

  if(message.content.toLowerCase().indexOf("i mean") >= 0){
    message.channel.send({files: [
      {
        attachment: 'images/MEAN.png',
        name: "MEAN.png"
      }
    ]});
  }

  if (message.content.startsWith('?calu')) {
    var math = message.content.split(" ")[1];
    message.channel.send(eval(math));
  }

  if(message.content.toLowerCase().indexOf("chkon amazighi") >= 0){
    message.channel.send('akbar noob 3rfato bachariya :D dab');
  }
  //if (message.content.startsWith('?fight')) {
  //  user1 = message.content.split("@")[1].split(" ")[0];
  //  user2 = message.content.split("@")[2].split(" ")[0];
  //  message.channel.send(client.users.get(user1).username+' VS '+client.users.get(user2).username);
  //}
    

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
