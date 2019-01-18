const Discord = require('discord.js');
//const Music = require('discord.js-musicbot-addon');
const client = new Discord.Client();
var listsv = [];

client.on('ready', () => {
  console.log('I am ready!');
  client.user.setUsername("MD-Team");
});

client.on('guildMemberAdd', member => {
  var role = member.guild.roles().find("name","Wait to approval");
  member.addRole(role);
  message.channel.send("Berhba bik f group MD-Team");
})

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
  /*
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
  }*/ 
  if(message.content.toLowerCase().indexOf("???") >= 0){
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

  if(message.content.toLowerCase().indexOf("chriff") >= 0){
    message.channel.send({files: [
      {
        attachment: 'images/chriff.png',
        name: "chriff.png"
      }
    ]});
  }

  if (message.content.startsWith('?calu')) {
    var math = message.content.split(" ")[1];
    message.channel.send(eval(math));
  }

  if (message.content.startsWith("uhmadi")) {
    var VC = message.member.voiceChannel;
    if (VC)
    {
      VC.join().then(connection => {
          const dispatcher = connection.playFile('./audio/hmadi.ogg', { type: 'ogg/opus' });
          dispatcher.on(
            'end', end => {VC.leave();}
          );
      }).catch(console.error);      
    }
    else
    message.channel.send('You must be in a Voice Channel ');
  }

  if (message.content.startsWith("u55")) {
    var VC = message.member.voiceChannel;
    if (VC)
    {
      VC.join().then(connection => {
          const dispatcher = connection.playFile('./audio/55.ogg', { type: 'ogg/opus' });
          dispatcher.on(
            'end', end => {VC.leave();}
          );
      }).catch(console.error);      
    }
    else
    message.channel.send('You must be in a Voice Channel ');
  }


  if (message.content.startsWith("uvitesse")) {

    var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply('You must be in a Voice Channel!');
    }
    voiceChannel.join().then(connection => {
      //const dispatcher = connection.play("https://raw.githubusercontent.com/hunter-and1/troll-bot/master/audio/vitesse.ogg", { type: 'ogg/opus' });
      const dispatcher = connection.playFile("./audio/vitesse.ogg", { type: 'ogg/opus' });
      //dispatcher.setVolume(1);
      dispatcher.on("end", end => {
        voiceChannel.leave();
      });
    }).catch(err => console.log(err));

    /*
    var VC = message.member.voiceChannel;
    if (VC)
    {
      VC.join().then(connection => {
          const dispatcher = connection.playFile('./audio/vitesse.ogg');
          dispatcher.on(
            'start', start => {connection.player.streamingData.pausedTime = 0;},
            'end', end => {VC.leave();}
          );
      }).catch(console.error);      
    }
    else
    message.channel.send('You must be in a Voice Channel ');*/
  }


  if (message.content.startsWith("u3lachtkdb")) {
    var VC = message.member.voiceChannel;
    if (VC)
    {
      VC.join().then(connection => {
          const dispatcher = connection.playFile('./audio/3lachtkdb.ogg', { type: 'ogg/opus' });
          dispatcher.on(
            'end', end => {VC.leave();}
          );
      }).catch(console.error);      
    }
    else
    message.channel.send('You must be in a Voice Channel ');
  }


  if (message.content.startsWith("utisa3")) {
    var VC = message.member.voiceChannel;
    if (VC)
    {
      VC.join().then(connection => {
          const dispatcher = connection.playFile('./audio/tisa3.ogg', { type: 'ogg/opus' });
          dispatcher.on(
            'end', end => {VC.leave();}
          );
      }).catch(console.error);      
    }
    else
    message.channel.send('You must be in a Voice Channel ');
  }


  if (message.content.startsWith("usaricool")) {
    var VC = message.member.voiceChannel;
    if (VC)
    {
      VC.join().then(connection => {
          const dispatcher = connection.playFile('./audio/saricoll.ogg', { type: 'ogg/opus' });
          dispatcher.on(
            'end', end => {VC.leave();}
          );
      }).catch(console.error);      
    }
    else
    message.channel.send('You must be in a Voice Channel ');
  }


  if(message.content.toLowerCase().indexOf("chkon amazighi") >= 0){
    message.channel.send('houa chriff');
  }

if (message.content === "listemojis") {
   const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name).join('\n');
   message.channel.send(emojiList);
}

  //?vote @dfsdfsd @sdfsdfsd
  if (message.content.startsWith('?vote')) {
    var txt = message.content.replace('?vote','').trim();
    message.channel.send("Vote :\n ***"+txt+"***")
      .then(function (message) {
        message.react(":yes:")
        message.react(":no:")
      });
  }

  /*
  if (message.content.startsWith('?ping')) {
      message.channel.send({embed: {
          color: 0x2ed32e,
          fields: [{
              name: "Pong",
              value: "My Ping: " + Math.round(client.ping) + ' ms'
          }],
      }
    })
  }*/

  if(message.content.toLowerCase().indexOf("discord.gg") >= 0){
    message.delete(1000)
    message.reply('Invalid command , you don\'t have permission for share your server discord.');
  }

  // message.member.hasPermission("MANAGE_ROLES")
});

client.login(process.env.BOT_TOKEN);