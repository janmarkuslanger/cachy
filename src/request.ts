import Message from './messages';
import { Url, RequestData, IdProps } from './types.d';

class Request {
    private url: Url;
    private data?: RequestData;

    constructor(url: Url, data?: RequestData, ) {
        if (!url) {
            throw new Error(Message.NO_URL_GIVEN);
        }

        this.url = url;
        this.data = data;
    };

    public generateId(idProps?: IdProps) {
        let id = this.url;

        if (!idProps) {
            return id;
        }

        if (idProps && !this.data) {
            throw new Error(Message.NO_DATA_FOUND);
        }

        idProps.forEach((idProp) => {
            const props = idProp.split('.');
            const value = props.reduce((previous, current) => previous && previous[current], this.data);
            
            if (!value) {
                throw new Error(Message.NO_DATA_FOUND);
            }

            id += `_${value}`;
        })

        return id;
    };


};

export default Request;

