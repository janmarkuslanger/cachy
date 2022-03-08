export type Method = string; // Idea: add explicit method names like get. 

export type Url = string;

export type RequestData = {
    [key: string]: any;
};

export type Id = string;

export type Response = any;

export type RequestInfo = {
    [key: string]: any;
}

export type RequestProperties = {
    method: Method;
    url: Url;
    data?: RequestData;
}