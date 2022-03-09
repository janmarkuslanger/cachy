import CacheItem from './cache-item';
import { Id, Response } from './types.d';

interface Storage {
    write({id, cacheItem} : {id: Id, cacheItem: CacheItem}): Promise<boolean>;
    read({id}: {id: Id}): Promise<Response>;
};

export default Storage;