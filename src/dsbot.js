const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('../config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cron = require('node-cron')

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);

    client.commands.set(command.name, command);
}

try {
    client.login(token)
} catch (error) {
    throw `Cannot login properly: ${error}`
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
        // cron.schedule("45 16 * * *", commands.autoReport(Discord, client)); // production
        // cron.schedule("* * * * *", commands.autoReport(client)); // test
})

client.on('message', (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    console.log(args)
    try {
        client.commands.get(command).execute(client, msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
})