const { EmbedBuilder } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const sicil = db.table(`sicil`)
const moment = require("moment")
const ayarlar = require("../ayarlar.json")
moment.locale("tr")

exports.run = async(client, message, args, reply) => {

    let kullanici = message.mentions.members.first() || message.guild.members.resolve(args[0]) || message.member
    let avatar = kullanici.user.displayAvatarURL({dynamic:true, size:1024})
    
    if(!kullanici) return reply(`Bir kullanici belirtmelisin!`)
    
await message.reply({embeds:[new EmbedBuilder().setAuthor({name:kullanici.user.tag, iconURL:avatar}).setImage(avatar).setDescription(`${kullanici} Adli kullanicinin avatari.`)]})
}

exports.conf = {
    aliases: ["av"]
};
  
exports.help = {
    name: 'avatar'
};