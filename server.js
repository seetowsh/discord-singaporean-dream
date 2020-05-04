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
		{ name: ';newround', value: 'Starts a new round' },
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
  
  if (command === 'help' || command === "cmds" || command === "commands") {
    msg.channel.send(helpEmbed);
  }
  
  if (command === 'stats') {
    if (!fs.existsSync(`Player_Data/${msg.author.id}.json`)) return msg.channel.send('No player data found!');
    msg.channel.send("Player Data File Found! DATA NOT CODED")
  }
});

client.login(config.token);