import Message from "./messages";

type Id = string;
type Data = any;

type CacheItems = {
    [id: Id]: Data;
};

class Cache {
    private items: CacheItems;

    constructor() {
        this.items = {};
    }

    public add(id: Id, data: Data): void {
        if (id in this.items) {
            throw new Error(Message.CACHE_ITEM_ALREADY_EXISTS);
        }

        this.items[id] = data;
    }

    public replace(id: Id, data: Data): void {
        this.items[id] = data;
    };

    public remove(id: Id): void {
        delete this.items[id];
    };

    public read(id: Id): Data {
        return this.items[id];
    }
};

export default Cache;