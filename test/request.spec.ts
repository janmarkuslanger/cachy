import { expect, test } from 'vitest';
import { Request } from '../src';
import Message from '../src/messages';

test('create Request without url', () => {
    expect(() => { new Request() }).toThrowError(Message.NO_URL_GIVEN);
});

test('create Request with url should create a valid ', () => {
    const request = new Request('https://www.my-url.com/test');
    const id = request.generateId();
    expect(id).toBe('https://www.my-url.com/test');
});