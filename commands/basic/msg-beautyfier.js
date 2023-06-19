const {
    ActionRowBuilder,
    EmbedBuilder,
    SlashCommandBuilder,
    TextInputBuilder,
    TextInputStyle,
    ModalBuilder,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('msg-beautyfier')
        .setDescription('Embede deine Nachricht um sie leserlicher und stylischer zu machen'),

    async execute(interaction) {
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

        const row1 = new ActionRowBuilder().addComponents(title);
        const row2 = new ActionRowBuilder().addComponents(message);

        modal.addComponents(row1, row2);

        await interaction.showModal(modal);
    },

    async handleModal(interaction) {
        const title = interaction.fields.getTextInputValue('title');
        const message = interaction.fields.getTextInputValue('message');

        const embed = new EmbedBuilder()
            .setAuthor({
                name: interaction.member.displayName,
                iconURL: interaction.member.displayAvatarURL(),
            })
            .setTitle(title)
            .setDescription(message);

        interaction.reply({ embeds: [embed] });
    },
};
