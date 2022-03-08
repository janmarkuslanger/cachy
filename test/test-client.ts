import { Client, Request } from '../lib';

class TestClient implements Client {
    async request(requestData: Request): Promise<any> {
        let response;

        if (requestData.getUrl() === 'https://my-url.com/user' && requestData.getMethod() === 'get') {
            response = 1;
        }


        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(response)
            })
        });
    }
};

export default TestClient;