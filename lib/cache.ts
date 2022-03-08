import Request from './request';
import { Response, Id } from './types.d';
import CacheItem from './cache-item';
import Storage from './storage';

abstract class Cache {
    abstract handle(request: Request): Promise<Response>;
    
    public async write({item, storage}:  {item: CacheItem, storage: Storage}): Promise<boolean> {
        let writeState;

        try {
            writeState = await storage.write(item);
            return true;
        } catch (error) {
            return false;
        }
    };

    public async read({id, storage}: { id: Id, storage: Storage }): Promise<Response|boolean> {
        try {
            return await storage.read(id);
        } catch (error) {
            return false;
        }
    }
};

export default Cache;