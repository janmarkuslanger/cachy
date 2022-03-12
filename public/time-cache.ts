import { Cache, CacheItem, Request } from '../lib';
import { Response } from '../lib/types.d';

class TimeCache extends Cache {
    constructor({ storage}) {
        super({ storage });
    }

    async handle({ id, request, response }: { id: string, request: Request, response: Response }): Promise<any> {
        // response will be passed if 
        if (response) {
            const currentTimestamp = Date.now();

            // inject timestamp into request object
            request.info = {
                lastUpdate: currentTimestamp,
            };

            const item = new CacheItem({
                request,
                response,
            });

            await this.write({ id, item });
            return item;
        }

        const item = await this.read({ id });
        const noItemInCache = item === false;

        if (noItemInCache) {
            return false;
        }

        const lastUpdate = item.request.info.lastUpdate;
        const currentTimestamp = Date.now();

        const shouldRefreshRequest = (currentTimestamp - lastUpdate) > 60 * 1000;

        if (shouldRefreshRequest) {
            return false;
        }

        return item;
    }
}

export default TimeCache;