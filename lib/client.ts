import Request from './request';

interface Client {
    request(requestData: Request): Promise<any>;
};

export default Client; 