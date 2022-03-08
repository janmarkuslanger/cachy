import Cache from './cache';
import Client from './client';
import Errors from './errors';
import Request from './request';
import { RequestProperties } from './types.d';

type Config = {
    cache: Cache;
    client: Client;
};

class Cachy {
    private cache: Cache;
    private client: Client;

    constructor(config: Config) {
        if (!config?.cache) {
            throw new Error(Errors.NO_CACHE_IN_CONSTRUCTOR);
        }

        if (!config?.client) {
            throw new Error(Errors.NO_CLIENT_IN_CONSTRUCTOR);
        }

        this.cache = config.cache;
        this.client = config.client;
    }

    public async request({ url, method, data }: RequestProperties) {
        const request = new Request({
            url,
            method,
            data,
        });

        const response = await this.cache.handle(request);

        if (response !== false) {
            return response;
        }

        return await this.client.request(request);
    }
};

export default Cachy;