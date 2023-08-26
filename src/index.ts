import {
    ActivityType,
    GatewayIntentBits
} from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import AbdiClient from './structures/AbdiClient';
import Command from './interfaces/command';
import { botToken } from './configs/config.json';

const client = new AbdiClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
    ],
    presence: {
        activities: [{
            name: 'Source Code',
            type: ActivityType.Watching,
        }],
    },
});

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for(const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for(const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command: Command = require(filePath);
        if('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }
        else {
            console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`);
        }
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
