'use strict';
process.on('uncaughtException', function (err) {
    console.log(`Caught exception:  ${err}`);
});
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const Client = new Discord.Client({fetchAllMembers: true});
const prefix = '>';


const fs = require('fs');
Client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    Client.commands.set(command.name, command);

}
Client.ws.on('INTERACTION_CREATE', async interaction => {
  require(`./slash_commands/${interaction.data.name}.js`)(client, interaction);
})
const cooldowns = new Discord.Collection();

Client.once('ready', async () => {
  console.log('Online!');
  let guilds = await Client.guilds.cache
  guilds = guilds.array()

const activities_list = [ 
  { text: ">help", type: 0},
  { text: "do >vote", type: 0},
  { text: "Developed by ShyGuy#5504", type: 0},
  { text: `in ${guilds.length} Servers`, type: 0},
]

  let i = 0;
  
  setInterval(() => {
    if (i >= activities_list.length)  i = 0; 
    Client.user.setPresence({ activity: { name: activities_list[i].text, type: activities_list[i].type } });
    i++; 
}, 10000);
}); 






  Client.on(`messageDelete`, function(message, channel){
   if(message.guild.id == '771799156557480006'){
     console.log('Ghost Ping is ignored for woogies world ')
     return;
   }
   if(message.guild.id == '614895425639546881'){
     console.log(`Ghost ping ignored for BytesToBits`)
     return;
   }
      if(message.mentions.users.first() || message.mentions.roles.first()){
        if(!message.author.bot) {
          const usersMentioned = message.mentions.users;
          if (usersMentioned.first().id === message.author.id && usersMentioned.size === 1) return;
          
                const GhostPingEmbed = new MessageEmbed();
                GhostPingEmbed.setColor(message.member.displayColor);
                GhostPingEmbed.addField('Wanna remove this feature from your server?',`Message ShyGuy#5504 your server ID number and evidence that you are that server owner`)
                GhostPingEmbed.setTitle("Ghost Ping");
                GhostPingEmbed.addField("Author:- ", message.author);
                GhostPingEmbed.addField("Message:- ", message.content);
                GhostPingEmbed.setColor(message.member.displayColor);
                message.channel.send(GhostPingEmbed);
                if (message.guild.id == '396021514740301825'){
                  message.guild.channels.cache.find(c => c.name === `🤖-bot-commands`).send(GhostPingEmbed)
                }    
        } else if(!message.mentions.users.first() || message.mentions.roles.first()){
          console.log(`no ping detected`)

          .catch(err => console.log(err))
      }
    }
    
    })
    Client.ws.on('INTERACTION_CREATE', async interaction => {
      require(`./slash_commands/${interaction.data.name}.js`)(client, interaction);
  })

  Client.on('message', message => {
    if(message.guild.id == '729703207848378460'){
      const keywords = ["i dont simp over shawty","shawty like a melody"]
      var i;
      for(i = 0;i < keywords.length; i++) {
      if(message.content.toLowerCase().includes(keywords[i].toLowerCase())){
        message.channel.send("Shut up, no one likes that joke")
      }
    }
  }
    if(!message.content.startsWith(`${prefix}`)) return;
    if (message.author.bot) return;

    const args = message.content.trim().split(/ +/g);
    
    const commandName = args[0].slice(prefix.length).toLowerCase();
    const command = Client.commands.get(commandName) || Client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  
    
    if(!message.content.startsWith(`${prefix}`)) return;
    if (message.author.bot) return;
    if(!command) return;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`You must wait another ${timeLeft.toFixed(1)} more second(s) before using this command again!.`);
    }
  }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    try {
      command.execute(message, args, Client);
    } catch (error) {
      console.error(error);
      message.reply('There was an error trying to execute that command');
    }
    

    
  });
Client.login(process.env.DJS_TOKEN); //you should not use process.env


