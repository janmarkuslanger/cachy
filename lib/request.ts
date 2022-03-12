import { Url, Method, RequestInfo, RequestData } from './types.d';

type Properties = {
    url: Url;
    method: Method;
    data?: RequestData;
}

class Request {
    public url: Url;
    public method: Method;
    public info: RequestInfo;
    public data?: RequestData;

    constructor({ url, method, data }: Properties) {
        this.url = url;
        this.method = method;
        this.info = {};
        this.data = data;
    }
};

export default Request;