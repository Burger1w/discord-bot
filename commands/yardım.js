const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
exports.run = async (client, message, args) => {
  const row = new ActionRowBuilder()

    .addComponents(
      new SelectMenuBuilder()
        .setCustomId('darex')
        .setPlaceholder('Kategoriler!')
        .addOptions([
          {
            label: "Moderasyon",
            description: "Moderasyon komutlarını gösterir.",
            emoji: ":hammer_pick:",
            value: "moderation"

          },
          {
            label: "Kullanıcı",
            description: "Kullanıcı komutlarını gösterir.",
            emoji: ":busts_in_silhouette:",
            value: "member"

          },
          // {
          //     label: "Başlık",
          //     description: "Açıklama",
          //     emoji: "Emoji",
          //     value: "isim"

          // },
          // {
          //     label: "Başlık",
          //     description: "Açıklama",
          //     emoji: "Emoji",
          //     value: "isim"

          // },
          // {
          //     label: "Başlık",
          //     description: "Açıklama",
          //     emoji: "Emoji",
          //     value: "isim"

          // },
        ]));

  const lourityYardim = new EmbedBuilder()
    .setTitle(`Darex | Yardım`)
    .setDescription("> **Yardım menüsüne hoşgeldin!**\n> Aşağıdaki menüye tıklayarak komutlarıma ulaşabilirsin.")
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("Blurple")
  message.reply({ embeds: [lourityYardim], components: [row] })

};
exports.conf = {
  aliases: ["help"]
};

exports.help = {
  name: "yardım"
};