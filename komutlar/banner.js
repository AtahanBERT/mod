const { EmbedBuilder } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const sicil = db.table(`sicil`)
const moment = require("moment")
const ayarlar = require("../ayarlar.json")
moment.locale("tr")

exports.run = async(client, message, args, reply) => {

    let kullanici = message.mentions.members.first() || message.guild.members.resolve(args[0]) || message.member
    await client.users.fetch(kullanici.id, { force:true })
    let avatar = kullanici.user.displayAvatarURL({dynamic:true})
    let banner = kullanici.user.bannerURL({dynamic:true, size:2048})
    
    if(!kullanici) return reply(`Bir kullanici belirtmelisin!`)
  
if(banner) {
await message.reply({embeds:[new EmbedBuilder().setAuthor({name:kullanici.user.tag, iconURL:avatar}).setImage(banner).setDescription(`${kullanici} Adli kullanicinin banneri.`)]})
} else {
await message.reply({embeds:[new EmbedBuilder().setAuthor({name:kullanici.user.tag, iconURL:avatar}).setDescription(`${kullanici} Adli kullanicinin banneri yok.`)]})
}
}

exports.conf = {
    aliases: ["bn"]
};
  
exports.help = {
    name: 'banner'
};