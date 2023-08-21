import { Events, EmbedBuilder, GuildMember, roleMention } from 'discord.js';
import { roleChannelID } from '../configs/config.json';

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member: GuildMember) {
        const client = member.client;
        const roleChannel = await client.channels.fetch(roleChannelID);
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
    }
}
