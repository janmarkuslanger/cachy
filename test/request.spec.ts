import { expect, test } from 'vitest';
import { Request } from '../src';
import Message from '../src/messages';

test('create Request without url', () => {
    expect(() => { new Request() }).toThrowError(Message.NO_URL_GIVEN);
});

test('create Request with url should create a valid id', () => {
    const request = new Request('https://www.my-url.com/test');
    const id = request.generateId();
    expect(id).toBe('https://www.my-url.com/test');
});

test('create Request with url should create a valid id with id props but no data', () => {
    const request = new Request('https://www.my-url.com/test');
    expect(() => { return request.generateId(['id',  'user.name']) }).toThrowError(Message.NO_DATA_FOUND);
});
test('create Request with url should create a valid id with id props', () => {
    const request = new Request('https://www.my-url.com/test', { id: 'my-id', user: { name: 'func' } });
    const id = request.generateId(['id',  'user.name']);
    expect(id).toBe('https://www.my-url.com/test_my-id_func');
});