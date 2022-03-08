import { expect, test } from 'vitest';
import { Cachy, Errors } from '../lib';
import TestCache from './test-cache';
import TestStorage from './test-storage';
import TestClient from './test-client';

test('should throw error if cache is not assigned to cachy', () => {
    expect(() => { new Cachy() }).toThrowError(Errors.NO_CACHE_IN_CONSTRUCTOR);
});

test('should throw error if storage is not assigned to cachy', () => {
    const testCache = new TestCache();
    expect(() => { new Cachy({ cache: testCache }) }).toThrowError(Errors.NO_STORAGE_IN_CONSTRUCTOR);
});

test('should throw error if client is not assigned to cachy', () => {
    const testCache = new TestCache();
    const testStorage = new TestStorage();
    expect(() => { new Cachy({ cache: testCache, storage: testStorage }) }).toThrowError(Errors.NO_CLIENT_IN_CONSTRUCTOR);
});

test('Cachy.request should return a valid response', async () => {
    const testCache = new TestCache();
    const testStorage = new TestStorage();
    const testClient = new TestClient();
    const cachy = new Cachy({ cache: testCache, storage: testStorage, client: testClient });

    const responseGetUrl = await cachy.request({
        method: 'get',
        url: 'https://my-url.com/user'
    });
    expect(responseGetUrl).toBe(1);

});
