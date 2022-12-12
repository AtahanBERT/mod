const { EmbedBuilder, Embed } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const moment = require("moment")
const ayarlar = require("../ayarlar.json")
moment.locale("tr")

exports.run = async(client, message, args, reply) => {

    if(!message.member.roles.cache.has(ayarlar.rol)) return reply(`Bu komutu kullanmak için yetkin yok!`)

    let sayi = args[0]

    if(!sayi || isNaN(sayi) || sayi > 100 || sayi < 1) return reply(`**1-100** arasi bir sayi belirtmelisin!`)

await message.channel.bulkDelete(sayi).then(() => {
message.channel.send({embeds:[new EmbedBuilder().setAuthor({name:message.author.tag, iconURL:message.author.displayAvatarURL({dynamic:true})}).setDescription(`Basariyla **${sayi}** mesaj silindi.`)]}).then(x => setTimeout(() => x.delete(), 5000))
})
}

exports.conf = {
    aliases: ["temizle"]
};
  
exports.help = {
    name: 'sil'
};