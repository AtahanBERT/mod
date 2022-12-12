const { EmbedBuilder, Embed } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const moment = require("moment")
const ayarlar = require("../ayarlar.json")
moment.locale("tr")

exports.run = async(client, message, args, reply) => {

    if(!message.member.roles.cache.has(ayarlar.rol)) return reply(`Bu komutu kullanmak için yetkin yok!`)

if(args[0].toLowerCase() === "aç" || args[0].toLowerCase() === "ac") {
await message.channel.permissionOverwrites.edit(ayarlar.uyerol, {
    ViewChannel:true,
    SendMessages:false,
    ReadMessageHistory:true
})

reply(`${message.channel} kanalini basariyla kilitledim.`)
} else if(args[0].toLowerCase() === "kapat") {
await message.channel.permissionOverwrites.edit(ayarlar.uyerol, {
        ViewChannel:true,
        SendMessages:true,
        ReadMessageHistory:true
})
    
reply(`${message.channel} basariyla kalaninin kilidini açtim.`) 
}
}

exports.conf = {
    aliases: []
};
  
exports.help = {
    name: 'kanal'
};