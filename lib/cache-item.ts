import { Response, Id } from './types.d';
import Request from './request';

type Properties = {
    request: Request;
    id: Id;
    response: Response;
};

class CacheItem {
    private request: Request;
    private id: Id;
    private response: Response;

    constructor({ request, id, response }: Properties) {
        this.request = request;
        this.id = id;
        this.response = response;
    };
};

export default CacheItem;