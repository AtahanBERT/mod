const { EmbedBuilder, Client, Collection, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const client = new Client({
    intents: 3276799
})
const ayarlar = require("./ayarlar.json")
client.login(ayarlar.token)
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const fs = require("fs")
require('./util/etkinlikLoader.js')(client);

const log = message => {
    console.log(`${message}`);
};

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir('./komutlar/', async(err, files) => {
if(await db.get("komutsayi") !== files.length) {    
  await db.set("komutsayi", files.length)
}
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen Komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});



client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};





client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

client.on("ready", async() => {
    console.log(`${client.user.tag} ile giris yapildi.`)
})