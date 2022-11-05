const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require("discord.js");
exports.run = async (client, message, args) => {

const row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()

                .setLabel("Hayatı")
                .setURL(`https://www.ktb.gov.tr/TR-96300/ataturk39un-hayati.html`)
                .setEmoji("1032666467193344091")
                .setStyle(ButtonStyle.Link)
        )
        .addComponents(
            new ButtonBuilder()
                .setLabel("Wikipedia Linki")
                .setURL(`https://tr.wikipedia.org/wiki/Mustafa_Kemal_Atatürk`)
                .setEmoji("1032666467193344091")
                .setStyle(ButtonStyle.Link)
        )
        .addComponents(
            new ButtonBuilder()
                .setLabel('Daha Fazla Bilgi')
                .setURL(`https://www.meb.gov.tr/ataturk`)
                .setEmoji("1032666467193344091")
                .setStyle(ButtonStyle.Link)
        )

  const row2 = new ActionRowBuilder()

    .addComponents(
      new SelectMenuBuilder()
        .setCustomId('atatürk')
        .setPlaceholder('Hiç Birşey Seçilmedi')
        .addOptions([
          {
            label: "Anasayfa",
            description: "Anasayfaya Geri Götürür",
            value: 'anasayfa'

          },
          {
            label: "Atatürk'ün İlkeleri",
            description: "Atatürk'ün İlkelerini Gösterir",
            value: "ilke"

          },
          {
            label: "Atatürk'ün İnkılapları",
            description: "Atatürk'ün İnkılapları Gösterir",
            value: "inkılap"

          },
          {
            label: "Atatürk'ün Hayatı",
            description: "Atatürk'ün Hayatını Gösterir",
            value: "hayatı"

          },
          {
            label: "Andımız",
            description: "Andımızı Gösterir",
            value: "andımız"

          },
          {
            label: "İstiklal Marşı",
            description: "İstiklal Marşımızın 2 Kıtasını Gösterir",
            value: "istiklal"

          },
        ]));


  const lourityYardim = new EmbedBuilder()
    .setTitle('Atatürk')
    .setDescription("Atatürk'ün hayatını, yaptığı icraatleri ve daha fazlası için alttaki kategori seçiminden öğrenebilirsiniz.")
    .setImage('https://cdn.discordapp.com/attachments/1020381311975817237/1033295379879440525/192730_ataturk.jpg')
    .setThumbnail('https://cdn.discordapp.com/attachments/1020381311975817237/1033296694135234630/asda.jpg')
    .setColor("Purple")

  message.reply({ embeds: [lourityYardim], components: [row2,row1] })

};
exports.conf = {
  aliases: ["atatürk"]
};

exports.help = {
  name: "atamız"
};