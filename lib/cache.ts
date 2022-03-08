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

    abstract handle(request: Request): Promise<Response|false>;
    
    public async write(item: CacheItem): Promise<boolean> {
        let writeState;

        try {
            writeState = await this.storage.write(item);
            return true;
        } catch (error) {
            return false;
        }
    };

    public async read(id: Id): Promise<Response|boolean> {
        try {
            return await this.storage.read(id);
        } catch (error) {
            return false;
        }
    }
};

export default Cache;