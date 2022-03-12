import { Cache, Storage } from '../lib';

class TestCache extends Cache {
    constructor({ storage }) {
        super({ storage});
    }

    public async handle(request) {
        return false;
    }
};

export default TestCache;