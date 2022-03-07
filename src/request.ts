import Message from "./messages";
import { Url } from "./types.d";

class Request {
    private url: Url;

    constructor(url: Url) {
        if (!url) {
            throw new Error(Message.NO_URL_GIVEN);
        }

        this.url = url;
    };

    public generateId() {
        return this.url;
    }
};

export default Request;

