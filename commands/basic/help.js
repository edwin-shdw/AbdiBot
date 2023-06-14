const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { descriptions } = require('../../assets/commands/help.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Zeigt eine Liste mit allen Commands und Erklärungen')
        .setDMPermission(false),

    async execute(interaction) {
        const commands = await interaction.guild.commands.fetch();

        const embed = new EmbedBuilder()
            .setTitle(':information_source: Ich bin hier um zu helfen!')
            .setDescription('Hier ist eine Liste mit allen Commands und einer erklärung:')
            .addFields(
                commands.filter(command => !command.defaultMemberPermissions).map(command => {
                    return { name: `</${command.name}:${command.id}>`, value: ('```' + `${descriptions[command.name]}` + '```') };
                }),
            );

        interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
