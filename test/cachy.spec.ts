import { expect, test } from 'vitest';
import { Cachy } from '../src';
import Message from '../src/messages';
import { DemoApiClientWithGet } from './demo-api-clients';

test('create client', () => {
    expect(() => { new Cachy() }).toThrowError(Message.NO_CLIENT_GIVEN);
});

test('should get a valid response with get request and client with get implementation', async () => {
    const client = new Cachy(DemoApiClientWithGet);
    const result = await client.get('/demo');
    expect(result).toBe({ data: 1 });
});

test('should get an error trying to do a post request with get client', async () => {
    const client = new Cachy(DemoApiClientWithGet);
    expect(async () => { await client.post('/demo') }).toThrowError(Message.NO_POST_IMPLEMENTATION);
});


test('should get an error trying to do a update request with get client', async () => {
    const client = new Cachy(DemoApiClientWithGet);
    expect(async () => { await client.update('/demo') }).toThrowError(Message.NO_UPDATE_IMPLEMENTATION);
});

test('should get an error trying to do a delete request with get client', async () => {
    const client = new Cachy(DemoApiClientWithGet);
    expect(async () => { await client.delete('/demo') }).toThrowError(Message.NO_DELETE_IMPLEMENTATION);
});

