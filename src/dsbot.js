require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

try {
    client.login(process.env.dsBotToken)
} catch (error) {
    throw `Cannot login properly: ${error}`
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let number = 0

client.on('message', msg => {
    if (msg.author.username != client.user.username) {
        if (msg.content.includes("-hh help")) {
            msg.channel.send(`${msg.author}, currently my commands are: \n-hh play: if you want to start a game\n -hh number {insert your guess here}": to guess the current number`)
        }

        if (msg.content == "-hh play") {
            if (number == 0) {
                number = Math.ceil(Math.random() * (10 - 1) + 1)
                msg.channel.send(`Pick a number between ${1} and ${10}`)
            } else {
                msg.channel.send(`There is a game in progress, wait for you turn ${msg.author}`)
            }
        }

        if (msg.content.includes("-hh number")) {
            const attachment = (url) => {
                return new Discord.MessageAttachment(url);
            }

            if (msg.content.includes(number)) {
                msg.channel.send(`Nicely done ${msg.author}`, attachment('https://pbs.twimg.com/profile_images/998263990206676992/NcFtEjym_400x400.jpg'))
                number = 0
            } else {
                msg.channel.send(`Wrong number ${msg.author}, try again!`, attachment('https://i.imgur.com/w3duR07.png'))
                console.log(number)
            }
        }
    }
});