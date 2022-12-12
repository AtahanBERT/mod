const { EmbedBuilder } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const moment = require("moment")
const ayarlar = require("../ayarlar.json")
moment.locale("tr")

exports.run = async(client, message, args, reply) => {

    if(!message.member.permissions.has("MANAGE_ROLES")) return reply(`Bu komutu kullanmak için yetkin yok!`)

    let kullanici = message.mentions.members.first() || message.guild.members.resolve(args[0])
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.filter(x => x.name.toLowerCase().includes(args.slice(1).join(" ").toLowerCase())).map(x => x)[0]

    if(!kullanici) return reply(`Bir kullanici belirtmelisin!`)
    if(!kullanici.manageable || message.member.roles.highest.position <= kullanici.roles.highest.position) return reply(`Bu kullanici sizle ayni/ust yetkidedir.`)

await kullanici.roles.add(rol.id)
reply(`${kullanici} adli kullaniciya ${rol} rolü verildi.`)
}

exports.conf = {
    aliases: []
};
  
exports.help = {
    name: 'rolver'
};