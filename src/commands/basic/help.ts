import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { descriptions } from '../../data/help.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Zeigt eine Liste mit allen Commands und Erklärungen')
        .setDMPermission(false),

    async execute(interaction: ChatInputCommandInteraction) {
        const commands = await interaction.client.application.commands.fetch();

        const embed = new EmbedBuilder()
            .setTitle(':information_source: Ich bin hier um zu helfen!')
            .setDescription('Hier ist eine Liste mit allen Commands und einer erklärung:')
            .addFields(
                commands.filter(command => !command.defaultMemberPermissions).map(command => {
                    const descriptionKey = command.name as keyof typeof descriptions;
                    return { name: `</${command.name}:${command.id}>`, value: ('```' + `${descriptions[descriptionKey]}` + '```') };
                }),
            );

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}
