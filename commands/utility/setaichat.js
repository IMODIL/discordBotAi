const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup Text Channel For AI"),
  async execute(interaction) {
    interaction.guild.channels
      .create({
        name: "ai-chat",
        type: ChannelType.GuildText,
      })
      .then((channel) => {
        interaction.reply(`Succesfully crafted text channel: ${channel.name}`);
      });
  },
};
