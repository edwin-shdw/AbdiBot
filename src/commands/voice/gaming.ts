import {
    BaseGuildVoiceChannel,
    ChannelType,
    ChatInputCommandInteraction,
    GuildMember,
    SlashCommandBuilder,
    TextBasedChannel
} from 'discord.js';
import roles from '../../data/roles.json';
import { gamingPingChannelId, generatorChannels } from '../../data/channels.json';

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
        .addBooleanOption(option  =>
            option
                .setName('notify')
                .setDescription('Erstellt eine Benachrichtigung, dass du Spielen willst'),
        )
        .setDMPermission(false),

    async execute(interaction: ChatInputCommandInteraction) {
        const member = interaction.member as GuildMember;
        const gameName = interaction.options.getString('name');
        const notify = interaction.options.getBoolean('notify');
        const notifyRole = await interaction.guild?.roles.fetch(roles['role_Gamer'].id);

        await interaction.guild?.channels.create({
            name: gameName!,
            type: ChannelType.GuildVoice,
            parent: generatorChannels[1].parentId,
        })
        .then((channel: BaseGuildVoiceChannel) => {
            if(member.voice.channelId) member.voice.setChannel(channel.id);
            interaction.reply({
                content: `Ich habe den Channel ${channel} erstellt. Viel spass beim Zocken!`,
                ephemeral: true,
            });

            if(notify) {
                const notifyChannel = interaction.client.channels.cache.get(gamingPingChannelId) as TextBasedChannel;
                notifyChannel?.send(`${notifyRole}'s, ${member} will ${channel} spielen. Spiel doch mit!`);
            }

            setTimeout(async () => {
                const channels = await interaction.guild?.channels.fetch();
                if(channels?.get(channel.id) && channel.members.size === 0) {
                    channel.delete();
                    interaction.editReply({
                        content: ':warning: Der Channel wurde gelöscht, weil keiner gejoined ist.'
                    });
                }
            }, 60_000);
        })
        .catch((error) => {
            console.log(error);
            interaction.reply({
                content: 'Ich konnte keinen Kanal erstellen :(',
                ephemeral: true,
            });
            return;
        });
    }
}
