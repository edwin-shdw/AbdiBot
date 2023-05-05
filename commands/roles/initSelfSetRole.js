const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('self-set-role')
    .setDescription('Init area where members can set there role')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const channel = await interaction.guild.channels.fetch(interaction.channelId);

        // JOB ROLES
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

        const jobEmbed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle('**Welchen Beruf hast du?**')


        // CLASS ROLES
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

        const classEmbed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle('**In welcher Klassenstufe bist du?**')


        // GAMER ROLE
        const button_Gamer = new ButtonBuilder()
        .setCustomId('role_Gamer')
        .setLabel("I'm a Gamer!")
        .setStyle(ButtonStyle.Secondary)

        const gamingRow = new ActionRowBuilder()
        .addComponents(button_Gamer)

        const gamerEmbed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle('**Mit der Gamer Rolle wirst du benachrichtigt, wenn jemand zocken will!**')


        interaction.reply({ content: "Initialized", ephemeral: true });
        channel.send({ embeds: [jobEmbed], components: [jobRow] });
        channel.send({ embeds: [classEmbed], components: [classRow1, classRow2] });
        channel.send({ embeds: [gamerEmbed], components: [gamingRow] });
    }
}
