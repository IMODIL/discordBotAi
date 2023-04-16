const { Events, Client, GatewayIntentBits } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { openAIkey, clientId } = require("../config.json");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    //dec openai KEY
    //=====================
    if (message.author.bot) return;
    //=========================
    const openai = new OpenAIApi(
      new Configuration({
        apiKey: openAIkey,
      })
    );
    //end

    //nama channel ditentukan
    const ChannelName = "ai-chat";
    //cek channel by name or id
    const textC = message.guild.channels.cache.find(
      (channel) => channel.name === ChannelName || channel.id === ChannelName
    );
    const mention = String(textC);

    if (!textC) {
      message.reply(
        "text channel has not been created yet. please use **/setup** for the first time use."
      );
      return;
    }
    if (message.mentions.users.has(clientId)) {
      // console.log("test mention")
      if (message.channel.name !== ChannelName) {
        message.reply(`please use me in ${mention} senpai 😎`);
      }
    } else {
      // console.log("non mention");
      return;
    }
    // console.log("test");
    // console.log("test2");
    if (message.channel.name === ChannelName) {
      message.channel.sendTyping();
      try {
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant who responds succinctly",
            },
            {
              role: "user",
              content: message.content,
            },
          ],
        });
        const content = response.data.choices[0].message;
        return message.reply(content);
      } catch (error) {
        return message.reply("As an AI robot, I Errored out.");
      }
    } else {
      return;
    }
  },
};
