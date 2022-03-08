import { expect, test } from 'vitest';
import { Cachy, Cache } from '../src';
import Message from '../src/messages';
import { DemoApiClientWithGet, DemoApiClientWithoutImplementation } from './demo-api-clients';

test('create client without options should throw an error', () => {
    expect(() => { new Cachy() }).toThrowError(Message.NO_CONFIG_GIVEN);
});

test('create client without client should throw an error', () => {
    const cache = new Cache();
    expect(() => { new Cachy({ cache }) }).toThrowError(Message.NO_CLIENT_GIVEN);
});

test('create client without cache should throw an error', () => {
    expect(() => { new Cachy({ client: DemoApiClientWithoutImplementation }) }).toThrowError(Message.NO_CACHE_GIVEN);
});

test('should get a valid response with get request and client with get implementation', async () => {
    const cache = new Cache();
    const client = new Cachy({client: DemoApiClientWithGet, cache });
    const doRequest = client.get('/demo')
    await expect(doRequest).resolves.toMatchObject({ data: 1 });
});

test('should get an error trying to do a post request with get client', async () => {
    const cache = new Cache();
    const client = new Cachy({client: DemoApiClientWithGet, cache});

    const doRequest = () => client.post('/demo');
    await expect(doRequest).rejects.toThrowError(Message.NO_POST_IMPLEMENTATION);
});


test('should get an error trying to do a update request with get client', async () => {
    const cache = new Cache();
    const client = new Cachy({client: DemoApiClientWithGet, cache});

    const doRequest = () => client.update('/demo');
    await expect(doRequest).rejects.toThrowError(Message.NO_UPDATE_IMPLEMENTATION);
});

test('should get an error trying to do a delete request with get client', async () => {
    const cache = new Cache();
    const client = new Cachy({client: DemoApiClientWithGet, cache});

    const doRequest = () => client.delete('/demo');
    await expect(doRequest).rejects.toThrowError(Message.NO_DELETE_IMPLEMENTATION);
});

test('should get an error trying to do a get request with a client without get implementation', async () => {
    const cache = new Cache();
    const client = new Cachy({client: DemoApiClientWithoutImplementation, cache});

    const doRequest = () => client.get('/demo');
    await expect(doRequest()).rejects.toThrowError(Message.NO_GET_IMPLEMENTATION);
});


