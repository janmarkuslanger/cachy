import Cache from './cache';
import Storage from './storage';
import Client from './client';
import Errors from './errors';

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
    }
};

export default Cachy;