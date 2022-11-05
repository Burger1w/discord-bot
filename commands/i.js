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
      `<:tr_takvim:1023137043959795712> **Yapım Tarihi:**\n12 Eylül 2020\n<:tr_ayarlar:1023136979438796882> **Uptime:**\n${Uptime}\n<:tr_tac:1023137042466607135> **Bot Sahibi:**\n<@677218405752766499> ve <@1005112531431469136>\n<:tr_bot:1023136986678173716> **Kütüphane:** Discord.js\n<:tr_menu:1023137020152913920> **Sunucu Sayısı:**\n${client.guilds.cache.size}\n<:tr_kesfet:1023137015350431835> **Kullanıcı Sayısı:**\n${client.users.cache.size}\n<:tr_gizli:1023137003660918844> **Geçikme Süreleri:**\n${client.ws.ping}\n<:tr_developer:1023136993019973662> **Komut Sayısı:**`
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
