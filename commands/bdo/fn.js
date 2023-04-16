const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const cheerio = require("cheerio");
const axios = require("axios");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hunt")
    .setDescription("Hunting orang pakai FamilyName")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Hunting Pakai Family Name")
        .setRequired(true)
    ),
  async execute(interaction) {
    const profile = interaction.options.getString("input");

    const url = `https://www.sea.playblackdesert.com/en-US/Adventure?searchType=2&searchKeyword=${profile}`;

    // axios(url).then(async (response) => {
    try {
      const response = await axios(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const infoTable = $(".box_list_area > ul.adventure_list_table > li");
      const infoPlayerArray = [];

      infoTable.each(function () {
        const fname = $(this).find(".title > a").text() || "Private";
        const cname =
          $(this)
            .find(
              ".user > .user_info > span.character_desc > span.text_area > span.text"
            )
            .text() || "Private";
        const jobp =
          $(this)
            .find(".user > .user_info > span.character_class > .name")
            .text() || "Private";
        const gname = $(this).find(".state > a").text() || "Private";
        const linkp = $(this).find(".title > a").attr("href") || "Private";

        infoPlayerArray.push({
          fname,
          cname,
          jobp,
          gname,
          linkp,
        });
      });
      //check array di console
      // console.log(infoPlayerArray);

      const embedInfo = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Buronan")
        .setTimestamp();
      infoPlayerArray.forEach(async (player) => {
        if (
          player.fname === "Private" &&
          player.cname === "Private" &&
          player.jobp === "Private" &&
          player.gname === "Private" &&
          player.linkp === "Private"
        ) {
          await interaction.reply(
            `\`\`\`Adventurer "${profile}" tidak ditemukan.\`\`\` `
          );
          // await interaction.channel.send(
          //   `Adventurer ${profile} tidak ditemukan.`
          // );
        } else {
          embedInfo.addFields(
            {
              name: "Family Name: ",
              value: `[${player.fname}](${player.linkp})`,
            },
            { name: "Main Character: ", value: player.cname },
            { name: "Class: ", value: player.jobp },
            { name: "Guild: ", value: player.gname }
          );
          //set link profile pada embedinfo fields index ke 0
          //validasi class untuk set thumbnail
          if (player.jobp === "Archer") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character29.jpg"
            );
          } else if (player.jobp === "Berserker") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character12.jpg"
            );
          } else if (player.jobp === "Corsair") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character10.jpg"
            );
          } else if (player.jobp === "Dark Knight") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character27.jpg"
            );
          } else if (player.jobp === "Drakania") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character7.jpg"
            );
          } else if (player.jobp === "Guardian") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character5.jpg"
            );
          } else if (player.jobp === "Hashashin") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character1.jpg"
            );
          } else if (player.jobp === "Kunoichi") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character25.jpg"
            );
          } else if (player.jobp === "Lahn") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character11.jpg"
            );
          } else if (player.jobp === "Maehwa") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character21.jpg"
            );
          } else if (player.jobp === "Maegu") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character15.jpg"
            );
          } else if (player.jobp === "Mystic") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character23.jpg"
            );
          } else if (player.jobp === "Musa") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character20.jpg"
            );
          } else if (player.jobp === "Ninja") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character26.jpg"
            );
          } else if (player.jobp === "Nova") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character9.jpg"
            );
          } else if (player.jobp === "Ranger") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character4.jpg"
            );
          } else if (player.jobp === "Sage") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character2.jpg"
            );
          } else if (player.jobp === "Shai") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character17.jpg"
            );
          } else if (player.jobp === "Sorceress") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character8.jpg"
            );
          } else if (player.jobp === "Striker") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character19.jpg"
            );
          } else if (player.jobp === "Tamer") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character16.jpg"
            );
          } else if (player.jobp === "Valkyrie") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character24.jpg"
            );
          } else if (player.jobp === "Warrior") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character0.jpg"
            );
          } else if (player.jobp === "Wizard") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character28.jpg"
            );
          } else if (player.jobp === "Witch") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character31.jpg"
            );
          } else if (player.jobp === "Woosa") {
            embedInfo.setThumbnail(
              "https://s1.pearlcdn.com/SEA/contents/img/common/character/character30.jpg"
            );
          }

          // await interaction.channel.send({ embeds: [embedInfo] });

          // await interaction.reply({ embeds: [embedInfo] });

          await interaction.deferReply({ ephemeral: false }); //botnya mode thinking / ephemeral diganti true kalau mau responnya cuman yang pake command yang bisa liat
          await wait(5000); // detik nunggu biar kalau botnya lemot ga shutdown si tolol

          //await interaction.followUp({ embeds: [embedInfo] }); // kirim pesan
          await interaction.editReply({ embeds: [embedInfo] }); // kirim pesan

          //followUp sama editReply sejauh ini sama responnya
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
};
