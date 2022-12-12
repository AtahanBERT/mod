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
    let jailrol = ayarlar.jailrol
    let sebep = args.slice(1).join(" ")
    let roller = await db.get(`roller_${kullanici.id}`)
    
    if(!kullanici) return reply(`Bir kullanici belirtmelisin!`)
    if(!kullanici.manageable || message.member.roles.highest.position <= kullanici.roles.highest.position) return reply(`Bu kullanici sizle ayni/ust yetkidedir.`)
    if(!sebep) return reply(`Bir sebep belirtmelisin.`)
    
await kullanici.roles.set(roller)

await sicil.push(`sicil_${kullanici.id}`, {
    Yetkili: message.author.id,
    Ceza: "UNJAIL",
    Süre: "SINIRSIZ",
    Sebep: sebep,
    Tarih: moment(Date.now()).add(2, "hours").format("llll")
})

reply(`${kullanici} adli kullanici jailden çikarildi.`)
}

exports.conf = {
    aliases: []
};
  
exports.help = {
    name: 'unjail'
};