const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder, channelLink } = require('discord.js');
const { generatorChannels } = require('../../assets/channels.json');
const { descriptions } = require('../../assets/commands/voiceLock.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('voice')
    .setDescription('Auto-Voice commands')
    .addSubcommand(subcommand =>
        subcommand
            .setName('help')
            .setDescription('Zeigt alle /voice Commands')
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName('lock')
            .setDescription('Sperrt deinen aktuellen Channel, keine neuen User können mehr joinen')
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName('unlock')
            .setDescription('Entsperrt deinen aktuellen Channel, neue User können joinen')
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName('kick')
            .setDescription('Kick einen User aus deinem Voice Channel')
            .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('Der User welcher gekickt werden soll')
                    .setRequired(true)
            )
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
                    .setMaxValue(99)
            )
    ),

    async execute(interaction) {
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
                interaction.reply({ content: "Whoops, etwas ist schief gelaufen :flushed:", ephemeral: true });
        }
    }
}

async function help(interaction) {
    const commands = await interaction.guild.commands.fetch();
    const voiceCommand = commands.find(command => command.name === "voice");

    const embed = new EmbedBuilder()
    .setTitle(':loud_sound: Auto-Voice Help')
    .setDescription('Hier ist eine Liste mit Commands mit denen man sein Auto-Created-Channel anpassen kann.')
    .addFields(
        voiceCommand.options.map(option => {
            return { name: `</voice ${option.name}:${voiceCommand.id}>`, value: ('```' + descriptions[option.name] + '```') };
        }),
    )

    if(generatorChannels.find(c => c.parentId === interaction.channel?.parentId)) {
        interaction.reply({ embeds: [embed] });
    } else interaction.reply({ embeds: [embed], ephemeral: true });
} 

async function channelLock(interaction) {
    const channel = interaction.member.voice.channel;
    channel.permissionOverwrites.set([
        {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.Connect],
        }
    ]);
    await interaction.reply({ content: "Keiner kann mehr dem Channel joinen!", ephemeral: true });
}

async function channelUnlock(interaction) {
    const channel = interaction.member.voice.channel;
    channel.permissionOverwrites.set([
        {
            id: interaction.guild.id,
            allow: [PermissionsBitField.Flags.Connect],
        }
    ]);
    await interaction.reply({ content: "Man kann jetzt dem Channel joinen!", ephemeral: true });
}

async function channelKick(interaction) {
    const targetUser = interaction.options.getUser('user');
    const targetMember = await interaction.guild.members.fetch(targetUser.id);
    if(interaction.member.voice.channel.id === targetMember.voice.channelId) {
        targetMember.voice.disconnect();
        interaction.reply({ content: `${targetUser} wurde gekickt!`, ephemeral: true });
    } else {
        interaction.reply({ content: `Du musst mit ${targetUser} im selben Auto-Voice-Channel sein!`, ephemeral: true });
    }

}

async function channelLimit(interaction) {
    const channel = interaction.member.voice.channel;
    const limit = interaction.options.getInteger('limit');
    channel.setUserLimit(limit)
    if(limit === 0) {
        await interaction.reply({ content: 'Dein Channel hat jetzt kein Limit mehr!', ephemeral: true });
    } else {
        await interaction.reply({ content: `Dein Channel hat jetzt ein Limit von ${limit}!`, ephemeral: true });
    }
}

async function checkChannel(interaction) {
    const channel = interaction.member.voice.channel;
    if(!channel) {
        interaction.reply({ content: "Du musst in einem Channel sein um diesen Command verwenden zu können!", ephemeral: true });
        return false;
    }
    if(generatorChannels.find(c => c.parentId === channel?.parentId)) {
        return true;
    } else {
        interaction.reply({ content: "Du musst in deinem Auto-Voice-Channel sein, um diesen Command benutzen zu können!", ephemeral: true });
        return false;
    }
}
