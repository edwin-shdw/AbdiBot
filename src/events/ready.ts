import { ActivityType, Events } from 'discord.js';
import { guildID } from '../configs/config.json';
import AbdiClient from '../structures/AbdiClient';

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client: AbdiClient) {
        console.log(`Ready! Logged in as ${client.user?.tag}`);

        let mode = 0;
        setInterval(() => {
            if(mode == 0) {
                client.guilds.fetch(guildID).then(guild => {
                    guild.members.fetch().then(members => {
                        const memberCount = members.filter(member => !member.user.bot).size;
                        client.user?.setActivity(`${memberCount} Members`, { type: ActivityType.Watching });
                    });
                });
                mode++;
            }
            else if(mode == 1) {
                client.user?.setActivity('Source Code', { type: ActivityType.Listening });
                mode--;
            }
        }, 90_000)
    }
}
