const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tax")
    .setDescription("Menghitung profit jualan")
    .addNumberOption((option) =>
      option.setName("harga").setDescription("pasang harga").setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("jumlah")
        .setDescription("masukkan jumlah")
        .setRequired(true)
    ),
  async execute(interaction) {
    const opt1 = interaction.options.getNumber("harga");
    const opt2 = interaction.options.getNumber("jumlah");
    const result = opt1 * opt2;
    const wVp = result * 0.845;
    const woVp = result * 0.65;
    //format currency
    let uang = new Intl.NumberFormat("id-ID", {});
    //embed setting
    const resEmbed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("__Tax Market__")
      .addFields({
        name: "Total Harga Sebelum Tax",
        value: `\n\`\`\`js\n${uang.format(result)}\`\`\` \n`,
        inline: true,
      })
      .addFields({
        name: " ValuePack on :",
        value: `\`\`\`js\n${uang.format(wVp)}\n\`\`\``,
      })
      .addFields({
        name: "ValuePack off :",
        value: `\`\`\`js\n${uang.format(woVp)}\n\`\`\``,
      })
      .setTimestamp()
      .setFooter({ text: "Butuh silver " });
    //reply bentuk embed
    await interaction.reply({ embeds: [resEmbed] });
  },
};
