const db = require('orio.db')
exports.run = async (client, message, args) => {

if(!message.member.permissions.has("0x0000000000000008")) return message.reply("Bu Komutu Kullanmak İçin **Yönetici** Yetkisine Sahip Olmalısın!").catch(e => {})

if(args[0] === 'kapat' || args[0] === 'sil') {
let otorol = await db.get(`otorol.${message.guild.id}`)
if(!otorol) return message.reply("Otorol Açık Değil! Otorolü Açmak İçin `a!otorol #log @rol` Yazabilirsiniz!").catch(e => {})

await db.delete(`otorol.${message.guild.id}`)
return message.reply("Otorol Başarıyla Kapatıldı!").catch(e => {})
}

let log = message.mentions.channels.first()
if(!log) return message.reply("Lütfen Bir Kanal Etiketleyin!").catch(e => {})
let rol = message.mentions.roles.first() || message.guild.roles.get(args[1])
if(!rol) return message.reply("Lütfen Bir Rol Etiketleyin!").catch(e => {})

await db.set(`otorol.${message.guild.id}`, {
log: log.id,
rol: rol.id
})
return message.reply("Otorol Başarıyla Açıldı!").catch(e => {})
}

exports.conf = {
aliases: []
}

exports.help = {
name: 'otorol'
}