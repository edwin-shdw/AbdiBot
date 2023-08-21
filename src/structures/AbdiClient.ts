import { Client, ClientOptions, Collection } from 'discord.js';
import Command from '../interfaces/command';

export default class AbdiClient extends Client {
    public commands: Collection<string, Command>;

    constructor(clientOptions: ClientOptions) {
        super(clientOptions);
        this.commands = new Collection;
    }
}