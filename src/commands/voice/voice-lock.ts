import {
    ChatInputCommandInteraction,
    codeBlock,
    EmbedBuilder,
    GuildMember,
    GuildTextBasedChannel,
    PermissionFlagsBits,
    SlashCommandBuilder
} from 'discord.js';
import { generatorChannels } from '../../data/channels.json';
import { descriptions } from '../../data/voiceLock.json';

async function help(interaction: ChatInputCommandInteraction) {
    const commands = await interaction.client.application.commands.fetch();
    const voiceCommand = commands.find(command => command.name === 'voice');

    const embed = new EmbedBuilder()
        .setTitle(':loud_sound: Auto-Voice Help')
        .setDescription('Hier ist eine Liste mit Commands mit denen man sein Auto-Created-Channel anpassen kann.');

    if(voiceCommand?.options) {
        embed.addFields(
            voiceCommand.options.map(option => {
                const descriptionKey = option.name as keyof typeof descriptions;
                return { 
                    name: `</voice ${option.name}:${voiceCommand.id}>`,
                    value: (codeBlock(`${descriptions[descriptionKey]}`))
                }
            }),
        );
    }

    const channel = interaction.channel as GuildTextBasedChannel;
    const silently = Boolean(generatorChannels.find(c => c.parentId === channel.parentId));
    interaction.reply({ embeds: [embed], ephemeral: silently });
}

async function channelLock(interaction: ChatInputCommandInteraction) {
    const member = interaction.member as GuildMember;
    const channel = member.voice.channel;
    channel?.permissionOverwrites.set([{
        id: interaction.guild!.id,
        deny: [PermissionFlagsBits.Connect],
    }]);
    await interaction.reply({
        content: 'Keiner kann mehr dem Channel joinen!',
        ephemeral: true,
    });
}

async function channelUnlock(interaction: ChatInputCommandInteraction) {
    const member = interaction.member as GuildMember;
    const channel = member.voice.channel;
    channel?.permissionOverwrites.set([{
        id: interaction.guild!.id,
        allow: [PermissionFlagsBits.Connect],
    }]);
    await interaction.reply({
        content: 'Man kann jetzt dem Channel joinen!',
        ephemeral: true,
    });
}

async function channelKick(interaction: ChatInputCommandInteraction) {
    const member = interaction.member as GuildMember; 
    const targetUser = interaction.options.getUser('user');
    
    if(!targetUser) {
        interaction.reply({
            content: 'Ich kann diesen User nicht finden!',
            ephemeral: true,
        });
        return;
    }

    const targetMember = await interaction.guild?.members.fetch(targetUser.id);

    if(!targetMember) {
        interaction.reply({
            content: 'Ich kann diesen User nicht finden!',
            ephemeral: true,
        });
        return;
    }
    
    if(member.voice.channel?.id === targetMember.voice.channelId) {
        targetMember.voice.disconnect();
        interaction.reply({
            content: `${targetUser} wurde gekickt!`,
            ephemeral: true,
        });
    }
    else {
        await interaction.reply({
            content: `Du musst mit ${targetUser} im selben Auto-Voice-Channel sein!`,
            ephemeral: true,
        });
    }
}

async function channelLimit(interaction: ChatInputCommandInteraction) {
    const member = interaction.member as GuildMember;
    const channel = member.voice.channel;
    const limit = interaction.options.getInteger('limit') as number;

    channel?.setUserLimit(limit);
    if(limit === 0) {
        interaction.reply({
            content: 'Du musst in einem Channel sein um diesen Command verwenden zu können!',
            ephemeral: true
        });
        return false;
    }
    else {
        await interaction.reply({
            content: `Dein Channel hat jetzt ein Limit von ${limit}!`,
            ephemeral: true
        });
    }
}

async function checkChannel(interaction: ChatInputCommandInteraction): Promise<boolean> {
    const member = interaction.member as GuildMember; 
    const channel = member.voice.channel;
    if(!channel) {
        interaction.reply({ content: 'Du musst in einem Channel sein um diesen Command verwenden zu können!', ephemeral: true });
        return false;
    }
    if(generatorChannels.find(c => c.parentId === channel?.parentId)) {
        return true;
    }
    else {
        interaction.reply({ content: 'Du musst in deinem Auto-Voice-Channel sein, um diesen Command benutzen zu können!', ephemeral: true });
        return false;
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('voice')
        .setDescription('Auto-Voice commands')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Zeigt alle /voice Commands'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lock')
                .setDescription('Sperrt deinen aktuellen Channel, keine neuen User können mehr joinen'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unlock')
                .setDescription('Entsperrt deinen aktuellen Channel, neue User können joinen'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('kick')
                .setDescription('Kick einen User aus deinem Voice Channel')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('Der User welcher gekickt werden soll')
                        .setRequired(true),
                ),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('limit')
                .setDescription('Legt ein Limit wieviele User joinen können')
                .addIntegerOption(option =>
                    option
                        .setName('limit')
                        .setDescription('Maximale Anzahl an User im Channel')
                        .setRequired(true)
                        .setMinValue(0)
                        .setMaxValue(99),
                ),
        )
        .setDMPermission(false),

    async execute(interaction: ChatInputCommandInteraction) {
        switch(interaction.options.getSubcommand()) {
            case 'help':
                await help(interaction);
                break;
            case 'lock':
                if(await checkChannel(interaction)) await channelLock(interaction);
                break;
            case 'unlock':
                if(await checkChannel(interaction)) await channelUnlock(interaction);
                break;
            case 'kick':
                if(await checkChannel(interaction)) await channelKick(interaction);
                break;
            case 'limit':
                if(await checkChannel(interaction)) await channelLimit(interaction);
                break;
            default:
                interaction.reply({
                    content: 'Whoops, etwas ist schief gelaufen :flushed:',
                    ephemeral: true,
                });
        }
    }
}
