import { expect, test } from 'vitest';
import { Request } from '../lib';

test('creating a request should generate correct data', () => {
    const request = new Request({
        url: 'test',
        method: 'get'
    });

    expect(request.info).toMatchObject({});
    expect(request.url).toBe('test');
    expect(request.method).toBe('get');
});
