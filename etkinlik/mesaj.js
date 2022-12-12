const { EmbedBuilder, Embed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
const { QuickDB } = require('quick.db');
const db = new QuickDB()
let basarisiz = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji
module.exports = async message => {

  let client = message.client
  
  const gonder = function(mesaj) {

    let embed = new EmbedBuilder()
    .setAuthor({name:message.author.tag, iconURL:message.author.displayAvatarURL({dynamic:true})})
    .setDescription(mesaj)

    message.reply({embeds:[embed]})
  }
  
  let prefix = await db.get(`prefix`) || ayarlar.prefix
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    cmd.run(client, message, params, gonder);
  }
};