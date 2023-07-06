require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let intervalId = null; // Variable to store the interval ID

client.on('ready', () => {
  console.log(` Client ID: ${client.user.id} is ready for transformation!`);
  client.user.setActivity(`Transforming`);
});

client.on('messageCreate', (message) => {
  if (message.content.toLowerCase() === 'start') {
    if (!intervalId) {
      const channel = message.channel;
      intervalId = setInterval(() => {
        const randomMessage = getRandomMessage();
        channel.send(randomMessage);
      }, 30000); // 30 seconds
      message.channel.send('Bot started sending messages every 30 seconds.');
    }
  } else if (message.content.toLowerCase() === 'end' || message.content.toLowerCase() === 'stop') {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      message.channel.send('Bot stopped sending messages.');
    }
  }
});

function getRandomMessage() {
  const messages = [
    'Hello!',
    'Hi there!',
    'How are you?',
    'Greetings!',
    'Nice to meet you!',
  ];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

client.login(process.env.TOKEN);
