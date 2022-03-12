import { Storage } from "../lib";
import CacheItem from "../lib/cache-item";

class LocalStorage implements Storage {
    async read({ id }: { id: string }): Promise<any> {
        const result = localStorage.getItem(id);

        if (result === null) {
            return false;
        }

        return JSON.parse(result);

    };
    async write({ id, item }: { id: string; item: CacheItem; }): Promise<boolean> {
        try {
            localStorage.setItem(id, JSON.stringify(item))
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
};

export default LocalStorage;