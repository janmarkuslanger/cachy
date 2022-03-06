import { Client } from '../src';

export const DemoApiClientWithGet: Client = {
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