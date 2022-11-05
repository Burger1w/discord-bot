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
      name: "Polisler Geliyor",
      iconURL: client.user.avatarURL(),
    })
    .setTitle('Polisler Geliyor')
    .setDescription(
      `Polisler Geliyor Kaç!!`
    )
    .setImage('https://tenor.com/view/cops-police-sirens-catching-crminals-what-you-gonna-do-gif-22472645')
    .setFooter({
      text: `Polisler Geliyor`,
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
