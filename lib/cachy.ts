import Cache from './cache';
import Storage from './storage';
import Client from './client';
import Errors from './errors';
import Request from './request';
import { RequestProperties } from './types.d';

type Config = {
    cache: Cache;
    storage: Storage;
    client: Client;
};

class Cachy {
    private cache: Cache;
    private storage: Storage;
    private client: Client;

    constructor(config: Config) {
        if (!config?.cache) {
            throw new Error(Errors.NO_CACHE_IN_CONSTRUCTOR);
        }

        if (!config?.storage) {
            throw new Error(Errors.NO_STORAGE_IN_CONSTRUCTOR);
        }

        if (!config?.client) {
            throw new Error(Errors.NO_CLIENT_IN_CONSTRUCTOR);
        }

        this.cache = config.cache;
        this.storage = config.storage;
        this.client = config.client;
    }

    public async request({ url, method, data }: RequestProperties) {
        const request = new Request({
            url,
            method,
            data,
        });

        return await this.client.request(request);
    }
};

export default Cachy;