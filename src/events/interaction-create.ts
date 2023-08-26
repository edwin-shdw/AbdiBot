import { ButtonInteraction, CommandInteraction, Events, ModalSubmitInteraction } from 'discord.js';
import AbdiClient from '../structures/AbdiClient';
const { selfSetRole } = require('../handlers/setRole');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction: CommandInteraction) {
        const AbdiClient = interaction.client as AbdiClient;
        if(interaction.isChatInputCommand()) {
            const client = interaction.client as AbdiClient;
            const command = client.commands.get(interaction.commandName);

            if(!command) {
                console.error(`No command matching ${interaction.commandName} was found`);
                return;
            }

            try {
                await command.execute(interaction);
            }
            catch(error) {
                console.log(`Error executing ${interaction.commandName}`);
                console.log(error);
                if(interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
                else {
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
            }
        }
        else if(interaction.isButton()) {
            const buttonInteraction = interaction as ButtonInteraction;
            try {
                await selfSetRole(buttonInteraction);
            }
            catch(error) {
                console.log(error);
            }
        }
        else if(interaction.isModalSubmit()) {
            const modalInteraction = interaction as ModalSubmitInteraction;
            const command = AbdiClient.commands.get(modalInteraction.customId);

            if(!command) {
                console.error(`No command matching ${modalInteraction.customId} was found`);
                return;
            }

            try {
                await command.handleModal(interaction);
            }
            catch(error) {
                console.log(`Error executing ${command}`);
                console.log(error);
                if(modalInteraction.replied || modalInteraction.deferred) {
                    await modalInteraction.followUp({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
                else {
                    await modalInteraction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
            }
        }
    }
}
