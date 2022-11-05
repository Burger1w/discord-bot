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
            emoji: "<:tr_mod:1023137021578989609>",
            value: "moderation"

          },
          {
            label: "Kullanıcı",
            description: "Kullanıcı komutlarını gösterir.",
            emoji: "<:pandalove:1026108835498299492>",
            value: "member"

          },
          {
            label: "Ayarlamalı",
            description: "Ayarlamalı komutlarını gösterir.",
            emoji: "<:1520blurplesettings:1014352724369879090>",
            value: "ayar"

          },
          {
            label: "Çekiliş",
            description: "Çekiliş komutlarını gösterir.",
            emoji: "<a:cekilis:1017495795446075462>",
            value: "give"

          },
          {
            label: "Eğlence",
            description: "Eğlence komutlarını gösterir.",
            emoji: "<a:MOR_YILDIZ:1038229399981527040>",
            value: "fun"

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