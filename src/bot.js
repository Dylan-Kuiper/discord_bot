require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let intervalId = null; // Variable to store the interval ID

client.on('ready', () => {
  coloredLog(` Client ID: ${client.user.id} is ready for transformation!`, 35);
  client.user.setActivity(`Transforming`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options, user } = interaction;

  if (commandName === 'setnotification') {
    const day = options.getInteger('day');
    const month = options.getInteger('month');
    const year = options.getInteger('year');
    const hour = options.getInteger('hour');
    const minute = options.getInteger('minute');
    const message = options.getString('message');

    // Calculate the notification timestamp
    const timestamp = new Date(year, month - 1, day, hour, minute, 0);

    // Calculate the time until the notification in milliseconds
    const timeUntilNotification = timestamp - Date.now();

    if (timeUntilNotification <= 0) {
      await interaction.reply('Invalid date and time for the notification.');
    } else {
      // Schedule the notification
      setTimeout(async () => {
        // Mention the user and send the notification message
        await interaction.followUp(`Hey <@${user.id}>, here's your notification: ${message}`);
      }, timeUntilNotification);
      await interaction.reply('Notification set successfully!');
    }
  }
});

function coloredLog(text, colorCode) {
  console.log(`\x1b[${colorCode}m%s\x1b[0m`, text);
}



client.login(process.env.TOKEN);
