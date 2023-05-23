const { ActivityType, Events } = require('discord.js');
const { guildID } = require('../config.json');

let mode = 0;

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        setInterval(() => {
            if(mode == 0) {
                client.guilds.fetch(guildID).then(guild => {
                    guild.members.fetch().then(members => {
                        const memberCount = members.filter(member => !member.user.bot).size;
                        client.user.setActivity(`${memberCount} Members`, { type: ActivityType.Watching });
                    });
                });
                mode++;
            } else if(mode == 1) {
                client.user.setActivity("Source Code", { type: ActivityType.Watching });
                mode--;
            }
        }, 90_000);
    }
}
