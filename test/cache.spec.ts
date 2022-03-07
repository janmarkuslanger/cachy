import { expect, test } from 'vitest';
import { Cache } from '../src';
import Message from '../src/messages';

test('create cache', () => {
    const cache = new Cache();
    expect(cache).toMatchObject({items:{}});
});

test('create cache and push item', () => {
    const cache = new Cache();
    cache.add('my-id', 1);
    expect(cache).toMatchObject({items: { 'my-id': 1 }});
});

test('create cache and push item and delete item should be empty items', () => {
    const cache = new Cache();
    cache.add('my-id', 1);
    cache.remove('my-id');
    expect(cache).toMatchObject({items:{}});
});

test('create cache and push item and delete item should be empty items', () => {
    const cache = new Cache();
    cache.add('my-id', 1);
    const respone = cache.read('my-id');
    expect(respone).toBe(1);
});

test('read id that doesnt exist should return undefined', () => {
    const cache = new Cache();
    cache.add('my-id', 1);
    const respone = cache.read('my-id-asdasd');
    expect(respone).toBe(undefined);
});

test('add item to an existing item should throw an error and not replace id', () => {
    const cache = new Cache();
    cache.add('my-id', 1);
    
    expect(() => { cache.add('my-id', 1); }).toThrowError(Message.CACHE_ITEM_ALREADY_EXISTS);
    const respone = cache.read('my-id');
    expect(respone).toBe(1);
});

test('add item to cache and replace it should read the new value', () => {
    const cache = new Cache();
    cache.add('my-id', 1);
    cache.replace('my-id', 2);
    const respone = cache.read('my-id');
    expect(respone).toBe(2);
});

test('add multiple items and purge cache should clear cache and no items should be in it', () => {
    const cache = new Cache();
    cache.add('my-id', 1);
    cache.add('my-id-2', 1);
    cache.purge();
    const response1 = cache.read('my-id');
    const response2 = cache.read('my-id-2');
    expect(response1).toBe(undefined);
    expect(response2).toBe(undefined);
});