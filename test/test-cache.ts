import { Cache, Storage } from '../lib';

class TestCache extends Cache {
    constructor({ storage }) {
        super({ storage});
    }

    public async handle(request) {
        console.log(this.storage)
        return false;
    }
};

export default TestCache;