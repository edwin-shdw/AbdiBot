const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Zeige Infos über den Bot'),

    async execute(interaction) {
        const silently = interaction.guild ? true : false;
        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('Info')
            .setDescription(
                'Ich bin Abdi, ein administrativer Discord Bot für den [IT-ler BSZ III](https://discord.gg/Hp6v3ry7Us) '
            + 'Server. Ich bin ein [Open Source Projekt](https://github.com/edwin-shdw/AbdiBot) und wurde von '
            + '[Edwin](https://edwin-shdw.de) und meinen [Contributers](https://github.com/edwin-shdw/AbdiBot/graphs/contributors) '
            + 'erstellt. Unterstütz mich doch in dem du an meinem Code arbeitest oder falls coden nicht deins ist mit einer kleinen '
            + '[Spende](https://paypal.me/plsineedthatcash), um meine Server kosten zu zahlen!',
            )
            .addFields(
                { name: '\u200B', value: '**Mein Status:**' },
                { name: '<:online:1106630500338122802> Online', value: 'Online und bereit zur Nutzung!' },
                { name: '<:idle:1106630526686736424> Idle/<:doNotDisturb:1106630538208477195> DnD', value: 'An mir wird gearbeitet. Womöglich funktioniere ich im moment nicht...' },
                { name: '<:offline:1106630514686820382> Offline', value: 'Offline' },
            );

        interaction.reply({ embeds: [embed], ephemeral: silently });
    },
};
