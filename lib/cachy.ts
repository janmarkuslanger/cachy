import Cache from './cache';
import Errors from './errors';

type Config = {
    cache: Cache
};

class Cachy {
    private cache: Cache;

    constructor(config: Config) {
        if (!config?.cache) {
            throw new Error(Errors.NO_CACHE_IN_CONSTRUCTOR);
        }

        this.cache = config.cache;
    }
};

export default Cachy;