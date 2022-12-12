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
    let muterol = ayarlar.muterol
    let sebep = args.slice(1).join(" ")
    
    if(!kullanici) return reply(`Bir kullanici belirtmelisin!`)
    if(!kullanici.manageable || message.member.roles.highest.position <= kullanici.roles.highest.position) return reply(`Bu kullanici sizle ayni/ust yetkidedir.`)
    if(!sebep) return reply(`Bir sebep belirtmelisin.`)

await kullanici.roles.add(muterol)

await sicil.push(`sicil_${kullanici.id}`, {
    Yetkili: message.author.id,
    Ceza: "MUTE",
    Süre: "SINIRSIZ",
    Sebep: sebep,
    Tarih: moment(Date.now()).add(2, "hours").format("llll")
})

reply(`${kullanici} adli kullaniciya mute atildi.`)
}

exports.conf = {
    aliases: []
};
  
exports.help = {
    name: 'mute'
};