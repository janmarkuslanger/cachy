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

test('add id to existing id should throw an error and not replace id', () => {
    const cache = new Cache();
    cache.add('my-id', 1);
    
    expect(() => { cache.add('my-id', 1); }).toThrowError(Message.CACHE_ITEM_ALREADY_EXISTS);
    const respone = cache.read('my-id');
    expect(respone).toBe(1);
});

test('add id to cache and replace it', () => {
    const cache = new Cache();
    cache.add('my-id', 1);
    cache.replace('my-id', 2);
    const respone = cache.read('my-id');
    expect(respone).toBe(2);
});