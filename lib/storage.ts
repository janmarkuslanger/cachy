import CacheItem from './cache-item';
import { Id, Response } from './types.d';

interface Storage {
    write(CacheItem): Promise<boolean>;
    read(id: Id): Promise<Response>;
};

export default Storage;