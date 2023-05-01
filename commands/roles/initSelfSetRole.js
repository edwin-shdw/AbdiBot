const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('self-set-role')
    .setDescription('Init area where members can set there role'),

    async execute(interaction) {
        if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Dieser Command kann nur von Admins ausgeführt werden", ephemeral: true });
            return;
        }

        const channel = await interaction.guild.channels.fetch(interaction.channelId);
        const button_AE = new ButtonBuilder()
        .setCustomId('role_AE')
        .setEmoji('<:activeDeveloperBadge:1102664920543264768>')
        .setLabel('Anwendungsentwickler/-in')
        .setStyle(ButtonStyle.Secondary)

        const button_SI = new ButtonBuilder()
        .setCustomId('role_SI')
        .setEmoji('<:database:1102664969054597201>')
        .setLabel('Systemintegrator/-in')
        .setStyle(ButtonStyle.Secondary)

        const button_DPA = new ButtonBuilder()
        .setCustomId('role_DPA')
        .setEmoji('<:dataAnalyze:1102684626184573058>')
        .setLabel('Daten- und Prozessanalyst/-in')
        .setStyle(ButtonStyle.Secondary)

        const button_DV = new ButtonBuilder()
        .setCustomId('role_DV')
        .setEmoji('<:webhooks:1102685093077712977>')
        .setLabel('Digitale Vernetzer/-in')
        .setStyle(ButtonStyle.Secondary)

        const jobRow = new ActionRowBuilder()
        .addComponents(button_AE, button_SI, button_DPA, button_DV)

        const button_ITGS10 = new ButtonBuilder()
        .setCustomId('role_ITGS10')
        .setLabel('ITGS 10')
        .setStyle(ButtonStyle.Secondary)

        const button_ITFI11 = new ButtonBuilder()
        .setCustomId('role_ITFI11')
        .setLabel('ITFI 11')
        .setStyle(ButtonStyle.Secondary)

        const button_ITKL11 = new ButtonBuilder()
        .setCustomId('role_ITKL11')
        .setLabel('ITKL 11')
        .setStyle(ButtonStyle.Secondary)

        const button_ITAE12 = new ButtonBuilder()
        .setCustomId('role_ITAE12')
        .setLabel('ITAE 12')
        .setStyle(ButtonStyle.Secondary)

        const button_ITSI12 = new ButtonBuilder()
        .setCustomId('role_ITSI12')
        .setLabel('ITSI 12')
        .setStyle(ButtonStyle.Secondary)

        const button_ITKS12 = new ButtonBuilder()
        .setCustomId('role_ITKS12')
        .setLabel('ITKS 12')
        .setStyle(ButtonStyle.Secondary)

        const classRow1 = new ActionRowBuilder()
        .addComponents(button_ITGS10, button_ITFI11, button_ITKL11)

        const classRow2 = new ActionRowBuilder()
        .addComponents(button_ITAE12, button_ITSI12, button_ITKS12)

        interaction.reply({ content: "Initialized", ephemeral: true });
        channel.send({ content: "**Welchen Beruf hast du?**", components: [jobRow] });
        channel.send({ content: "**In welcher Klassenstufe bist du?**", components: [classRow1] });
        channel.send({ components: [classRow2] });
    }
}
