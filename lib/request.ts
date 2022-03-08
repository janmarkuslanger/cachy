import { Url, Method, RequestInfo, RequestData } from './types.d';

type Properties = {
    url: Url;
    method: Method;
    data?: RequestData;
}

class Request {
    private url: Url;
    private method: Method;
    private info: RequestInfo;
    private data?: RequestData;

    constructor({ url, method, data }: Properties) {
        this.url = url;
        this.method = method;
        this.info = {};
        this.data = data;
    }

    public getUrl(): Url {
        return this.url;
    }

    public getMethod(): Method {
        return this.method;
    }

    public getData(): RequestData {
        return this.data;
    }

    public getInfo(): RequestInfo {
        return this.info;
    }

    public setInfo(info: RequestInfo): void {
        this.info = info;
    }

    public generateId(): string {
        return `${this.method}-${this.url}`;
    }
};

export default Request;