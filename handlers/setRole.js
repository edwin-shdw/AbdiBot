const roles = require('../assets/roles.json');

module.exports = {
    async selfSetRole(interaction) {
        function reply(message) {
            interaction.reply({ content: message, ephemeral: true }).then(msg => {
                setTimeout(() => { msg.delete(); }, 5000);
            });
        }

        const member = interaction.member;
        const roleId = interaction.customId;
        const role = await interaction.guild.roles.fetch(roles[roleId].id);
        if(member.roles.cache.some(r => r === role)) {
            member.roles.remove(role);
            reply(`Ich hab die Rolle ${role.name} entfernt!`);
        }
        else {
            member.roles.add(role);
            reply(`Du hast jetzt die Rolle ${role.name}!`);
        }
    },
};
