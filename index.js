const fs = require('node:fs');
const path = require('node:path');
const { ActivityType, Client, Collection, GatewayIntentBits } = require('discord.js');
const { botToken } = require('./config.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers],
    presence: {
        activities: [{
            name: 'Source Code',
            type: ActivityType.Watching,
        }],
    },
});
client.commands = new Collection();

// guild commands
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for(const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for(const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }
        else {
            console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`);
        }
    }
}

// global commands
const globalCommandsPath = path.join(__dirname, 'commands-global');
const globalCommandFiles = fs.readdirSync(globalCommandsPath);

for(const file of globalCommandFiles) {
    const filePath = path.join(globalCommandsPath, file);
    const command = require(filePath);
    if('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`);
    }
}


// events
const eventsPath = path.join(__dirname, 'events');
const eventFile = fs.readdirSync(eventsPath);

for(const file of eventFile) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if(event.once) {
        client.once(event.name, (...args) => {event.execute(...args);});
    }
    else {
        client.on(event.name, (...args) => {event.execute(...args);});
    }
}

client.login(botToken);
