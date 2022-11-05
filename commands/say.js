const { EmbedBuilder, PermissionsBitField  } = require("discord.js");

exports.run = async (client, message, args) => {

  const memberCount = message.guild.members.cache.filter((member) => !member.user.bot).size || 0
  const fakeMemberCount = message.guild.members.cache.filter((member) => new Date().getTime() - client.users.cache.get(member.id).createdAt.getTime() < 1296000000).size || 0
  const botCount = message.guild.members.cache.filter((member) => member.user.bot).size || 0
  const permissionsMemberCount = message.guild.members.cache.filter((member) => member.permissions.has(PermissionsBitField.Flags.Administrator)).size || 0

   const embed = new EmbedBuilder()
   .setColor("#EB459E")
   .setTitle(`${message.guild.name} | Bilgiler`)
   .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
   .setDescription(`Gerçek Üyeler: **${memberCount}**\nSahte Üyeler: **${fakeMemberCount}**\nBotlar: **${botCount}**\nYetkili Üyeler: **${permissionsMemberCount}** `) 
   .setFooter({ text: `Sorgulayan ${message.author.tag}.`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })    
   .setTimestamp()  

   return message.reply({ embeds: [embed] })

};
exports.conf = {
  aliases: ["count"]
};

exports.help = {
  name: "say"
};