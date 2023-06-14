const { ChannelType, SlashCommandBuilder } = require('discord.js');
const roles = require('../../assets/roles.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gaming')
        .setDescription('Erstellt ein Gaming VC für dich')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Name vom Spiel')
                .setRequired(true)
                .setMaxLength(100),
        )
        .addBooleanOption(option =>
            option
                .setName('notify')
                .setDescription('Erstellt eine Benachrichtigung, dass du Spielen willst'),
        ),

    async execute(interaction) {
        const member = interaction.member;
        const gameName = interaction.options.getString('name');
        const notify = interaction.options.getBoolean('notify');
        const notifyRole = await interaction.guild.roles.fetch(roles['role_Gamer'].id);

        interaction.guild.channels.create({ name: `${gameName}`, type: ChannelType.GuildVoice, parent: '1101253734287286282' }).then((channel) => {
            const channelId = channel.id;
            if(member.voice.channelId) member.voice.setChannel(channel.id);
            interaction.reply({ content: `Ich habe den Channel ${channel} erstellt. Viel spass beim Zocken!`, ephemeral: true });
            if(notify) {
                interaction.client.channels.cache
                    .get('1104100093826703391')
                    .send(`${notifyRole}'s, ${member} will ${channel} spielen. Spiel doch mit!`);
            }
            setTimeout(async () => {
                const channels = await interaction.guild.channels.fetch();
                if(channels.get(channelId) && channel.members.size === 0) {
                    channel.delete();
                    interaction.editReply({ content: ':warning: Der Channel wurde gelöscht, weil keiner gejoined ist.', ephemeral: true });
                }
            }, 60_000);
        }).catch((error) => {
            console.log(error);
        });
    },
};
