import Request from './request';
import { Response, Id } from './types.d';
import CacheItem from './cache-item';
import Storage from './storage';

type Properties = {
    storage: Storage;
};

abstract class Cache {
    protected storage: Storage;

    constructor({ storage }: Properties) {
        this.storage = storage;
    }

    abstract handle({id, request, response}: {id: Id, request: Request, response?: Response}): Promise<Response|false>;
    
    protected async write({id, item } :{id: Id, item: CacheItem}): Promise<boolean> {
        let writeCacheSuccess = false;

        try {
            writeCacheSuccess = await this.storage.write({id, item});
        } catch (error) {
            writeCacheSuccess = false;
        }

        return writeCacheSuccess;
    };

    protected async read({ id }: {id: Id }): Promise<CacheItem|false> {
        try {
            return await this.storage.read({id });
        } catch (error) {
            return false
        }
    }
};

export default Cache;