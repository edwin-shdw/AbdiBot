import { Events } from 'discord.js';
import AbdiClient from '../structures/AbdiClient';

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client: AbdiClient) {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
    }
}
