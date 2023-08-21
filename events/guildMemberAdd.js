const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const client = member.client;
        const roleChannel = await client.channels.fetch('1101249797811343501');
        const embed = new EmbedBuilder()
            .setTitle(`Hey ${member.user.username}!`)
            .setDescription(
                'Willkommen auf dem Discord Server der IT-Abteilung der BSZ III Regensburg! Wähl deine passende Rolle aus, um die richtigen Channels zu sehen. '
                + `Solltest du ein Klassensprecher sein, dann melde dich bei einem der Admins! Ich bin übrigends ${client.user.username}, der administrative Bot auf dem Sevrer!`,
            )
            .addFields(
                { name: 'Rollen:', value: `${roleChannel}` },
            );
        try {
            client.users.send(member.user.id, { embeds: [embed] });
        }
        catch {
            console.log(`Could not message ${member.user.username}`);
        }
    },
};
