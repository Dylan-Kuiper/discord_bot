require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const commands = [
  {
    name: 'hey',
    description: 'Replies with hey!',
  },
  {
    name: 'ping',
    description: 'Pong!',
  },
  {
    name: 'setnotification',
    description: 'Set a notification with a specific date and time.',
    options: [
      {
        name: 'day',
        type: 4,
        description: 'Day of the notification (1-31)',
        required: true,
      },
      {
        name: 'month',
        type: 4,
        description: 'Month of the notification (1-12)',
        required: true,
      },
      {
        name: 'year',
        type: 4,
        description: 'Year of the notification',
        required: true,
      },
      {
        name: 'hour',
        type: 4,
        description: 'Hour of the notification (0-23)',
        required: true,
      },
      {
        name: 'minute',
        type: 4,
        description: 'Minute of the notification (0-59)',
        required: true,
      },
      {
        name: 'message',
        type: 3,
        description: 'Custom message for the notification',
        required: true,
      },
    ],
  },
];

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();