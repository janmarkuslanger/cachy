interface Client {
    get?(): Promise<any>;
    post?(): Promise<any>;
    delete?(): Promise<any>;
    update?(): Promise<any>;
};

export default Client;