const Discord = require('discord.js');
const request = require('request');
const sharp = require('sharp');
const fs = require('fs');
const mdbClient = require('mongodb').MongoClient;
const mongodb_url = process.env.MONGOLAB_AMBER_URI;

const client = new Discord.Client();
client.infos = require('./data.json');


client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  const channel=oldMember.guild.channels.find(ch=>ch.name==='voice-log');

  if(oldUserChannel === undefined && newUserChannel !== undefined) {
    if(!newMember.bot){
      channel.send(`${newMember} joins ${newUserChannel}`);
      // save in info
      client.infos[newMember.id] = {
        UserName:newMember.displayName,
        timeJoin:Math.floor(Date.now() / 1000)
      }
      fs.writeFile("data.json",JSON.stringify(client.infos,null,4),err =>{
          if(err) throw err;
          console.log("save in file");
      });
    }
  } else if(newUserChannel === undefined){
    if(!oldMember.bot){
      channel.send(`${oldMember} leaves ${oldMember.voiceChannel}`);
      if(client.infos[oldMember.id] !== undefined){
        // save in info
        var DureeInVoice = Math.floor( Math.floor(Date.now() / 1000) - client.infos[oldMember.id].timeJoin ) / 60;

        mdbClient.connect(mongodb_url,{useNewUrlParser: true}, function(err, db) {
          if (err) throw err;
          var dbo = db.db("heroku_38t2rv88");
          dbo.collection("lvl").findOne({ id: oldMember.id }, function(err, result) {
            if (err) throw err;
            if(result == null){
              //create
              mdbClient.connect(mongodb_url,{useNewUrlParser: true}, function(err, db) {
              if (err) throw err;
              var dbo = db.db("heroku_38t2rv88");
              var myobj = { id: oldMember.id,username:oldMember.displayName, point: parseInt(DureeInVoice) };
              dbo.collection("lvl").insertOne(myobj, function(err, res) {
                if (err) throw err;
                db.close();
              });
            }); 
            }else
            {
              //update
              mdbClient.connect(mongodb_url,{useNewUrlParser: true}, function(err, db) {
                if (err) throw err;
                var dbo = db.db("heroku_38t2rv88");
                var myquery = { id: oldMember.id };
                var newvalues = { $set: {point: parseInt(result.point) + parseInt(DureeInVoice) } };
                dbo.collection("lvl").updateOne(myquery, newvalues, function(err, res) {
                  if (err) throw err;
                  db.close();
                });
              });
            }
            db.close();
          });
        });         
      }
    }
  } else if (oldUserChannel !== null && newUserChannel !== null) {
    if(newUserChannel.name == 'AFK')
    {
      if(!oldMember.bot){
        channel.send(`${oldMember} leaves ${oldMember.voiceChannel}`);
        if(client.infos[oldMember.id] !== undefined){
          // save in info
          var DureeInVoice = Math.floor( Math.floor(Date.now() / 1000) - client.infos[oldMember.id].timeJoin ) / 60;

          mdbClient.connect(mongodb_url,{useNewUrlParser: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db("heroku_38t2rv88");
            dbo.collection("lvl").findOne({ id: oldMember.id }, function(err, result) {
              if (err) throw err;
              if(result == null){
                //create
                mdbClient.connect(mongodb_url,{useNewUrlParser: true}, function(err, db) {
                if (err) throw err;
                var dbo = db.db("heroku_38t2rv88");
                var myobj = { id: oldMember.id,username:oldMember.displayName,point: parseInt(DureeInVoice) };
                dbo.collection("lvl").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                  db.close();
                });
              }); 
              }else
              {
                //update
                mdbClient.connect(mongodb_url,{useNewUrlParser: true}, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db("heroku_38t2rv88");
                  var myquery = { id: oldMember.id };
                  var newvalues = { $set: {point: parseInt(result.point) + parseInt(DureeInVoice) } };
                  dbo.collection("lvl").updateOne(myquery, newvalues, function(err, res) {
                    if (err) throw err;
                    db.close();
                  });
                });
              }
              db.close();
            });
          });         
        }
      }      
    }
    else if(oldUserChannel.name == 'AFK'){
      if(!newMember.bot){
        channel.send(`${newMember} joins ${newUserChannel}`);
        // save in info
        client.infos[newMember.id] = {
          timeJoin:Math.floor(Date.now() / 1000)
        }
        fs.writeFile("data.json",JSON.stringify(client.infos,null,4),err =>{
            if(err) throw err;
            console.log("save in file");
        });
      }      
    }
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
    member.guild.channels.find(channel => channel.name == "chat").send('\"'+member.user.username+'\" Merhba bik f group MD-gang');
  }
})


client.on('message', message => {
  
  if(message.author.bot) return;

  if (message.content.startsWith('?setGame')) {
    client.user.setGame(message.content.replace('?setGame','').trim());
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
    mdbClient.connect(mongodb_url,{useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("heroku_38t2rv88");
      const UserTag = (message.content === "?level")? message.author:message.mentions.users.first();
      const url = UserTag.displayAvatarURL;
      message.reply('Please wait generateur image.').then(msg => {
        dbo.collection("lvl").findOne({ id: UserTag.id }, function(err, result) {
          if(result == null) {message.channel.send("not found"); return;}
          getInfoUser(UserTag.id).then(function(watermarkText){
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
                    // X =  50 * L * L - 50 * L
                    // L = (50 + sqrt(50 * 50 - 4 * 50 * (-X) ))/ (2 * 50)
                    var lastGoalExp = 50 * watermarkText.level * watermarkText.level  - 50 * watermarkText.level;
                    var nextGoalExp = ( 50 * (watermarkText.level + 1) * (watermarkText.level + 1) - 50 * (watermarkText.level + 1) ) - lastGoalExp;
                    var myExp = watermarkText.exp - lastGoalExp;
                    var widthProgressBar = ( myExp * 100 / nextGoalExp ) * 166 / 100;

                    const textedSVG = new Buffer(`<svg width="183" height="120">
                      <text x="173" y="39" font-size="18" text-anchor="end" fill="#fff" style="font-family:tahoma">${watermarkText.rank}</text>
                      <text x="173" y="59" font-size="18" text-anchor="end" fill="#fff" style="font-family:tahoma">${watermarkText.level}</text>
                      <text x="173" y="79" font-size="12" text-anchor="end" fill="#000" style="font-family:tahoma" font-weight="bold">${watermarkText.exp}/${nextGoalExp + lastGoalExp}</text>
                      <rect x="8" y="87" width="${widthProgressBar}" height="5" fill="#105bcb" />
                      <text x="91" y="111" font-size="15" text-anchor="middle" fill="#000" style="font-family: 'tahoma'; font-weight:normal; font-style: normal">${watermarkText.username}</text>
                     </svg>`);
                    sharp('lvl/output2.png')
                    .overlayWith(textedSVG,{top:163, left:0})
                    .toFile('lvl/output3.png').then(function(){
                      msg.delete(500);
                      message.channel.send({
                        file: "lvl/output3.png"
                      });             
                    });
                  });
                });      
               });          
              }
              else
                console.log("error");
            });
          });
        });        
      });
    });
  }

  if (message.content.startsWith("?rank")) {
    ranks().then(function(data){
      var level = 0;
      var text = "";
      var new_line = 0;
      data.forEach(function(element,index) {
        new_line += 28;
        level = Math.floor((50 + Math.sqrt(50 * 50 - 4 * 50 * (-element.point) ))/ (2 * 50));
        text += '<text x="0" y="'+new_line+'" font-size="15" fill="#fff" style="font-family:tahoma">'+element.username+' [ '+level+' ] </text>';
        text += '<text x="295" y="'+new_line+'" font-size="15" text-anchor="end" fill="#fff" style="font-family:tahoma">'+element.point+'</text>';
      });
      const textedSVG = new Buffer(`<svg width="312" height="280">${text}</svg>`);
      sharp('lvl/bg_ranked.png')
      .overlayWith(textedSVG,{top:65, left:69})
      .toFile('lvl/rankedout.png').then(function(){
        message.channel.send({
          file: "lvl/rankedout.png"
        });             
      });
    });
  }

  if (message.content.startsWith("?addExp")) {
    const channelChat = message.guild.channels.find(ch=>ch.name==='chat');
    const UserTag = (message.mentions.users.first() === undefined)?message.author:message.mentions.users.first();

    mdbClient.connect(mongodb_url,{useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("heroku_38t2rv88");

      dbo.collection("lvl").findOne({ id: UserTag.id }, function(err, result) {
        if(result == null) {message.channel.send("not found"); return;}
        mdbClient.connect(mongodb_url,{useNewUrlParser: true}, function(err, db) {
          if (err) throw err;
          var dbo = db.db("heroku_38t2rv88");
          var myquery = { id: UserTag.id };
          var pointAdd = (message.mentions.users.first() === undefined)?message.content.split(" ")[1]:message.content.split(" ")[2];
          var newvalues = { $set: {point: parseInt(pointAdd) + parseInt(result.point)} };
          dbo.collection("lvl").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            db.close();
            channelChat.send(`${UserTag} You gain ${parseInt(pointAdd)} Exp`);
          });
        });
      });

    });
  }
});

function addEspace(text,numberDisponible)
{
  var t = text;
  for (var i = 0; i < (numberDisponible - (text+"").length); i++)
    t += " ";
  return t;
}

function ranks()
{
  return new Promise(function(resolve,reject){
    mdbClient.connect(mongodb_url,{useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("heroku_38t2rv88");
      dbo.collection("lvl").find().sort({ point: -1 }).limit(10).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        resolve(result);
      });
    });     
  })
}

function getInfoUser(idUser)
{
  // X =  50 * L * L - 50 * L
  // L = (50 + sqrt(50 * 50 - 4 * 50 * (-X) ))/ (2 * 50)
  return new Promise(function(resolve,reject){
    mdbClient.connect(mongodb_url,{useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("heroku_38t2rv88");
      dbo.collection("lvl").find().sort({ point: -1 }).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        result.forEach(function(element,index) {
          if(element.id == idUser)
          {
            var k = new Object();
            k.rank = index + 1;
            k.level = Math.floor((50 + Math.sqrt(50 * 50 - 4 * 50 * (-element.point) ))/ (2 * 50));
            k.exp = element.point;
            k.username = element.username;
            resolve(k);
          }
        });
      });
    });     
  });

}

client.login(process.env.BOT_TOKEN);