import {
    Url,
    Parameter
} from './types.d';

interface Client {
    get?(url: Url, parameter?: Parameter): Promise<any>;
    post?(url: Url, parameter?: Parameter): Promise<any>;
    delete?(url: Url, parameter?: Parameter): Promise<any>;
    update?(url: Url, parameter?: Parameter): Promise<any>;
};

export default Client;