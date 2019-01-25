const Discord = require('discord.js');
const request = require('request');
const sharp = require('sharp');
const fs = require('fs');
const client = new Discord.Client();
client.infos = require('./data.json');
client.lvl = require('./lvl.json');

var listsv = [];

client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  const channel=oldMember.guild.channels.find(ch=>ch.name==='voice-log');

  if(oldUserChannel === undefined && newUserChannel !== undefined) {
    
    console.log('User Joins a voice channel');
    console.log('----------');
    channel.send(`${newMember} joins ${newUserChannel}`);

    // save in info
    client.infos[newMember.id] = {
      timeJoin:Math.floor(Date.now() / 1000)
    }
    fs.writeFile("data.json",JSON.stringify(client.infos,null,4),err =>{
        if(err) throw err;
        console.log("save in file");
    });

  } else if(newUserChannel === undefined){

    console.log('User leaves a voice channel');
    console.log('----------');
    channel.send(`${oldMember} leaves ${oldMember.voiceChannel}`);
    
    // save in info
    var DureeInVoice = Math.floor(Date.now() / 1000) - client.infos[oldMember.id].timeJoin; // sec
    client.lvl[oldMember.id] = {
      point:parseInt(DureeInVoice/60) + parseInt((client.lvl[oldMember.id] == undefined)?0:client.lvl[oldMember.id].point)
    }
    fs.writeFile("lvl.json",JSON.stringify(client.lvl,null,4),err =>{
        if(err) throw err;
        console.log("save in file");
    });
  }
})

client.on('ready', () => {
  console.log('I am ready!');
  client.user.setUsername("MD-Gang");
});

client.on('guildMemberAdd', member => {
  if(member.user.bot)
  {
    let role = member.guild.roles.find(role => role.name === "Bots");
    member.addRole(role);
  }
  else
  {
    let role = member.guild.roles.find(role => role.name === "Wait to approval");
    member.addRole(role);
    member.guild.channels.find(channel => channel.name == "chat").send('\"'+member.user.username+'\" Berhba bik f group MD-gang');
  }
})


client.on('message', message => {
  
  if(message.author.bot) return;

  if (message.content.startsWith('?clan')) {
    message.channel.send("ᴹᴰ✮"+message.author.username);
  }

  if (message.content.startsWith('?setGame')) {
    client.user.setGame(message.content.replace('?setGame','').trim());
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

  if (message.content.startsWith("?lvl")) {
    if (client.lvl[message.author.id] == undefined) {
      message.reply(0);
    }
    else
      message.reply(client.lvl[message.author.id].point);
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
        message.react("535835129273253905")
        message.react("535835102882693153")
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

  if(message.content.toLowerCase().indexOf("?pubg-mobile-requirements") >= 0){
      var embed = new Discord.RichEmbed()
      .setTitle("Requirements")
      .setAuthor("Pubg Mobile For PC", "https://res.cloudinary.com/teepublic/image/private/s---xiJeC7t--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1535164327/production/designs/3064946_0.jpg")
      .setColor(0x5DD423)
      .addField("CPU :", "Dual core from Intel or AMD at 1.8 GHz.", true)
      .addField("GPU :", "NVIDIA GeForce 8600/9600GT, ATI/AMD Radeon HD2600/3600", true)
      .addField("Memory :","at least 3GB of RAM", true)
      .addField("OS :", "Windows 10, 8.1, 8 and 7", true)
      .addField("DirectX :", "Version 9.0c", true)
      .addField("Storage :", "2GB of free storage", true)

      message.channel.send(embed);
  }


  if(message.content.toLowerCase().indexOf("?pubg") >= 0){
    var txt = message.content.replace('?pubg','').trim().toLowerCase();
    var embed = null;
    if(txt == "shotgun")
    {
      message.channel.send({files: [{attachment: 'images/shotgun.png',name: "shotgun.PNG"}]});
    }
    else if(txt == "shotgun s686")
    {
      embed = new Discord.RichEmbed()
      .setTitle("Shotgun S686")
      .setAuthor("Pubg Weapon", "https://res.cloudinary.com/teepublic/image/private/s---xiJeC7t--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1535164327/production/designs/3064946_0.jpg")
      .setColor(0xe91818)
      .addField("Power :", "23/100", true)
      .addField("Range :", "13/100", true)
      .addField("Tier :", "C", true)
      .setThumbnail("https://d1u5p3l4wpay3k.cloudfront.net/battlegrounds_gamepedia_en/f/f2/Icon_weapon_Berreta686.png")

      message.channel.send(embed);
    }
    else if(txt == "shotgun s1897")
    {
      embed = new Discord.RichEmbed()
      .setTitle("Shotgun S1897")
      .setAuthor("Pubg Weapon", "https://res.cloudinary.com/teepublic/image/private/s---xiJeC7t--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1535164327/production/designs/3064946_0.jpg")
      .setColor(0xe91818)
      .addField("Power :", "23/100", true)
      .addField("Range :", "13/100", true)
      .addField("Tier :", "D", true)
      .setThumbnail("https://d1u5p3l4wpay3k.cloudfront.net/battlegrounds_gamepedia_en/3/35/Icon_weapon_Winchester.png")

      message.channel.send(embed);
    }
    else if(txt == "shotgun s12k")
    {
      embed = new Discord.RichEmbed()
      .setTitle("Shotgun S12K")
      .setAuthor("Pubg Weapon", "https://res.cloudinary.com/teepublic/image/private/s---xiJeC7t--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1535164327/production/designs/3064946_0.jpg")
      .setColor(0xe91818)
      .addField("Power :", "20/100", true)
      .addField("Range :", "9/100", true)
      .addField("Tier :", "C", true)
      .setThumbnail("https://d1u5p3l4wpay3k.cloudfront.net/battlegrounds_gamepedia_en/f/f9/Icon_weapon_Saiga12.png")
      message.channel.send(embed);
    }
    else if(txt == "assault-rifle")
    {
      message.channel.send({files: [{attachment: 'images/assault-rifle.png',name: "assault-rifle.PNG"}]});
    }
    else if(txt == "assault-rifle akm")
    {
      embed = new Discord.RichEmbed()
      .setTitle("Assault Rifle AKM")
      .setAuthor("Pubg Weapon", "https://res.cloudinary.com/teepublic/image/private/s---xiJeC7t--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1535164327/production/designs/3064946_0.jpg")
      .setColor(0xe97018)
      .addField("Power :", "40/100", true)
      .addField("Range :", "60/100", true)
      .addField("Tier :", "B", true)
      .setThumbnail("https://d1u5p3l4wpay3k.cloudfront.net/battlegrounds_gamepedia_en/6/6c/AKM.png")

      message.channel.send(embed);
    }
    else if(txt == "assault-rifle m16a4")
    {
      embed = new Discord.RichEmbed()
      .setTitle("Assault Rifle M16A4")
      .setAuthor("Pubg Weapon", "https://res.cloudinary.com/teepublic/image/private/s---xiJeC7t--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1535164327/production/designs/3064946_0.jpg")
      .setColor(0xe97018)
      .addField("Power :", "42/100", true)
      .addField("Range :", "64/100", true)
      .addField("Tier :", "B", true)
      .setThumbnail("https://d1u5p3l4wpay3k.cloudfront.net/battlegrounds_gamepedia_en/c/c1/Icon_weapon_M16A4.png")

      message.channel.send(embed);
    }
    else if(txt == "assault-rifle scar-l")
    {
      embed = new Discord.RichEmbed()
      .setTitle("Assault Rifle SCAR-L")
      .setAuthor("Pubg Weapon", "https://res.cloudinary.com/teepublic/image/private/s---xiJeC7t--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1535164327/production/designs/3064946_0.jpg")
      .setColor(0xe97018)
      .addField("Power :", "42/100", true)
      .addField("Range :", "55/100", true)
      .addField("Tier :", "B", true)
      .setThumbnail("https://d1u5p3l4wpay3k.cloudfront.net/battlegrounds_gamepedia_en/2/28/Icon_weapon_SCAR-L.png")

      message.channel.send(embed);
    }
    else if(txt == "assault-rifle m416")
    {
      embed = new Discord.RichEmbed()
      .setTitle("Assault Rifle M416")
      .setAuthor("Pubg Weapon", "https://res.cloudinary.com/teepublic/image/private/s---xiJeC7t--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1535164327/production/designs/3064946_0.jpg")
      .setColor(0xe97018)
      .addField("Power :", "42/100", true)
      .addField("Range :", "56/100", true)
      .addField("Tier :", "A", true)
      .setThumbnail("https://d1u5p3l4wpay3k.cloudfront.net/battlegrounds_gamepedia_en/9/99/Icon_weapon_HK416.png")

      message.channel.send(embed);
    }
    else if(txt == "assault-rifle groza")
    {
      embed = new Discord.RichEmbed()
      .setTitle("Assault Rifle GROZA")
      .setAuthor("Pubg Weapon", "https://res.cloudinary.com/teepublic/image/private/s---xiJeC7t--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1535164327/production/designs/3064946_0.jpg")
      .setColor(0xe97018)
      .addField("Power :", "40/100", true)
      .addField("Range :", "60/100", true)
      .addField("Tier :", "S", true)
      .setThumbnail("https://d1u5p3l4wpay3k.cloudfront.net/battlegrounds_gamepedia_en/d/d3/Icon_weapon_Groza.png")

      message.channel.send(embed);
    }
    else if(txt == "assault-rifle aug-a3")
    {
      embed = new Discord.RichEmbed()
      .setTitle("Assault Rifle AUG A3")
      .setAuthor("Pubg Weapon", "https://res.cloudinary.com/teepublic/image/private/s---xiJeC7t--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1535164327/production/designs/3064946_0.jpg")
      .setColor(0xe97018)
      .addField("Power :", "42/100", true)
      .addField("Range :", "50/100", true)
      .addField("Tier :", "A", true)
      .setThumbnail("https://d1u5p3l4wpay3k.cloudfront.net/battlegrounds_gamepedia_en/e/ea/Icon_weapon_AUG_A3.png")

      message.channel.send(embed);
    }                       
    else if(txt == "sniper-rifle")
    {
      message.channel.send({files: [{attachment: 'images/sniper-rifle.png',name: "sniper-rifle.PNG"}]});
    }
    else if(txt == "marksman-rifle")
    {
      message.channel.send({files: [{attachment: 'images/marksman-rifle.png',name: "marksman-rifle.PNG"}]});
    }
    else if(txt == "sub-machine-gun")
    {
      message.channel.send({files: [{attachment: 'images/sub-machine-gun.png',name: "sub-machine-gun.PNG"}]});
    }
    else if(txt == "light-machine-gun")
    {
      message.channel.send({files: [{attachment: 'images/light-machine-gun.png',name: "light-machine-gun.PNG"}]});
    }
    else if(txt == "handgun")
    {
      message.channel.send({files: [{attachment: 'images/handgun.png',name: "handgun.PNG"}]});
    }
    else if(txt == "other")
    {
      message.channel.send({files: [{attachment: 'images/other.png',name: "other.PNG"}]});
    }
    else if(txt == "melee")
    {
      message.channel.send({files: [{attachment: 'images/melee.png',name: "melee.PNG"}]});
    }
  }

  if (message.content.startsWith("?level")) {
    if (client.lvl[message.author.id] == undefined) {
      message.channel.send("not found");
    }
    else{
      const UserTag = (message.content === "?level")? message.author:message.mentions.users.first();
      const url = UserTag.displayAvatarURL;
      const watermarkText = myDataExp(UserTag.id);
      request({url,encoding: null}, function(error, response, body) {
        if(!error) {
        sharp.cache(false);
          sharp(body).resize(70,70).toFile('lvl/profile_'+UserTag.id+'.png').then(function(){
          sharp('lvl/bg1.png')
          .overlayWith('lvl/profile_'+UserTag.id+'.png',{top:44+8, left:59})
          .toFile('lvl/output.png').then(function(){
            sharp('lvl/output.png')
            .overlayWith('lvl/l'+watermarkText.level+'.png',{top:8, left:15})
            .toFile('lvl/output2.png').then(function(){
              const textedSVG = new Buffer(`<svg width="183" height="70">
                <text x="173" y="25" font-size="18" text-anchor="end" fill="#fff" style="font-family:tahoma">${watermarkText.rank}</text>
                <text x="173" y="45" font-size="18" text-anchor="end" fill="#fff" style="font-family:tahoma">${watermarkText.level}</text>
                <text x="173" y="65" font-size="12" text-anchor="end" fill="#000" style="font-family:tahoma" font-weight="bold">${watermarkText.exp}</text>
               </svg>`);
              sharp('lvl/output2.png')
              .overlayWith(textedSVG,{top:163, left:0})
              .toFile('lvl/output3.png').then(function(){
                message.channel.send({
                  file: "lvl/output3.png"
                });             
              });
            });
          });      
         });          
        }
      })
    }
  }

  if (message.content.startsWith("?addExp")) {
    const UserTag = (message.content === "?addExp")? message.author:message.mentions.users.first();
    if (client.lvl[message.author.id] != undefined)
      client.lvl[message.author.id].point = client.lvl[message.author.id].point + parseInt(message.content.slice(8));
    fs.writeFile("lvl.json",JSON.stringify(client.lvl,null,4),err =>{
        if(err) throw err;
        console.log("save in file");
    });
    ranks();
  }
  // message.member.hasPermission("MANAGE_ROLES")
});

function ranks()
{
  const jsonAsArray = Object.keys(client.lvl).map(key => ({ id: key, point: client.lvl[key].point }))
  .sort(function (itemA, itemB) {
    return itemA.point < itemB.point;
  });
  return jsonAsArray;
}

function myDataExp(idUser)
{
  // X =  50 * L * L - 50 * L
  // L = (50 + sqrt(50 * 50 - 4 * 50 * (-X) ))/ (2 * 50)

  var k = new Object();
  k.rank = ranks().map(function(e) { return e.id; }).indexOf(idUser)+1;
  k.level = Math.floor((50 + Math.sqrt(50 * 50 - 4 * 50 * (-client.lvl[idUser].point) ))/ (2 * 50));
  k.exp = client.lvl[idUser].point;
  return k;
}

client.login(process.env.BOT_TOKEN);