const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn´t find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", async () =>{
  console.log(`${bot.user.username} is online!`);

bot.user.setActivity("Teste", {type: "BOT"});

  //bot.user.setGame("Jogando Teste BOT");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  //     if(cmd === `${prefix}report`){
  //
  //     let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //     if(!rUser) return message.channel.send("Não foi possivel encontrar o usuario.");
  //     let rreason = args.join(" ").slice(22);
  //
  //     let reportEmbed = new Discord.RichEmbed()
  //     .setDescription("Reports")
  //     .setColor("#15f153")
  //     .addField("Usuario Reportado", `${rUser} with ID: ${rUser.id}`)
  //     .addField("Reportado Por", `${message.author} with ID: ${message.author.id}`)
  //     .addField("Canal", message.channel)
  //     .addField("Horas", message.createdAt)
  //     .addField("Razão", rreason);
  //
  //     let reportschannel = message.guild.channels.find(`name`, "reports");
  //     if(!reportschannel) return message.channel.send("Não foi possivel encontrar o canal de relatórios.");
  //
  //
  //     message.delete().catch(O_o=>{});
  //     reportschannel.send(reportEmbed);
  // }
  //
  //
  //
  //
  //
  // if(cmd === `${prefix}serverinfo`){
  //
  //   let sicon = message.guild.iconURL;
  //   let bicon = message.guild.displayAvatarURL;
  //   let serverembed = new Discord.RichEmbed()
  //   .setDescription("Informações Do Servidor")
  //   .setColor("#15f153")
  //   .setThumbnail(sicon)
  //   .addField("Nome Do Servidor", message.guild.name)
  //   .addField("Criado Em", message.guild.createdAt)
  //   .addField("Eu Entrei Em", message.member.joinedAt)
  //   .addField("Total De Membros", message.guild.memberCount);
  //
  //   return message.channel.send(serverembed);
  //   }
  //
  //
  //
  //
  // if(cmd === `${prefix}botinfo`){
  //
  //   let bicon = bot.user.displayAvatarURL;
  //   let botembed = new Discord.RichEmbed()
  //   .setDescription("Informação Do BOT:")
  //   .setColor("#15f153")
  //   .setThumbnail(bicon)
  //   .addField("Nome Do BOT", bot.user.username)
  //   .addField("Criado Em", bot.user.createdAt);
  //
  //   return message.channel.send(botembed);
  // }

});

bot.login(tokenfile.token);
