import { expect, test } from 'vitest';
import { Cachy, Errors } from '../lib';
import TestCache from './test-cache';
import TestStorage from './test-storage';
import TestClient from './test-client';

test('should throw error if cache is not assigned to cachy', () => {
    expect(() => { new Cachy() }).toThrowError(Errors.NO_CACHE_IN_CONSTRUCTOR);
});

test('should throw error if client is not assigned to cachy', () => {
    const testStorage = new TestStorage();
    const testCache = new TestCache({ storage: testStorage });
    expect(() => { new Cachy({ cache: testCache }) }).toThrowError(Errors.NO_CLIENT_IN_CONSTRUCTOR);
});

test('Cachy.request should return a valid response', async () => {
    const testStorage = new TestStorage();
    const testCache = new TestCache({ storage: testStorage });
    const testClient = new TestClient();
    const cachy = new Cachy({ cache: testCache, client: testClient });

    const responseGetUrl = await cachy.request({
        method: 'get',
        url: 'https://my-url.com/user'
    });
    expect(responseGetUrl).toBe(1);

});
