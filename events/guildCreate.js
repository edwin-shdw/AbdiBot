const { Events, EmbedBuilder } = require('discord.js');
const { guildID } = require('../config.json');

module.exports = {
    name: Events.GuildCreate,
    async execute(guild) {
        if(guild.id === guildID) return;
        const embed = new EmbedBuilder()
        .setTitle('Ich wurde auf deinen Server eingeladen!')
        .setDescription(
            'Danke für deine Interesse an mir, jedoch bin ich ein administrativer Bot für einen Schulserver. '
            +'Solltest du jedoch einen Bot wie mich für deinen Server wünschen, dann solltest du dich bei [Edwin](https://www.discordapp.com/users/698962714000752782) melden!'
        )

        guild.client.users.send(guild.ownerId, { embeds: [embed] });
        guild.leave();
    }
}
