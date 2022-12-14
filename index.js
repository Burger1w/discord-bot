const {PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const config = require("./config.js");
const db = require("croxydb")
const Discord = require("discord.js")
const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.login(process.env.token)

client.on("ready", async () => {
  const moment = require("moment") 
  require("moment-duration-format")
  moment.locale("tr")
 setInterval(async () => {
   client.guilds.cache.map(async guild => {
     guild.channels.cache.map(async channel => {
       let data = db.get(`cekilis.${guild.id}_${channel.id}`);
       if (data) {
         let time = Date.now() - data.zaman;
         let sure = data.sure;
let kanal = guild.channels.cache.get(data.kanalid);
kanal.messages.fetch(data.mesajid).then(async mesaj => {
 let toplam = data.toplam
           })

         if (time >= sure) {
           
           let win = client.channels.cache.get(data.kanalid)
           if(win){
             win = await win.messages.fetch(data.mesajid).then(a => a.reactions.cache.get("????").users.fetch())
           } 
          if(win){
           let toplam = data.toplam
            
           let won = []
           let winner = []

           for(let i = 0; i < toplam; i += 1){
         await client.channels.cache.get(data.kanalid).messages.fetch(data.mesajid).then(a => a.reactions.cache.get("????").users.fetch()).then(a => a.map(u => {
           if (!u.bot) {
           won.push("<@"+ u.id + ">");
           db.push(`rerollusers_${data.mesajid}`, u.id);
           }}))

          let kazanan = won[Math.floor(Math.random() * won.length)]

           if(!winner.map(cs => cs).includes(kazanan))
           winner.push(kazanan)
           }
             
          
           
     
           kanal.messages.fetch(data.mesajid).then(async mesaj => {
             const Discord = require("discord.js")
            const row = new Discord.ActionRowBuilder()
            .addComponents(
            new Discord.ButtonBuilder()
              .setLabel("Reroll")
              .setStyle(Discord.ButtonStyle.Success)
              .setCustomId("reroll")
            )
             const embed = new EmbedBuilder()
               .setTitle(data.odul)
              .setColor("#5865f2")
               .setTimestamp()
             .setDescription(`
Sona Erdi: <t:${Math.floor(Date.now() /1000)}:R> (<t:${Math.floor(Date.now() /1000)}:f>)
D??zenleyen: <@${data.hosted}>
Kazanan: ${winner.join(", ")}`)
           mesaj.edit({embeds: [embed], components: [row]})  
    
            if(winner.join(", ")){
           kanal.send(`Tebrikler ${winner} **${data.odul}** Kazand??n!`)
           db.delete(`cekilis.${guild.id}_${channel.id}`);
           db.set(`son_${guild.id}_${channel.id}`, data.mesajid)
       
            } else {
                 db.delete(`cekilis.${guild.id}_${channel.id}`);
                
               const embed = new EmbedBuilder()
               .setTitle(data.odul)
              .setColor("#5865f2")
             .setDescription(`
Sona Erdi: <t:${Math.floor(Date.now() /1000)}:R> (<t:${Math.floor(Date.now() /1000)}:f>)
D??zenleyen: <@${data.hosted}>
Kazanan: Bilinmiyor`) 
mesaj.edit({embeds: [embed], components: []})
         
            }
                   })                                           
         
         }
       }
       }
     });
   });
 }, 5000);
});
client.on('interactionCreate', async interaction => {
   if (!interaction.isButton()) return;
   if (interaction.customId === "reroll") {
     let sahip = db.fetch(`cekilis.${interaction.guild.id}_${interaction.message.id}`)
     if(interaction.user.id !== sahip) return interaction.reply({content: `Bu butonu sadece ??ekili??i d??zenleyen (<@${sahip}>) kullanabilir`, ephemeral: true})
       let data = db.get(`rerollusers_${interaction.channel.id}`)
         let kazanan = db.get(`rerollusers_${interaction.message.id}`)[
     Math.floor(Math.random() * db.get(`rerollusers_${interaction.message.id}`).length)
   ]

                   interaction.reply(`Tebrikler <@${kazanan}> Yeni Kazanan Sensin!`)
                 
               
           }
       })
       client.on('interactionCreate', async interaction => {
         if (!interaction.isButton()) return;
         if (interaction.customId === "rerolls") {
           let sahip = db.fetch(`cekilis.${interaction.guild.id}_${interaction.message.id}`)
           if(interaction.user.id !== sahip) return interaction.reply({content: `Bu butonu sadece ??ekili??i d??zenleyen (<@${sahip}>) kullanabilir`, ephemeral: true})
             let data = db.get(`rerollusers_${interaction.channel.id}`)
               let kazanan = db.get(`kullan??c??_${interaction.message.id}`)[
           Math.floor(Math.random() * db.get(`kullan??c??_${interaction.message.id}`).length)
         ]
     
                         interaction.reply(`Tebrikler <@${kazanan}> Yeni Kazanan Sensin!`)
                       
                     
                 }
             })
const modal = new ModalBuilder()
.setCustomId('form')
.setTitle('Godzilla - Destek Sistemi!')
  const a1 = new TextInputBuilder()
  .setCustomId('sebep')
  .setLabel('Destek A??ma Sebebiniz?')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Destek Olu??turma Sebebiniz Nedir?')
  .setRequired(true)
  const row = new ActionRowBuilder().addComponents(a1);
  
  modal.addComponents(row);
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "ticket"){
    await interaction.showModal(modal);
	}
})  

const mod = new ModalBuilder()
.setCustomId('eklemenu')
.setTitle('Godzilla - Destek Sistemi!')
  const e = new TextInputBuilder()
  .setCustomId('uyeid')
  .setLabel('Kullan??c?? ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(10)
  .setPlaceholder('Eklemek istedi??iniz kullan??c?? ID girin.')
  .setRequired(true)
  const row2 = new ActionRowBuilder().addComponents(e);
  
  mod.addComponents(row2);
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "ekle"){
    await interaction.showModal(mod);
	}
})  

const mod2 = new ModalBuilder()
.setCustomId('eklemenu2')
.setTitle('Godzilla - Destek Sistemi!')
  const a = new TextInputBuilder()
  .setCustomId('cikarid')
  .setLabel('Kullan??c?? ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(10)
  .setPlaceholder('????karmak istedi??iniz kullan??c?? ID girin.')
  .setRequired(true)
  const row3 = new ActionRowBuilder().addComponents(a);
  
  mod2.addComponents(row3);
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "????kar"){
    await interaction.showModal(mod2);
	}
})  
client.on('interactionCreate', async interaction => {
  if (interaction.type !== InteractionType.ModalSubmit) return;
  if (interaction.customId === 'form') {
    const sebep = interaction.fields.getTextInputValue('sebep')
  
const row = new ActionRowBuilder()
.addComponents( 
  new SelectMenuBuilder()
  .setCustomId('del')
.setPlaceholder('Bilet Men??s??!')
.addOptions([
{
label: 'Bileti Sil',
description: 'Kanal?? silersin!',
emoji: "1002538609003470898",
value: 'delete',
},
{
label: "Panel",
description: "??ye Ekleme ????karma Men??s??.",
emoji: "984924491777998938",
value: "panel"

}
])
);

  let data3 =  db.get("destek"+ interaction.guild.id)
  let roleStaff = interaction.guild.roles.cache.get(data3.rolID)
  let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)
              if (DejaUnChannel) return interaction.reply({content: 'Sunucuda zaten a????k bir biletiniz var.', ephemeral: true})
              interaction.guild.channels.create({
              name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
        
                permissionOverwrites: [
                  {   
                      id: interaction.guild.id,
                      deny: [PermissionsBitField.Flags.ViewChannel]
                  },
                  {
                      id: interaction.user.id,
                      allow: [PermissionsBitField.Flags.ViewChannel]
                  },
                  {
                      id: roleStaff,
                      allow: [PermissionsBitField.Flags.ViewChannel]
                  }
              ]
            })
            
                  
                  .then((c)=>{
                 
                      const i1 = new EmbedBuilder()
                      .setTitle('Godzilla - Destek Sistemi')
                      .setDescription(`Kullan??c?? Destek Talebini **${sebep}** Sebebiyle Olu??turdu!\n\nDestek Olu??turan: ${interaction.user}`)
                      .setColor(0x0099ff)
                      c.send({embeds: [i1], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                      interaction.reply({content: `Biletiniz ba??ar??yla a????ld??. <#${c.id}>`, ephemeral: true})
                  })
          
          }
        })
        client.on('interactionCreate', async interaction => {
          if (!interaction.isSelectMenu()) return;
          if(interaction.customId === "del") {
            if (interaction.values[0] == "panel") {
              await interaction.deferUpdate()
const row2 = new ActionRowBuilder()
.addComponents(
new ButtonBuilder()
.setLabel("Ekle")
.setStyle(ButtonStyle.Success)
.setCustomId("ekle"),
new ButtonBuilder()
.setLabel("????kar")
.setStyle(ButtonStyle.Danger)
.setCustomId("????kar"),
new ButtonBuilder()
.setLabel("Sil")
.setStyle(ButtonStyle.Secondary)
.setCustomId("sil")
)
const embed = new EmbedBuilder()
.setTitle("Godzilla - Kullan??c?? Paneli!")
.setDescription("A??a????daki butonlardan ??ye ekleyebilir veya ????karabilirsin!")
.setColor(0x0099ff)
let message = await interaction.channel.messages.fetch(interaction.message.id)
await message.edit({embeds: [embed], components: [row2]})
          }
        }
        })
        client.on('interactionCreate', async interaction => {
          if (interaction.type !== InteractionType.ModalSubmit) return;
          if (interaction.customId === 'eklemenu') {
            const id = interaction.fields.getTextInputValue('uyeid')
            const channel = interaction.channel
                channel.permissionOverwrites.create(
                  id, {ViewChannel: true}
                  
                  )
                  interaction.reply({content: `<@${id}> Adl?? Kullan??c?? Ba??ar??yla Destek Talebine Eklendi!`})
                } else {
                
          }
        })
        client.on('interactionCreate', async interaction => {
          if (interaction.type !== InteractionType.ModalSubmit) return;
          if (interaction.customId === 'eklemenu2') {
            const id = interaction.fields.getTextInputValue('cikarid')
            const channel = interaction.channel
                channel.permissionOverwrites.create(
                  id, {ViewChannel: false}
                  
                  )
                  interaction.reply({content: `<@${id}> Adl?? Kullan??c?? Ba??ar??yla Destek Talebinden At??ld??!`})
                } else {
               
          }
        })
        client.on('interactionCreate', async interaction => {
        if (!interaction.isSelectMenu()) return;
        if(interaction.customId === "del") {
          if (interaction.values[0] == "delete") {
            let log = db.fetch(`log_${interaction.guild.id}`)
              const channel = interaction.channel
              channel.delete();
              client.channels.cache.get(log).send(`<@${interaction.user.id}> Adl?? Kullan??c?? **${interaction.channel.name}** Adl?? Deste??i Sildi!`)
            
          }
        }
        })
        client.on('interactionCreate', async interaction => {
          if (!interaction.isButton()) return;
          if(interaction.customId === "sil") {
              let log = db.fetch(`log_${interaction.guild.id}`)
                const channel = interaction.channel
                channel.delete();
                client.channels.cache.get(log).send(`<@${interaction.user.id}> Adl?? Kullan??c?? **${interaction.channel.name}** Adl?? Deste??i Sildi!`)
              
            
          }
          })
          
        client.on('interactionCreate', async interaction => {
          let butonrol = db.fetch(`buton_rol${interaction.message.id}`)
        if(!butonrol) return;
        if (!interaction.isButton()) return;
        if(interaction.customId === "rol") {
            if(!interaction.member.roles.cache.has(butonrol)) { 
            interaction.member.roles.add(butonrol)
          interaction.reply({content: "Rol Ba??ar??yla Verildi!", ephemeral: true})
           } else {
             
            interaction.member.roles.remove(butonrol)
          interaction.reply({content: "Rol Ba??ar??yla Al??nd??!", ephemeral: true})
        }
          }
        })
        
client.on("guildMemberAdd", member => {
  const kanal = db.get(`hgbb_${member.guild.id}`)
const moment = require("moment");
const limit = new Map();
moment.locale("tr");
  if(!kanal) return;
  let kay??ts??z = db.fetch(`kay??ts??z_${member.guild.id}`)
        member.guild.members.cache.get(member.id).roles.add(kay??ts??z)
  member.guild.channels.cache.get(kanal).send({content: `:inbox_tray: | Kullan??c??: ${member}\n\nSunucudaki ??ye Say??s??: **${member.guild.memberCount}**\n\nHesap Olu??turulma Tarihi: \`${moment(member.createdAt).format('D MMMM YYYY')}\``})
})

client.on("guildMemberAdd", member => {
  const kanal = db.get(`gckanal_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:inbox_tray: | ${member} sunucuya kat??ld??! Sunucumuz **${member.guild.memberCount}** ki??i oldu.`})
})

client.on("guildMemberRemove", member => {
  const kanal = db.get(`gckanal_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:outbox_tray: | ${member} sunucudan ayr??ld??! Sunucumuz **${member.guild.memberCount}** ki??i oldu.`})
})

const modal1 = new ModalBuilder()
.setCustomId('form13')
.setTitle('Godzilla - Men??l?? Rol Alma Sistemi!')
  const a12 = new TextInputBuilder()
  .setCustomId('1')
  .setLabel('Ba??l??k')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Men??deki Yaz?? Ba??l??????')
  .setRequired(true)
  const a2 = new TextInputBuilder()
  .setCustomId('2')
  .setLabel('Ba??l??k')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Men??deki Yaz?? Ba??l??????')
  .setRequired(true)
  const a3 = new TextInputBuilder()
  .setCustomId('3')
  .setLabel('Rol ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Men??deki 1. Ba??l??kta Olucak Rol ID')
  .setRequired(true)
  const a4 = new TextInputBuilder()
  .setCustomId('4')
  .setLabel('Rol ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Men??de 2. Ba??l??kta Verilicek Rol??n ID')
  .setRequired(true)
   
  const row31 = new ActionRowBuilder().addComponents(a12);
   const row21 = new ActionRowBuilder().addComponents(a2);
 const row4 = new ActionRowBuilder().addComponents(a3);
 const row5 = new ActionRowBuilder().addComponents(a4);

  modal1.addComponents(row31, row21, row4, row5);
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "kurulum"){
    await interaction.showModal(modal1);
	}
})  

client.on('interactionCreate', async interaction => {
  if (interaction.type !== InteractionType.ModalSubmit) return;
  if (interaction.customId === 'form13') {
    const menu1 = interaction.fields.getTextInputValue('1')
    const menu2 = interaction.fields.getTextInputValue('2')
    const menu3 = interaction.fields.getTextInputValue('3')
    const menu4 = interaction.fields.getTextInputValue('4')
  
    
const row = new ActionRowBuilder()
.addComponents( 
  new SelectMenuBuilder()
  .setCustomId('select')
.setPlaceholder('A??a????daki Men??den Rol Alabilirsin!')
.addOptions([
{
label: `${menu1}`,
value: 's1',
},
{
label: `${menu2}`,
value: "s2"
}
    ])
);
    const embed = new EmbedBuilder()
    .setTitle("Godzilla - Rol Alma Sistemi!")
    .setDescription("A??a????daki men??den istedi??in rolleri alabilirsin!")
    .setColor("#ff0000")
    interaction.channel.send({embeds: [embed], components: [row]})
    interaction.reply({content: "Men?? Ba??ar??yla G??nderildi.", ephemeral: true})

    db.set(`menu_${interaction.guild.id}`, menu3)
      db.set(`menu2_${interaction.guild.id}`, menu4)
     
     
    
}
})
   client.on('interactionCreate', async interaction => {
        if (!interaction.isSelectMenu()) return;
        if(interaction.customId === "select") {
                if (interaction.values[0] == "s1") {
             let rol = db.fetch(`menu_${interaction.guild.id}`)
                  if(!rol) return;
            if(!interaction.member.roles.cache.has(rol)) { 
              interaction.member.roles.add(rol)
            interaction.reply({content: "Rol Ba??ar??yla Verildi!", ephemeral: true})
             } else {
               
              interaction.member.roles.remove(rol)
            interaction.reply({content: "Rol Ba??ar??yla Al??nd??!", ephemeral: true})
             
              }
                   } 
            }
       })
             
              client.on('interactionCreate', async interaction => {
        if (!interaction.isSelectMenu()) return;
        if(interaction.customId === "select") {
                if (interaction.values[0] == "s2") {
             let rol = db.fetch(`menu2_${interaction.guild.id}`)
                  if(!rol) return;
            if(!interaction.member.roles.cache.has(rol)) { 
              interaction.member.roles.add(rol)
            interaction.reply({content: "Rol Ba??ar??yla Verildi!", ephemeral: true})
             } else {
               
              interaction.member.roles.remove(rol)
            interaction.reply({content: "Rol Ba??ar??yla Al??nd??!", ephemeral: true})
             
              }
                   } 
            }
       })
client.on('interactionCreate', async interaction => {
        if (!interaction.isSelectMenu()) return;
        if(interaction.customId === "select") {
                if (interaction.values[0] == "s3") {
             let rol = db.fetch(`menu3_${interaction.guild.id}`)
                  if(!rol) return;
            if(!interaction.member.roles.cache.has(rol)) { 
              interaction.member.roles.add(rol)
            interaction.reply({content: "Rol Ba??ar??yla Verildi!", ephemeral: true})
             } else {
               
              interaction.member.roles.remove(rol)
            interaction.reply({content: "Rol Ba??ar??yla Al??nd??!", ephemeral: true})
             
              }
                   } 
            }
       })






const modal2 = new ModalBuilder()
.setCustomId('formaq')
.setTitle('Ba??vuru Formu!')
const a15 = new TextInputBuilder()
.setCustomId('isim')
.setLabel('??sminiz?')
.setStyle(TextInputStyle.Paragraph) 
.setMinLength(2)
.setPlaceholder('Arda')
.setRequired(true)
const a21 = new TextInputBuilder() 
.setCustomId('yas')
.setLabel('Ya????n??z Ka??t??r?')
.setStyle(TextInputStyle.Paragraph)  
.setMinLength(1)
.setPlaceholder('15')
.setRequired(true)
const a33 = new TextInputBuilder() 
.setCustomId('biz')
.setLabel('Neden Biz?')
.setStyle(TextInputStyle.Paragraph)  
.setMinLength(1)
.setPlaceholder('Neden Bizimle ??al????mak ??stiyorsun?')
.setRequired(true)
const a45 = new TextInputBuilder() 
.setCustomId('yetkili')
.setLabel('Daha ??nce Bir Sunucuda Yetkili Oldun Mu?')
.setMinLength(1)
.setStyle(TextInputStyle.Paragraph)  
.setPlaceholder('Farkl?? bir sunucuda yetkili oldun mu?')
const a5 = new TextInputBuilder() 
  .setCustomId('aciklama')
  .setLabel('Eklemek ??stedi??in?')
  .setMinLength(1)
  .setStyle(TextInputStyle.Paragraph) 
  .setPlaceholder('Ek olarak bir ??ey s??ylemek istiyorsan yazabilirsin.')
  const row333 = new ActionRowBuilder().addComponents(a15);
  const row2344 = new ActionRowBuilder().addComponents(a21);
  const row341 = new ActionRowBuilder().addComponents(a33);
  const row413 = new ActionRowBuilder().addComponents(a45);
  const row512 = new ActionRowBuilder().addComponents(a5);
  modal2.addComponents(row333, row2344, row341, row413, row512);

 
client.on('interactionCreate', async (interaction) => {

if(interaction.customId === "ba??vuru"){
  await interaction.showModal(modal2);
}
})

  client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ModalSubmit) return;
    if (interaction.customId === 'formaq') {

let kanal = db.fetch(`basvurulog_${interaction.guild.id}`)
let rol = db.fetch(`basvururol_${interaction.guild.id}`)


  const isim = interaction.fields.getTextInputValue('isim')
  const yas = interaction.fields.getTextInputValue('yas')
  const biz = interaction.fields.getTextInputValue('biz')
  const yetkili = interaction.fields.getTextInputValue('yetkili')
  const aciklama = interaction.fields.getTextInputValue('aciklama')

  const embed = new Discord.EmbedBuilder()
  .setTitle("Yeni Ba??vuru Geldi!")
  .setDescription(`Ba??vuran: **${interaction.user.tag}**\n\n??sim: **${isim}**\n\nYa??: **${yas}**\n\nNeden Biz? **${biz}**\n\nYetkili Oldu??u Sunucular: **${yetkili}**\n\nA????klama: **${aciklama}**         ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????`)
  .setColor(0x0099FF)
  const row = new Discord.ActionRowBuilder()
  .addComponents(
  new ButtonBuilder()
  .setCustomId('evet')
  .setLabel('Evet')
  .setStyle(ButtonStyle.Success),
  new ButtonBuilder()
  .setCustomId("hayir")
  .setLabel("Hay??r")
  .setStyle(ButtonStyle.Danger))

  
  


  await interaction.reply({ content: 'Ba??vurun g??nderildi.', ephemeral: true });
  client.channels.cache.get(kanal).send({embeds: [embed], components: [row]}).then(async m => {
    db.set(`basvuru_${m.id}`, interaction.user.id)
    })
  }
  })




client.on("interactionCreate", async (interaction) => {
if (!interaction.isButton()) return;

if (interaction.customId == "evet") {
interaction.deferUpdate()
const data = await db.get(`basvuru_${interaction.message.id}`)
if(!data) return;
const uye = data;
let log = db.fetch(`basvurukanal_${interaction.guild.id}`)
let rol = db.fetch(`basvururol_${interaction.guild.id}`)

client.channels.cache.get(log).send(`<@${uye}> Adl?? Kullan??c??n??n Ba??vurusu Kabul Edildi Rolleri Verildi.`)
interaction.guild.members.cache.get(uye).roles.add(rol)

}
})




client.on('interactionCreate', async interaction => {
  if (!interaction.isSelectMenu()) return;
  if (interaction.customId === "darex") {

      if (interaction.values[0] == "moderation") {

      const yardimMod = new EmbedBuilder()
          .setTitle(`Darex | Moderasyon`)
          .setURL('https://discord.com/oauth2/authorize?client_id=754498131382763570&permissions=8&scope=bot')
          .setDescription('???? .ban **Etiketledi??in Ki??iyi Banlar**\n???? .kick **Etiketledi??in Ki??iyi Sunucudan Atar**')
          .setThumbnail(client.user.displayAvatarURL())
          .setColor("Greyple")
      interaction.update({ embeds: [yardimMod] })

  }

  if (interaction.values[0] === "member") {

      const yardimKullanici = new EmbedBuilder()
          .setTitle(`Darex | Kullan??c??`)
          .setURL('https://discord.com/oauth2/authorize?client_id=754498131382763570&permissions=8&scope=bot')
          .setDescription('???? .notal **Not Defterine Yazd??????n ??eyi Kaydeder**\n???? .notum **Not Defterine Kaydeti??in Mesajlar?? Kaydeder**\n???? .avatar **Etiketledi??in Yada Kendi Avatar??n?? G??sterir**\n???? .istatistik **Botun ??statisti??ini G??sterir**\n???? .atat??rk **Atat??rk Hak??nda Bilgi Verir**')
          .setThumbnail(client.user.displayAvatarURL())
          .setColor("Blue")
      interaction.update({ embeds: [yardimKullanici] })

  }

  if (interaction.values[0] === "give") {

      const yardimKullanici = new EmbedBuilder()
          .setTitle(`Darex | ??ekili??`)
          .setURL('https://discord.com/oauth2/authorize?client_id=754498131382763570&permissions=8&scope=bot')
          .setDescription('???? .ba??lat **??ekili?? Ba??lat??r**\n???? .bitir **Aktif Olan ??ekili??i Bitirir**\n???? .reroll **??ekili??in Kazan??n?? De??i??tirir**')
          .setThumbnail(client.user.displayAvatarURL())
          .setColor("Blue")
      interaction.update({ embeds: [yardimKullanici] })

  }

  if (interaction.values[0] === "ayar") {

      const yardimKullanici = new EmbedBuilder()
          .setTitle(`Darex | Ayarlamal??`)
          .setURL('https://discord.com/oauth2/authorize?client_id=754498131382763570&permissions=8&scope=bot')
          .setDescription('???? .ticket-log **Ticket Sistemi Log Kanal??n?? Ayarlar**\n???? .ticket-yetkilisi **Ticket Sistemi Yetkilisini G??sterir**\n???? .ticket-olu??tur **Ticket Nerede A????lacak Kanala Gidip Bu Komutu Kullanabilirsiniz**\n???? .buton-rol **Buton Rol Sistemini Ayarlar** \n???? .men??l??-rol **Men??l?? Rol Sistemini Ayarlar**\n???? .ba??vuru-kanal **Ba??vuru Kanal??n?? Ayarlar**\n???? .ba??vuru-log **Ba??vuruldu??unda G??nderilecek Kanal**\n???? .ba??vuru-rol **Ba??vuru Kabul Edild??inde Verilecek Rol?? Ayarlar**\n???? .ba??vur **Ba??vuru Kanal??na Gidip Komutu Kullanarak Formu G??ndertebilirsiniz**\n???? .otorol **Otorol Sistemini Ayarlar**')
          .setThumbnail(client.user.displayAvatarURL())
          .setColor("Blue")
      interaction.update({ embeds: [yardimKullanici] })

  }

  if (interaction.values[0] === "fun") {

      const yardimKullanici = new EmbedBuilder()
          .setTitle(`Darex | E??lence`)
          .setURL('https://discord.com/oauth2/authorize?client_id=754498131382763570&permissions=8&scope=bot')
          .setDescription('???? .snake **Y??lan Oyunu Oynars??n??z**\n???? .polis-geliyor **Polis Geliyor ??akas??**')
          .setThumbnail(client.user.displayAvatarURL())
          .setColor("Blue")
      interaction.update({ embeds: [yardimKullanici] })

  }
}})

////////////////

client.on('interactionCreate', async interaction => {
  if (!interaction.isSelectMenu()) return;
  if (interaction.customId === "atat??rk") {

      if (interaction.values[0] == "ilke") {

      const yardimMod = new EmbedBuilder()
          .setTitle(`Atat??rk'??n ??lkeleri`)
          .setDescription(`Atat??rk'??n ilkeleri 6 ilkeden olu??ur. Bu ilkeler ??u ??ekildedir;\n\nCumhuriyet??ilik\nDevlet??ilik\nHalk????l??k\n??nk??lap????l??k\nMilliyet??ilik\nLaiklik`)
           .setThumbnail('https://cdn.discordapp.com/attachments/1020381311975817237/1033296694135234630/asda.jpg')
          .setColor("Purple")
      interaction.update({ embeds: [yardimMod] })

}

      if (interaction.values[0] == "ink??lap") {

      const yardimMod = new EmbedBuilder()
          .setTitle(`Atat??rk'??n ??nk??laplar??`)
          .setDescription(`Atat??rk??n ??nk??laplar?? 5 kategoriden olu??ur;\n\nSiyasi ??nk??laplar\n\nSaltanat??n kald??r??lmas?? (1922)\nAnkara'n??n Ba??kent Olmas?? (1923)\nCumhuriyetin ??lan?? (1923)\nHil??fetin kald??r??lmas?? (1924)\nKad??nlara Se??me ve Se??ilme Hakk??n??n Tan??nmas?? (1930)\nAtat??rk'??n Te??vikiyle ??ok Partili Rejime Ge??i?? Denemesi (1930)\nLaikli??in Anayasaya Girmesi (1937)\n\nToplumsal ??nk??laplar\n\n??apka ve K??yafet Devrimi (??apka Kanunu) (1925)\nTekke, Zaviye ve T??rbelerin Kapat??lmas?? (1925)\nMilletleraras?? Takvim ve Saatin, Yeni Rakamlar??n Kabul?? ve ??l????lerde De??i??iklik (1925)\nSoyad?? Kanunu (1934)\nL??kap ve Unvanlar??n Kald??r??lmas?? (1934)\n\nE??itim ??nk??laplar??\n\nMillet Mektepleri'nin A????lmas?? (1929)\n????retimin Birle??tirilmesi (1924)\nMedreselerin Kapat??lmas?? (1924)\nMaarif Te??kilat?? Hakk??nda Kanun (1926)\nHarf Devrimi'ne ili??kin kanunun kabul?? (1928)\nG??zel Sanatlarda Yenilikler (1928)\nT??rk Tarih Kurumu ve T??rk Dil Kurumu'nun kurulmas?? (1931)\nDil Devrimi'nin ba??lamas?? (1932)\n??niversite Reformu (1933)\n??niversite ????reniminin D??zenlenmesi (1933)\n\nEkonomi ??nk??laplar??\n\n??zmir ??ktisat Kongresi (1923)\nA??ar??n kald??r??lmas?? (1925)\n??ift??inin ??zendirilmesi (1925)\n??rnek ??iftliklerin Kurulmas?? (1925)\nTar??m Kredi Kooperatifleri'nin Kurulmas?? (1925)\nKabotaj Kanunu (1926)\nSanayi Te??vik Kanunu (1927)\nToprak reformu (1929)\nI ve II. Kalk??nma Pl??nlar?? (1933)\nY??ksek Ziraat Enstit??s??'n??n Kurulmas?? (1933)\nTicaret ve Sanayi Odalar??n??n Kurulmas?? (1935)\n\nHukuk ??nk??laplar??\n\n??er'iyye Mahkemelerinin Kapat??lmas?? (1924)\nYeni Anayasan??n Kabul?? (1924)\nMecellenin Kald??r??lmas?? (1926)\nT??rk Kanunu Medenisi (1926)\nT??rk Ceza Kanunu (1926)`)
          .setThumbnail('https://cdn.discordapp.com/attachments/1020381311975817237/1033296694135234630/asda.jpg')
          .setColor("Purple")
      interaction.update({ embeds: [yardimMod] })

  }

      if (interaction.values[0] == "hayat??") {

      const yardimMod = new EmbedBuilder()
          .setTitle(`Atat??rk'??n Hayat??`)
          .setDescription(`Mustafa Kemal Atat??rk 1881 y??l??nda Selanik???te do??du. Ali R??za Efendi babas??, Z??beyde Han??m ise annesidir. Mustafa Kemal Atat??rk?????n e??itim ald?????? okullar ba??tan sona ????yledir; ilkokul e??itimini Mahalle Mektebinde ve ??emsi Efendi Okulunda, ortaokul e??itimini Selanik M??lkiye R????tiyesi ve Selanik Askeri R????tiyesinde, lise e??itimini Selanik Askeri ??dadisi, ??niversite e??itimini ise Harp Okulu ve Harp Akademisinde alm????t??r. 1893 y??l??nda Askeri R????tiye???de okurken matematik ????retmeni ona Kemal ismini verdi ve b??ylece ismi Mustafa Kemal oldu.
I. D??nya Sava???? nihayete erdi??inde Mondros Ate??kes antla??mas?? imzalanmas?? ile vatan topraklar??n?? payla????lacakt??. Fakat duruma el koyan Mustafa Kemal, 19 May??s 1919???da Samsun???a ????karak milli m??cadelenin temellerini att??.
23 Nisan 1920 tarihinde TBMM???nin a????lmas??na ??nder olan Mustafa Kemal Meclis taraf??ndan da H??k??met Ba??kan?? se??ildi. 5 A??ustos 1921???de yine Meclis taraf??ndan Ba??komutan se??ildi. Sakarya Sava???????n??n kazan??lmas??ndaki b??y??k emeklerinden dolay?? Gazilik unvan?? ve Mare??allik r??tbesi ile ??ereflendirildi.
29 Ekim 1923 tarihinde Cumhuriyet ilan edildi ve Mustafa Kemal Atat??rk T??rkiye Cumhuriyeti???nin ilk Cumhurba??kan?? koltu??una oturdu. 1934 y??l??nda Gazi Mustafa Kemal???e meclis ???Atat??rk??? soyad??n?? l??y??k g??rd??.
10 Kas??m 1938 tarihinde Dolmabah??e Saray?????nda hayat??na veda etti. T??m ??lkeyi yasa bo??du. Ancak ink??laplar?? ve ??lkemize kazand??rd??klar??yla kalbimizde sonsuzlu??u ula??m???? bir liderdir.`)
           .setThumbnail('https://cdn.discordapp.com/attachments/1020381311975817237/1033296694135234630/asda.jpg')
          .setColor("Purple")
      interaction.update({ embeds: [yardimMod] })

}

      if (interaction.values[0] == "and??m??z") {

      const yardimMod = new EmbedBuilder()
          .setTitle(`And??m??z`)
          .setDescription(`T??rk'??m, do??ruyum, ??al????kan??m,\n??lkem: k??????klerimi korumak, b??y??klerimi saymak, yurdumu, milletimi ??z??mden ??ok sevmektir.\n??lk??m: y??kselmek, ileri gitmektir.\nEy B??y??k Atat??rk!\nA??t??????n yolda, g??sterdi??in hedefe durmadan y??r??yece??ime ant i??erim.\nVarl??????m T??rk varl??????na arma??an olsun.\nNe mutlu T??rk'??m diyene!`)
           .setThumbnail('https://cdn.discordapp.com/attachments/1020381311975817237/1033296694135234630/asda.jpg')
          .setColor("Purple")
      interaction.update({ embeds: [yardimMod] })

}

      if (interaction.values[0] == "istiklal") {

      const yardimMod = new EmbedBuilder()
          .setTitle(`??ST??KLAL MAR??I`)
          .setDescription(`Korkma, s??nmez bu ??afaklarda y??zen al sancak;\nS??nmeden yurdumun ??st??nde t??ten en son ocak.\nO benim milletimin y??ld??z??d??r, parlayacak;\nO benimdir, o benim milletimindir ancak.\n\n??atma, kurban olay??m ??ehreni ey nazl?? hil??l!\nKahraman ??rk??ma bir g??l??? ne bu ??iddet bu cel??l?\nSana olmaz d??k??len kanlar??m??z sonra hel??l,\nHakk??d??r, Hakk???a tapan, milletimin istikl??l.`)
           .setThumbnail('https://cdn.discordapp.com/attachments/1020381311975817237/1033296694135234630/asda.jpg')
          .setColor("Purple")
      interaction.update({ embeds: [yardimMod] })

}

      if (interaction.values[0] == "anasayfa") {

      const yardimMod = new EmbedBuilder()
        .setTitle(`Atat??rk`)
        .setDescription("Atat??rk'??n hayat??n??, yapt?????? icraatleri ve daha fazlas?? i??in alttaki kategori se??iminden ????renebilirsiniz.")
        .setImage('https://cdn.discordapp.com/attachments/1020381311975817237/1033295379879440525/192730_ataturk.jpg')
        .setThumbnail('https://cdn.discordapp.com/attachments/1020381311975817237/1033296694135234630/asda.jpg')
          .setColor("Purple")
      interaction.update({ embeds: [yardimMod] })

}





}})

/////////////

client.on('guildMemberAdd', async member => {
const csdc = require("discord.js")
const cdb = require("orio.db")
let csd = cdb.get(`otorol.${member.guild.id}`)
if(!csd) return;

let rol = csd.rol
let kanal = csd.log
if(!rol) return
const channel = member.guild.channels.cache.get(kanal)
let role = member.guild.roles.cache.get(rol)
if(!role) return

const quunix = new csdc.EmbedBuilder() 
.setTitle(member.user.tag)                      
.setDescription(`${member.user.username}, Sunucuya <@&${rol}> rol?? ile kat??ld??! Senin ile birlikte **${member.guild.memberCount}** Ki??iyiz.`) 
.setColor(csdc.Colors.Blue)
.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

await member.roles.add(rol).catch(err => { 
if(!channel) return
return channel.send(`Yeterli yetkim bulunamad?????? i??in rol veremiyorum. <@!${member.guild.ownerId}>`)
})

if(!channel) return
return channel.send({embeds : [quunix]}).catch(err => {})
})