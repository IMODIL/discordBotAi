// Require the necessary discord.js classes
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ChannelType,
} = require("discord.js");
const { token } = require("./config.json");
const path = require("node:path");
const fs = require("node:fs");
const { channel } = require("node:diagnostics_channel");
// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

//open AI
// const openai = new OpenAIApi(
//   new Configuration({
//     apiKey: openAIkey,
//   })
// );

// client.on("messageCreate", async function (message) {
//   if (message.author.bot) return;
//   //nama channel ditentukan
//   const ChannelName = "ai-chat";
//   //cek channel by name or id
//   const textC = message.guild.channels.cache.find(
//     (channel) => channel.name === ChannelName || channel.id === ChannelName
//   );
//   const mention = textC.toString();
//   if (!textC) {
//     message.reply(
//       "text channel has not been created yet. please use **/setup** for the first time use."
//     );
//   } else {
//     if (message.channel.name !== ChannelName) {
//       message.reply(`please use me in ${mention} senpai 😎`);
//       return;
//     }
//     message.channel.sendTyping();

//     try {
//       const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [
//           {
//             role: "system",
//             content: "You are a helpful assistant who responds succinctly",
//           },
//           {
//             role: "user",
//             content: message.content,
//           },
//         ],
//       });
//       const content = response.data.choices[0].message;
//       return message.reply(content);
//     } catch (error) {
//       return message.reply("As an AI robot, I Errored out.");
//     }
//   }
// });

//loading command
client.commands = new Collection();
//read directory commands file ( COMMAND FILE HARUS DIDALAM SUBFOLDER )
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] the command at ${filePath} is missing a required "data" or "Execute" property.`
      );
    }
  }
}

//read directory events handler
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(token);
