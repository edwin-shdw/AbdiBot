import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Zeige Infos über den Bot'),

    async execute(interaction: ChatInputCommandInteraction) {
        const silently = Boolean(interaction.guild);
        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('Info')
            .setDescription(
                'Ich bin Abdi, ein administrativer Discord Bot für den [IT-ler BSZ III](https://discord.gg/Hp6v3ry7Us) '
            + 'Server. Ich bin ein [Open Source Projekt](https://github.com/edwin-shdw/AbdiBot) und wurde von '
            + '[Edwin](https://edwin-shdw.de) und meinen [Contributers](https://github.com/edwin-shdw/AbdiBot/graphs/contributors) '
            + 'erstellt. Unterstütz mich doch in dem du an meinem Code arbeitest oder falls coden nicht deins ist mit einer kleinen '
            + '[Spende](https://paypal.me/plsineedthatcash), um meine Server kosten zu zahlen!'
            );

        interaction.reply({ embeds: [embed], ephemeral: silently });
    }
}
