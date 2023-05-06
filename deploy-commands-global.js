const { REST, Routes } = require('discord.js');
const { applicationID, botToken } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandPath = path.join(__dirname, 'commands-global');
const commandFiles = fs.readdirSync(commandPath);

for(const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);
    if('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`);
    }
}

const rest = new REST().setToken(botToken);

(async () => {
    try{
        console.log(`Started refreshing ${commands.length} global application (/) commands.`);
        const data = await rest.put(
            Routes.applicationCommands(applicationID),
            { body: commands },
        );
        console.log(`Successfully reloaded ${data.length} global application (/) commands.`);
    } catch(error) {
        console.error(error);
    }
})();
