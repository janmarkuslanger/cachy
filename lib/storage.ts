import CacheItem from './cache-item';
import { Id, Response } from './types.d';

interface Storage {
    write({id, item} : {id: Id, item: CacheItem}): Promise<boolean>;
    read({id }: {id: Id}): Promise<CacheItem|false>;
};

export default Storage;