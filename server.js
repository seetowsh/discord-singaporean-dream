//Bot Pinging______________________________________________________________________________
const http = require('http');
const express = require('express');
const app = express();
const config = process.env;
app.get("/", (request, response) => {
 console.log(Date.now() + " Just got pinged!");
 response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
 http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//Variables______________________________________________________________________________
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')

const helpEmbed = new Discord.MessageEmbed()
	.setColor('#C3222A')
	.setTitle('Command List')
	.addFields(
		{ name: ';newgame', value: 'Starts a new game in channel' },
    { name: ';joingame', value: 'Joins current game in channel' },
    { name: ';cards', value: 'Cards info' },
    { name: ';stats', value: 'Your gameplay stats' },
    { name: ';github', value: 'Open source code' },

	);

client.on('ready', () => {
  client.user.setActivity(`The SG Dream | ;help`, { type: 'PLAYING' });
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var lowercase = msg.content.toLowerCase()
  if (!lowercase.startsWith(";") || msg.author.bot) return;
  var command = lowercase.substring(1)
 
//Help____________________________________________________________________________________________
  if (command === 'help' || command === "cmds" || command === "commands") {
    msg.channel.send(helpEmbed);
  }
  
//Stats___________________________________________________________________________________________ 
  if (command === 'stats') {
    if (fs.existsSync(`Player_Data/${msg.author.id}.json`)) {
      msg.channel.send('Data file found! {data embed here}')    
    } else {
      msg.channel.send('ERROR: No existing player data, start or join a game to initialise player data file')     
    }
    
  }
  
//Github____________________________________________________________________________________________
  if (command === 'github') {
    msg.channel.send("https://github.com/Hi1307/discord-singaporean-dream/tree/glitch");
    console.log("we got a plug!!!")
  }
  
//Newgame___________________________________________________________________________________________
  function InitDataFile() {
    if (!fs.existsSync(`Player_Data/${msg.author.id}.json`)) {
      fs.writeFile(`Player_Data/${msg.author.id}.json`, '{"gamesplayed": 0,"wins": 0,"losts": 0}', function (err) {
        if (err) throw err;
        msg.reply(`It's your first time playing, enjoy!`)
      }); 
    }
  }
  
  function NewGame() {
    let content = JSON.parse(fs.readFileSync('Game_Data/properties.json', 'utf8'))  
  }
  
  if (command === 'newgame') {
    InitDataFile()
    
    let content = JSON.parse(fs.readFileSync('Game_Data/properties.json', 'utf8'))
    if (content['ongoing_game'] || content['lookingforplayers']) return msg.channel.send("ERROR: There is an ongoing game!");
    
    msg.channel.send('New game started! use ;joingame to join! {todo finish coding join game bruh}')
  }
  
//Joingame___________________________________________________________________________________________ 
  if (command === 'joingame') {
    InitDataFile()
    
    let content = JSON.parse(fs.readFileSync('Game_Data/properties.json', 'utf8'))
    if (!content['lookingforplayers']) return;
    
    msg.channel.send('Joining game yuh')
    

  }
  
});

client.login(config.token);