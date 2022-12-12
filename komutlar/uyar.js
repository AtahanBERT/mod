const { EmbedBuilder } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const moment = require("moment")
const ayarlar = require("../ayarlar.json")
moment.locale("tr")

exports.run = async(client, message, args, reply) => {

    const sicil = db.table(`sicil_${message.guild.id}`)

    if(!message.member.roles.cache.has(ayarlar.rol)) return reply(`Bu komutu kullanmak için yetkin yok!`)

    let kullanici = message.mentions.members.first() || message.guild.members.resolve(args[0])
    let sebep = args.slice(1).join(" ")

    if(!sebep) return reply(`Bir sebep belirtmelisin.`)
    if(!kullanici) return reply(`Bir kullanici belirtmelisin!`)

await sicil.push(`sicil_${kullanici.id}`, {
        Yetkili: message.author.id,
        Ceza: "UYARI",
        Süre: "SINIRSIZ",
        Sebep: sebep,
        Tarih: moment(Date.now()).add(2, "hours").format("llll")
    })

await kullanici.send({embeds:[new EmbedBuilder().setAuthor({name:message.author.tag, iconURL:message.author.displayAvatarURL({dynamic:true})}).setDescription(`${kullanici} **${sebep}** sebebinden uyarildin bidahakine dikkat et.`)]}).catch(x => {
    console.log(x)
    reply(`Kullanicin dm si kapali oldugu için uyaramadim.`)
    return
})
reply(`${kullanici} adli kullaniciyi **${sebep}** sebebinden uyardim.`)
}

exports.conf = {
    aliases: []
};
  
exports.help = {
    name: 'uyar'
};