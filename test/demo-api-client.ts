import { Client } from '../src';

const DemoApiClient: Client = {
    get(url, params) {

        if (url === '/demo') {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ data: 1 });
                }, 1000);
            })
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: 1 });
            }, 1000);
        }) 

    }
};

export default DemoApiClient;