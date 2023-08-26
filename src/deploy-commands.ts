import { applicationID, botToken } from './configs/config.json';
import fs from 'node:fs';
import path from 'node:path';
import Command from './interfaces/command';
import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
const folderPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(folderPath);

for(const folder of commandFolders) {
    const commandPath = path.join(folderPath, folder);
    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
    for(const file of commandFiles) {
        const filePath = path.join(commandPath, file);
        const command = require(filePath) as Command;
        if('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        }
        else {
            console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`);
        }
    }
}

const rest = new REST().setToken(botToken);

(async () => {
    try{
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data: any = await rest.put(
            Routes.applicationCommands(applicationID),
            { body: commands },
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch(error) {
        console.error(error);
    }
})();
