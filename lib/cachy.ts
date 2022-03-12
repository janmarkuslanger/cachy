import Cache from './cache';
import Client from './client';
import Errors from './errors';
import Request from './request';
import { RequestProperties, Id } from './types.d';

type Options = {
    generateId?: (request: Request) => Id; 
}

type Config = {
    cache: Cache;
    client: Client;
    options?: Options;
};

class Cachy {
    private cache: Cache;
    private client: Client;
    private options?: Options;

    constructor(config: Config) {
        if (!config?.cache) {
            throw new Error(Errors.NO_CACHE_IN_CONSTRUCTOR);
        }

        if (!config?.client) {
            throw new Error(Errors.NO_CLIENT_IN_CONSTRUCTOR);
        }

        this.cache = config.cache;
        this.client = config.client;
        this.options = config.options;
    }

    public async request({ url, method, data }: RequestProperties): Promise<any> {
        const request = new Request({
            url,
            method,
            data,
        });

        let requestId = `${request.method}-${request.url}`;
        const hasCustomIdFunction = !!this.options?.generateId;

        if (hasCustomIdFunction) {
            requestId = this.options.generateId(request);
        }

        const responseFromCache = await this.cache.handle({id: requestId, request});
        const responseThroughCacheSuccess = responseFromCache !== false;

        if (responseThroughCacheSuccess) {
            return responseFromCache;
        }

        const response = await this.client.request(request);
        return await this.cache.handle({id: requestId, request, response });
    }
};

export default Cachy;