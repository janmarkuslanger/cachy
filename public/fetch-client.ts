import { Client, Request } from '../lib';

class FetchClient implements Client {
    async request(requestData: Request): Promise<any> {
        if (requestData.method === 'get') {
            const response = await fetch(requestData.url);
            const data = await response.json();
            return data;
        }
    }
};

export default FetchClient;