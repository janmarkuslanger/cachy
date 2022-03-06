import Client, { Url, Parameter } from './client';
import Message from './messages';
import Cache from './cache';

type Config = {
    client: Client;
    cache: Cache;
};

class Cachy {
    private client: Client;
    private cache: Cache;

    constructor(config: Config) {
        if (!config) {
            throw new Error(Message.NO_CONFIG_GIVEN);
        }

        if (!config.client) {
            throw new Error(Message.NO_CLIENT_GIVEN);
        }

        if (!config.cache) {
            throw new Error(Message.NO_CACHE_GIVEN);
        }

        this.client = config.client;
        this.cache = config.cache;
    }

    public async get(url: Url, parameter?: Parameter) {
        if (this.client.get === undefined) {
            throw new Error(Message.NO_GET_IMPLEMENTATION);
        }

        return await this.client.get(url, parameter);
    }

    public async post(url: Url, parameter?: Parameter) {
        if (this.client.post === undefined) {
            throw new Error(Message.NO_POST_IMPLEMENTATION);
        }

        return await this.client.post(url, parameter);
    }

    public async update(url: Url, parameter?: Parameter) {
        if (this.client.update === undefined) {
            throw new Error(Message.NO_UPDATE_IMPLEMENTATION);
        }

        return await this.client.update(url, parameter);
    }

    public async delete(url: Url, parameter?: Parameter) {
        if (this.client.delete === undefined) {
            throw new Error(Message.NO_DELETE_IMPLEMENTATION);
        }

        return await this.client.delete(url, parameter);
    }
};

export default Cachy;