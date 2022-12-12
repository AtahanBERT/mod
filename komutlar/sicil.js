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

    if(!kullanici) kullanici = message.member

    let sicildata = await sicil.get(`sicil_${kullanici.id}`)
    let sicilPanel = sicildata?.length > 0 ? sicildata.map((value, index) => `\`${index + 1}.\` [**${value.Ceza}**] \`${value.Tarih}\` Tarihinde \`${value.Sebep}\` \`${value.Süre}\` süresince ${message.guild.members.resolve(value.Yetkili)} tarafından cezalandırıldı.`).join("\n\n") : "Bu kullanıcının sicili temiz!";

reply(sicilPanel)
}

exports.conf = {
    aliases: ["history"]
};
  
exports.help = {
    name: 'sicil'
};