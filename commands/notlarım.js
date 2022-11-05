const { EmbedBuilder } = require("discord.js")
const diskord = require("discord.js")
const debe = require("croxydb")
exports.run = async (client, message, args) => {
    let not = debe.fetch(`not_${message.author.id}`)
    if (!not) return message.reply("Hiç notun yok! Bu Komutu Kullanarak Bir Not Kaydet '.notal'")
const embed = new EmbedBuilder()
.setTitle("Notların;")
.setDescription(not)
.setColor("#ff0000")
message.reply({embeds: [embed]})

}



exports.conf = {
  aliases: ['notlarım']
}

exports.help = {
  name: "notum"
}