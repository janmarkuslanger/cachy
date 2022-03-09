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

    abstract handle({id, request}: {id: Id, request: Request}): Promise<Response|false>;
    
    public async write({id, item } :{id: Id, item: CacheItem}): Promise<boolean> {
        let writeCacheSuccess = false;

        try {
            writeCacheSuccess = await this.storage.write({id, item});
        } catch (error) {
            writeCacheSuccess = false;
        }

        return writeCacheSuccess;
    };

    public async read({ id }: {id: Id}): Promise<Response|boolean> {
        let readCacheSuccess = false;

        try {
            readCacheSuccess = await this.storage.read({id});
        } catch (error) {
            readCacheSuccess = false;
        }

        return readCacheSuccess;
    }
};

export default Cache;