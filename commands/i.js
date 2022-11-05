const {
  Discord,
  MessageEmbed,
  Permissions,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
  Colors,
  version,
} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
exports.run = async (client, message, args) => {
  const Uptime = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "Bot İstatistik",
      iconURL: client.user.avatarURL(),
    })
    .setDescription(
      `<:tr_takvim:1023137043959795712> **Yapım Tarihi:**\n12 Eylül 2020\n<:tr_ayarlar:1023136979438796882> **Uptime:**\n${Uptime}`
    )
    .setFooter({
      text: `Bot İstatistik`,
      iconURL: message.member.displayAvatarURL({ dynamic: true }),
    })
    .setColor(Colors.Blurple);
  message.reply({ embeds: [embed] });
};
exports.conf = {
  aliases: []
};
exports.help = {
  name: "istatistik",
};
