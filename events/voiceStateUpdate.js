const { Events, ChannelType } = require('discord.js');
const { generatorChannels } = require('../assets/channels.json');

module.exports = {
    name: Events.VoiceStateUpdate,
    execute(oldState, newState) {
        const user = newState.client.users.cache.get(newState.id);
        const newInitGen = generatorChannels.find(channel => channel.initChannelId === newState?.channel?.id);
        const oldInitGen = generatorChannels.find(channel => channel.parentId === oldState?.channel?.parentId);

        if(oldState.channelId !== newState.channelId && newInitGen?.initChannelId) {
            newState.guild.channels.create({ name: `${user.username}'s Room`, type: ChannelType.GuildVoice, parent: newInitGen.parentId }).then(channel => {
                newState.member.voice.setChannel(channel.id);
            });
        }
        if(oldInitGen?.parentId && oldState.channel.id !== oldInitGen?.initChannelId && oldState.channel.members.size === 0) {
            oldState.channel.delete();
        }
    },
};
