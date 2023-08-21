import { CommandInteraction, ModalSubmitInteraction, SlashCommandBuilder } from 'discord.js';

export default interface Command {
    data: SlashCommandBuilder;
    execute(interaction: CommandInteraction): void;
    handleModal(interaction: ModalSubmitInteraction): void;
}