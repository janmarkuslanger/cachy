import { Response } from './types.d';
import Request from './request';

type Properties = {
    request: Request;
    response: Response;
};

class CacheItem {
    public request: Request;
    public response: Response;

    constructor({ request, response }: Properties) {
        this.request = request;
        this.response = response;
    };
};

export default CacheItem;