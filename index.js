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
             win = await win.messages.fetch(data.mesajid).then(a => a.reactions.cache.get("🎉").users.fetch())
           } 
          if(win){
           let toplam = data.toplam
            
           let won = []
           let winner = []

           for(let i = 0; i < toplam; i += 1){
         await client.channels.cache.get(data.kanalid).messages.fetch(data.mesajid).then(a => a.reactions.cache.get("🎉").users.fetch()).then(a => a.map(u => {
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
Düzenleyen: <@${data.hosted}>
Kazanan: ${winner.join(", ")}`)
           mesaj.edit({embeds: [embed], components: [row]})  
    
            if(winner.join(", ")){
           kanal.send(`Tebrikler ${winner} **${data.odul}** Kazandın!`)
           db.delete(`cekilis.${guild.id}_${channel.id}`);
           db.set(`son_${guild.id}_${channel.id}`, data.mesajid)
       
            } else {
                 db.delete(`cekilis.${guild.id}_${channel.id}`);
                
               const embed = new EmbedBuilder()
               .setTitle(data.odul)
              .setColor("#5865f2")
             .setDescription(`
Sona Erdi: <t:${Math.floor(Date.now() /1000)}:R> (<t:${Math.floor(Date.now() /1000)}:f>)
Düzenleyen: <@${data.hosted}>
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
     if(interaction.user.id !== sahip) return interaction.reply({content: `Bu butonu sadece çekilişi düzenleyen (<@${sahip}>) kullanabilir`, ephemeral: true})
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
           if(interaction.user.id !== sahip) return interaction.reply({content: `Bu butonu sadece çekilişi düzenleyen (<@${sahip}>) kullanabilir`, ephemeral: true})
             let data = db.get(`rerollusers_${interaction.channel.id}`)
               let kazanan = db.get(`kullanıcı_${interaction.message.id}`)[
           Math.floor(Math.random() * db.get(`kullanıcı_${interaction.message.id}`).length)
         ]
     
                         interaction.reply(`Tebrikler <@${kazanan}> Yeni Kazanan Sensin!`)
                       
                     
                 }
             })
const modal = new ModalBuilder()
.setCustomId('form')
.setTitle('Godzilla - Destek Sistemi!')
  const a1 = new TextInputBuilder()
  .setCustomId('sebep')
  .setLabel('Destek Açma Sebebiniz?')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Destek Oluşturma Sebebiniz Nedir?')
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
  .setLabel('Kullanıcı ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(10)
  .setPlaceholder('Eklemek istediğiniz kullanıcı ID girin.')
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
  .setLabel('Kullanıcı ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(10)
  .setPlaceholder('Çıkarmak istediğiniz kullanıcı ID girin.')
  .setRequired(true)
  const row3 = new ActionRowBuilder().addComponents(a);
  
  mod2.addComponents(row3);
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "çıkar"){
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
.setPlaceholder('Bilet Menüsü!')
.addOptions([
{
label: 'Bileti Sil',
description: 'Kanalı silersin!',
emoji: "1002538609003470898",
value: 'delete',
},
{
label: "Panel",
description: "Üye Ekleme Çıkarma Menüsü.",
emoji: "984924491777998938",
value: "panel"

}
])
);

  let data3 =  db.get("destek"+ interaction.guild.id)
  let roleStaff = interaction.guild.roles.cache.get(data3.rolID)
  let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)
              if (DejaUnChannel) return interaction.reply({content: 'Sunucuda zaten açık bir biletiniz var.', ephemeral: true})
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
                      .setDescription(`Kullanıcı Destek Talebini **${sebep}** Sebebiyle Oluşturdu!\n\nDestek Oluşturan: ${interaction.user}`)
                      .setColor(0x0099ff)
                      c.send({embeds: [i1], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                      interaction.reply({content: `Biletiniz başarıyla açıldı. <#${c.id}>`, ephemeral: true})
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
.setLabel("Çıkar")
.setStyle(ButtonStyle.Danger)
.setCustomId("çıkar"),
new ButtonBuilder()
.setLabel("Sil")
.setStyle(ButtonStyle.Secondary)
.setCustomId("sil")
)
const embed = new EmbedBuilder()
.setTitle("Godzilla - Kullanıcı Paneli!")
.setDescription("Aşağıdaki butonlardan üye ekleyebilir veya çıkarabilirsin!")
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
                  interaction.reply({content: `<@${id}> Adlı Kullanıcı Başarıyla Destek Talebine Eklendi!`})
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
                  interaction.reply({content: `<@${id}> Adlı Kullanıcı Başarıyla Destek Talebinden Atıldı!`})
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
              client.channels.cache.get(log).send(`<@${interaction.user.id}> Adlı Kullanıcı **${interaction.channel.name}** Adlı Desteği Sildi!`)
            
          }
        }
        })
        client.on('interactionCreate', async interaction => {
          if (!interaction.isButton()) return;
          if(interaction.customId === "sil") {
              let log = db.fetch(`log_${interaction.guild.id}`)
                const channel = interaction.channel
                channel.delete();
                client.channels.cache.get(log).send(`<@${interaction.user.id}> Adlı Kullanıcı **${interaction.channel.name}** Adlı Desteği Sildi!`)
              
            
          }
          })
          
        client.on('interactionCreate', async interaction => {
          let butonrol = db.fetch(`buton_rol${interaction.message.id}`)
        if(!butonrol) return;
        if (!interaction.isButton()) return;
        if(interaction.customId === "rol") {
            if(!interaction.member.roles.cache.has(butonrol)) { 
            interaction.member.roles.add(butonrol)
          interaction.reply({content: "Rol Başarıyla Verildi!", ephemeral: true})
           } else {
             
            interaction.member.roles.remove(butonrol)
          interaction.reply({content: "Rol Başarıyla Alındı!", ephemeral: true})
        }
          }
        })
        
client.on("guildMemberAdd", member => {
  const kanal = db.get(`hgbb_${member.guild.id}`)
const moment = require("moment");
const limit = new Map();
moment.locale("tr");
  if(!kanal) return;
  let kayıtsız = db.fetch(`kayıtsız_${member.guild.id}`)
        member.guild.members.cache.get(member.id).roles.add(kayıtsız)
  member.guild.channels.cache.get(kanal).send({content: `:inbox_tray: | Kullanıcı: ${member}\n\nSunucudaki Üye Sayısı: **${member.guild.memberCount}**\n\nHesap Oluşturulma Tarihi: \`${moment(member.createdAt).format('D MMMM YYYY')}\``})
})

client.on("guildMemberAdd", member => {
  const kanal = db.get(`gckanal_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:inbox_tray: | ${member} sunucuya katıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})

client.on("guildMemberRemove", member => {
  const kanal = db.get(`gckanal_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:outbox_tray: | ${member} sunucudan ayrıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})

const modal1 = new ModalBuilder()
.setCustomId('form13')
.setTitle('Godzilla - Menülü Rol Alma Sistemi!')
  const a12 = new TextInputBuilder()
  .setCustomId('1')
  .setLabel('Başlık')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Menüdeki Yazı Başlığı')
  .setRequired(true)
  const a2 = new TextInputBuilder()
  .setCustomId('2')
  .setLabel('Başlık')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Menüdeki Yazı Başlığı')
  .setRequired(true)
  const a3 = new TextInputBuilder()
  .setCustomId('3')
  .setLabel('Rol ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Menüdeki 1. Başlıkta Olucak Rol ID')
  .setRequired(true)
  const a4 = new TextInputBuilder()
  .setCustomId('4')
  .setLabel('Rol ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Menüde 2. Başlıkta Verilicek Rolün ID')
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
.setPlaceholder('Aşağıdaki Menüden Rol Alabilirsin!')
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
    .setDescription("Aşağıdaki menüden istediğin rolleri alabilirsin!")
    .setColor("#ff0000")
    interaction.channel.send({embeds: [embed], components: [row]})
    interaction.reply({content: "Menü Başarıyla Gönderildi.", ephemeral: true})

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
            interaction.reply({content: "Rol Başarıyla Verildi!", ephemeral: true})
             } else {
               
              interaction.member.roles.remove(rol)
            interaction.reply({content: "Rol Başarıyla Alındı!", ephemeral: true})
             
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
            interaction.reply({content: "Rol Başarıyla Verildi!", ephemeral: true})
             } else {
               
              interaction.member.roles.remove(rol)
            interaction.reply({content: "Rol Başarıyla Alındı!", ephemeral: true})
             
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
            interaction.reply({content: "Rol Başarıyla Verildi!", ephemeral: true})
             } else {
               
              interaction.member.roles.remove(rol)
            interaction.reply({content: "Rol Başarıyla Alındı!", ephemeral: true})
             
              }
                   } 
            }
       })






const modal2 = new ModalBuilder()
.setCustomId('formaq')
.setTitle('Başvuru Formu!')
const a15 = new TextInputBuilder()
.setCustomId('isim')
.setLabel('İsminiz?')
.setStyle(TextInputStyle.Paragraph) 
.setMinLength(2)
.setPlaceholder('Arda')
.setRequired(true)
const a21 = new TextInputBuilder() 
.setCustomId('yas')
.setLabel('Yaşınız Kaçtır?')
.setStyle(TextInputStyle.Paragraph)  
.setMinLength(1)
.setPlaceholder('15')
.setRequired(true)
const a33 = new TextInputBuilder() 
.setCustomId('biz')
.setLabel('Neden Biz?')
.setStyle(TextInputStyle.Paragraph)  
.setMinLength(1)
.setPlaceholder('Neden Bizimle Çalışmak İstiyorsun?')
.setRequired(true)
const a45 = new TextInputBuilder() 
.setCustomId('yetkili')
.setLabel('Daha Önce Bir Sunucuda Yetkili Oldun Mu?')
.setMinLength(1)
.setStyle(TextInputStyle.Paragraph)  
.setPlaceholder('Farklı bir sunucuda yetkili oldun mu?')
const a5 = new TextInputBuilder() 
  .setCustomId('aciklama')
  .setLabel('Eklemek İstediğin?')
  .setMinLength(1)
  .setStyle(TextInputStyle.Paragraph) 
  .setPlaceholder('Ek olarak bir şey söylemek istiyorsan yazabilirsin.')
  const row333 = new ActionRowBuilder().addComponents(a15);
  const row2344 = new ActionRowBuilder().addComponents(a21);
  const row341 = new ActionRowBuilder().addComponents(a33);
  const row413 = new ActionRowBuilder().addComponents(a45);
  const row512 = new ActionRowBuilder().addComponents(a5);
  modal2.addComponents(row333, row2344, row341, row413, row512);

 
client.on('interactionCreate', async (interaction) => {

if(interaction.customId === "başvuru"){
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
  .setTitle("Yeni Başvuru Geldi!")
  .setDescription(`Başvuran: **${interaction.user.tag}**\n\nİsim: **${isim}**\n\nYaş: **${yas}**\n\nNeden Biz? **${biz}**\n\nYetkili Olduğu Sunucular: **${yetkili}**\n\nAçıklama: **${aciklama}**         ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`)
  .setColor(0x0099FF)
  const row = new Discord.ActionRowBuilder()
  .addComponents(
  new ButtonBuilder()
  .setCustomId('evet')
  .setLabel('Evet')
  .setStyle(ButtonStyle.Success),
  new ButtonBuilder()
  .setCustomId("hayir")
  .setLabel("Hayır")
  .setStyle(ButtonStyle.Danger))

  
  


  await interaction.reply({ content: 'Başvurun gönderildi.', ephemeral: true });
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

client.channels.cache.get(log).send(`<@${uye}> Adlı Kullanıcının Başvurusu Kabul Edildi Rolleri Verildi.`)
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
          .setDescription('📗 .ban **Etiketlediğin Kişiyi Banlar**\n📗 .kick **Etiketlediğin Kişiyi Sunucudan Atar**\n📗 .forceban **İdsini Girdiğin Kişiyi Sunucudan Direk Banlar**')
          .setThumbnail(client.user.displayAvatarURL())
          .setColor("Greyple")
      interaction.update({ embeds: [yardimMod] })

  }

  if (interaction.values[0] === "member") {

      const yardimKullanici = new EmbedBuilder()
          .setTitle(`Darex | Kullanıcı`)
          .setURL('https://discord.com/oauth2/authorize?client_id=754498131382763570&permissions=8&scope=bot')
          .setDescription('📕 .notal **Not Defterine Yazdığın Şeyi Kaydeder**\n📕 .notum **Not Defterine Kaydetiğin Mesajları Kaydeder**\n📕 .avatar **Etiketlediğin Yada Kendi Avatarını Gösterir**\n📕 .istatistik **Botun İstatistiğini Gösterir**\n📕 .atatürk **Atatürk Hakında Bilgi Verir**')
          .setThumbnail(client.user.displayAvatarURL())
          .setColor("Blue")
      interaction.update({ embeds: [yardimKullanici] })

  }

  if (interaction.values[0] === "give") {

      const yardimKullanici = new EmbedBuilder()
          .setTitle(`Darex | Çekiliş`)
          .setURL('https://discord.com/oauth2/authorize?client_id=754498131382763570&permissions=8&scope=bot')
          .setDescription('📒 .başlat **Çekiliş Başlatır**\n📒 .bitir **Aktif Olan Çekilişi Bitirir**\n📒 .reroll **Çekilişin Kazanını Değiştirir**')
          .setThumbnail(client.user.displayAvatarURL())
          .setColor("Blue")
      interaction.update({ embeds: [yardimKullanici] })

  }

  if (interaction.values[0] === "ayar") {

      const yardimKullanici = new EmbedBuilder()
          .setTitle(`Darex | Ayarlamalı`)
          .setURL('https://discord.com/oauth2/authorize?client_id=754498131382763570&permissions=8&scope=bot')
          .setDescription('📙 .ticket-log **Ticket Sistemi Log Kanalını Ayarlar**\n📙 .ticket-yetkilisi **Ticket Sistemi Yetkilisini Gösterir**\n📙 .ticket-oluştur **Ticket Nerede Açılacak Kanala Gidip Bu Komutu Kullanabilirsiniz**\n📙 .buton-rol **Buton Rol Sistemini Ayarlar** \n📙 .menülü-rol **Menülü Rol Sistemini Ayarlar**\n📙 .başvuru-kanal **Başvuru Kanalını Ayarlar**\n📙 .başvuru-log **Başvurulduğunda Gönderilecek Kanal**\n📙 .başvuru-rol **Başvuru Kabul Edildğinde Verilecek Rolü Ayarlar**\n📙 .başvur **Başvuru Kanalına Gidip Komutu Kullanarak Formu Göndertebilirsiniz**')
          .setThumbnail(client.user.displayAvatarURL())
          .setColor("Blue")
      interaction.update({ embeds: [yardimKullanici] })

  }

  if (interaction.values[0] === "fun") {

      const yardimKullanici = new EmbedBuilder()
          .setTitle(`Darex | Eğlence`)
          .setURL('https://discord.com/oauth2/authorize?client_id=754498131382763570&permissions=8&scope=bot')
          .setDescription('📘 .snake **Yılan Oyunu Oynarsınız**\n📘 .polis-geliyor **Polis Geliyor Şakası**')
          .setThumbnail(client.user.displayAvatarURL())
          .setColor("Blue")
      interaction.update({ embeds: [yardimKullanici] })

  }
}})

////////////////

client.on('interactionCreate', async interaction => {
  if (!interaction.isSelectMenu()) return;
  if (interaction.customId === "atatürk") {

      if (interaction.values[0] == "ilke") {

      const yardimMod = new EmbedBuilder()
          .setTitle(`Atatürk'ün İlkeleri`)
          .setDescription(`Atatürk'ün ilkeleri 6 ilkeden oluşur. Bu ilkeler şu şekildedir;\n\nCumhuriyetçilik\nDevletçilik\nHalkçılık\nİnkılapçılık\nMilliyetçilik\nLaiklik`)
           .setThumbnail('https://cdn.discordapp.com/attachments/1020381311975817237/1033296694135234630/asda.jpg')
          .setColor("Purple")
      interaction.update({ embeds: [yardimMod] })

}

      if (interaction.values[0] == "inkılap") {

      const yardimMod = new EmbedBuilder()
          .setTitle(`Atatürk'ün İnkılapları`)
          .setDescription(`Atatürkün İnkılapları 5 kategoriden oluşur;\n\nSiyasi İnkılaplar\n\nSaltanatın kaldırılması (1922)\nAnkara'nın Başkent Olması (1923)\nCumhuriyetin İlanı (1923)\nHilâfetin kaldırılması (1924)\nKadınlara Seçme ve Seçilme Hakkının Tanınması (1930)\nAtatürk'ün Teşvikiyle Çok Partili Rejime Geçiş Denemesi (1930)\nLaikliğin Anayasaya Girmesi (1937)\n\nToplumsal İnkılaplar\n\nŞapka ve Kıyafet Devrimi (Şapka Kanunu) (1925)\nTekke, Zaviye ve Türbelerin Kapatılması (1925)\nMilletlerarası Takvim ve Saatin, Yeni Rakamların Kabulü ve Ölçülerde Değişiklik (1925)\nSoyadı Kanunu (1934)\nLâkap ve Unvanların Kaldırılması (1934)\n\nEğitim İnkılapları\n\nMillet Mektepleri'nin Açılması (1929)\nÖğretimin Birleştirilmesi (1924)\nMedreselerin Kapatılması (1924)\nMaarif Teşkilatı Hakkında Kanun (1926)\nHarf Devrimi'ne ilişkin kanunun kabulü (1928)\nGüzel Sanatlarda Yenilikler (1928)\nTürk Tarih Kurumu ve Türk Dil Kurumu'nun kurulması (1931)\nDil Devrimi'nin başlaması (1932)\nÜniversite Reformu (1933)\nÜniversite Öğreniminin Düzenlenmesi (1933)\n\nEkonomi İnkılapları\n\nİzmir İktisat Kongresi (1923)\nAşarın kaldırılması (1925)\nÇiftçinin Özendirilmesi (1925)\nÖrnek Çiftliklerin Kurulması (1925)\nTarım Kredi Kooperatifleri'nin Kurulması (1925)\nKabotaj Kanunu (1926)\nSanayi Teşvik Kanunu (1927)\nToprak reformu (1929)\nI ve II. Kalkınma Plânları (1933)\nYüksek Ziraat Enstitüsü'nün Kurulması (1933)\nTicaret ve Sanayi Odalarının Kurulması (1935)\n\nHukuk İnkılapları\n\nŞer'iyye Mahkemelerinin Kapatılması (1924)\nYeni Anayasanın Kabulü (1924)\nMecellenin Kaldırılması (1926)\nTürk Kanunu Medenisi (1926)\nTürk Ceza Kanunu (1926)`)
          .setThumbnail('https://cdn.discordapp.com/attachments/1020381311975817237/1033296694135234630/asda.jpg')
          .setColor("Purple")
      interaction.update({ embeds: [yardimMod] })

  }

      if (interaction.values[0] == "hayatı") {

      const yardimMod = new EmbedBuilder()
          .setTitle(`Atatürk'ün Hayatı`)
          .setDescription(`Mustafa Kemal Atatürk 1881 yılında Selanik’te doğdu. Ali Rıza Efendi babası, Zübeyde Hanım ise annesidir. Mustafa Kemal Atatürk’ün eğitim aldığı okullar baştan sona şöyledir; ilkokul eğitimini Mahalle Mektebinde ve Şemsi Efendi Okulunda, ortaokul eğitimini Selanik Mülkiye Rüştiyesi ve Selanik Askeri Rüştiyesinde, lise eğitimini Selanik Askeri İdadisi, üniversite eğitimini ise Harp Okulu ve Harp Akademisinde almıştır. 1893 yılında Askeri Rüştiye’de okurken matematik öğretmeni ona Kemal ismini verdi ve böylece ismi Mustafa Kemal oldu.
I. Dünya Savaşı nihayete erdiğinde Mondros Ateşkes antlaşması imzalanması ile vatan topraklarını paylaşılacaktı. Fakat duruma el koyan Mustafa Kemal, 19 Mayıs 1919’da Samsun’a çıkarak milli mücadelenin temellerini attı.
23 Nisan 1920 tarihinde TBMM’nin açılmasına önder olan Mustafa Kemal Meclis tarafından da Hükümet Başkanı seçildi. 5 Ağustos 1921’de yine Meclis tarafından Başkomutan seçildi. Sakarya Savaşı’nın kazanılmasındaki büyük emeklerinden dolayı Gazilik unvanı ve Mareşallik rütbesi ile şereflendirildi.
29 Ekim 1923 tarihinde Cumhuriyet ilan edildi ve Mustafa Kemal Atatürk Türkiye Cumhuriyeti’nin ilk Cumhurbaşkanı koltuğuna oturdu. 1934 yılında Gazi Mustafa Kemal’e meclis “Atatürk” soyadını lâyık gördü.
10 Kasım 1938 tarihinde Dolmabahçe Sarayı’nda hayatına veda etti. Tüm ülkeyi yasa boğdu. Ancak inkılapları ve ülkemize kazandırdıklarıyla kalbimizde sonsuzluğu ulaşmış bir liderdir.`)
           .setThumbnail('https://cdn.discordapp.com/attachments/1020381311975817237/1033296694135234630/asda.jpg')
          .setColor("Purple")
      interaction.update({ embeds: [yardimMod] })

}

      if (interaction.values[0] == "andımız") {

      const yardimMod = new EmbedBuilder()
          .setTitle(`Andımız`)
          .setDescription(`Türk'üm, doğruyum, çalışkanım,\nİlkem: küçüklerimi korumak, büyüklerimi saymak, yurdumu, milletimi özümden çok sevmektir.\nÜlküm: yükselmek, ileri gitmektir.\nEy Büyük Atatürk!\nAçtığın yolda, gösterdiğin hedefe durmadan yürüyeceğime ant içerim.\nVarlığım Türk varlığına armağan olsun.\nNe mutlu Türk'üm diyene!`)
           .setThumbnail('https://cdn.discordapp.com/attachments/1020381311975817237/1033296694135234630/asda.jpg')
          .setColor("Purple")
      interaction.update({ embeds: [yardimMod] })

}

      if (interaction.values[0] == "istiklal") {

      const yardimMod = new EmbedBuilder()
          .setTitle(`İSTİKLAL MARŞI`)
          .setDescription(`Korkma, sönmez bu şafaklarda yüzen al sancak;\nSönmeden yurdumun üstünde tüten en son ocak.\nO benim milletimin yıldızıdır, parlayacak;\nO benimdir, o benim milletimindir ancak.\n\nÇatma, kurban olayım çehreni ey nazlı hilâl!\nKahraman ırkıma bir gül… ne bu şiddet bu celâl?\nSana olmaz dökülen kanlarımız sonra helâl,\nHakkıdır, Hakk’a tapan, milletimin istiklâl.`)
           .setThumbnail('https://cdn.discordapp.com/attachments/1020381311975817237/1033296694135234630/asda.jpg')
          .setColor("Purple")
      interaction.update({ embeds: [yardimMod] })

}

      if (interaction.values[0] == "anasayfa") {

      const yardimMod = new EmbedBuilder()
        .setTitle(`Atatürk`)
        .setDescription("Atatürk'ün hayatını, yaptığı icraatleri ve daha fazlası için alttaki kategori seçiminden öğrenebilirsiniz.")
        .setImage('https://cdn.discordapp.com/attachments/1020381311975817237/1033295379879440525/192730_ataturk.jpg')
        .setThumbnail('https://cdn.discordapp.com/attachments/1020381311975817237/1033296694135234630/asda.jpg')
          .setColor("Purple")
      interaction.update({ embeds: [yardimMod] })

}





}})