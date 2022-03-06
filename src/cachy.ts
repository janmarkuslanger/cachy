import Client from './client';
import Message from './messages';

class Cachy {
    private client: Client;

    constructor(client: Client) {
        if (!client) {
            throw new Error(Message.NO_CLIENT_GIVEN);
        }

        this.client = client;
    }
};

export default Cachy;