import Client from './client';

class Cachy {
    private client: Client;

    constructor(client: Client) {
        if (!client) {
            throw new Error('No client given in cachy');
        }

        this.client = client;
    }
};

export default Cachy;