import { expect, test } from 'vitest';
import { Cachy } from '../src';
import Message from '../src/messages';
import { DemoApiClientWithGet, DemoApiClientWithoutImplementation } from './demo-api-clients';

test('create client without client sould throw an error', () => {
    expect(() => { new Cachy() }).toThrowError(Message.NO_CLIENT_GIVEN);
});

test('should get a valid response with get request and client with get implementation', async () => {
    const client = new Cachy(DemoApiClientWithGet);
    const doRequest = client.get('/demo')
    await expect(doRequest).resolves.toMatchObject({ data: 1 });
});

test('should get an error trying to do a post request with get client', async () => {
    const client = new Cachy(DemoApiClientWithGet);
    const doRequest = () => client.post('/demo');
    await expect(doRequest).rejects.toThrowError(Message.NO_POST_IMPLEMENTATION);
});


test('should get an error trying to do a update request with get client', async () => {
    const client = new Cachy(DemoApiClientWithGet);
    const doRequest = () => client.update('/demo');
    await expect(doRequest).rejects.toThrowError(Message.NO_UPDATE_IMPLEMENTATION);
});

test('should get an error trying to do a delete request with get client', async () => {
    const client = new Cachy(DemoApiClientWithGet);
    const doRequest = () => client.delete('/demo');
    await expect(doRequest).rejects.toThrowError(Message.NO_DELETE_IMPLEMENTATION);
});

test('should get an error trying to do a get request with a client without get implementation', async () => {
    const client = new Cachy(DemoApiClientWithoutImplementation);
    const doRequest = () => client.get('/demo');
    await expect(doRequest()).rejects.toThrowError(Message.NO_GET_IMPLEMENTATION);
});

