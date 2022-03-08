import { expect, test } from 'vitest';
import { Request } from '../lib';

test('creating a request should generate correct data', () => {
    const request = new Request({
        url: 'test',
        method: 'get'
    });

    expect(request.getInfo()).toMatchObject({});
    expect(request.getUrl()).toBe('test');
    expect(request.getMethod()).toBe('get');
});
