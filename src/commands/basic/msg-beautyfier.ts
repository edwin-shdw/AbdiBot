import { 
    ActionRowBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
    GuildMember,
    ModalActionRowComponentBuilder,
    ModalBuilder,
    ModalSubmitInteraction,
    SlashCommandBuilder,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('msg-beautyfier')
        .setDescription('Embede deine Nachricht um sie leserlicher und stylischer zu machen'),

    async execute(interaction: ChatInputCommandInteraction) {
        const modal = new ModalBuilder()
            .setCustomId('msg-beautyfier')
            .setTitle('Message Beautyfier');

        const title = new TextInputBuilder()
            .setCustomId('title')
            .setLabel('Titel')
            .setPlaceholder('Mein announcement')
            .setMaxLength(256)
            .setStyle(TextInputStyle.Short);

        const message = new TextInputBuilder()
            .setCustomId('message')
            .setLabel('Nachricht')
            .setPlaceholder('Ich muss euch berichten...')
            .setStyle(TextInputStyle.Paragraph);

        const row1 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(title);
        const row2 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(message);

        modal.addComponents(row1, row2);

        await interaction.showModal(modal);
    },

    async handleModal(interaction: ModalSubmitInteraction) {
        const title = interaction.fields.getTextInputValue('title');
        const message = interaction.fields.getTextInputValue('message');

        const member = interaction.member as GuildMember;

        const embed = new EmbedBuilder()
            .setAuthor({
                name: member.displayName,
                iconURL: member.displayAvatarURL(),
            })
            .setTitle(title)
            .setDescription(message);

        interaction.reply({ embeds: [embed] });
    }
}
