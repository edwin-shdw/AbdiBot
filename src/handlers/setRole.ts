import { ButtonInteraction, GuildMember, InteractionResponse, Role } from 'discord.js';
const roles = require('../data/roles.json');

module.exports = {
    async selfSetRole(interaction: ButtonInteraction) {
        function reply(message: string) {
            interaction.reply({
                content: message,
                ephemeral: true,
            }).then((msg: InteractionResponse) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000);
            });
        }

        const member = interaction.member as GuildMember;
        const roleId = interaction.customId;
        const role = await interaction.guild?.roles.fetch(roles[roleId].id);
        if(!role) {
            reply('Diese Rolle existiert anscheinend nicht mehr :(');
        }
        else if(member.roles.cache.some(r => r === role)) {
            reply(`Ich habe die Rolle ${role?.name} entfernt!`);
        }
        else {
            member.roles.add(role);
        }
    }
}
