import { expect, test } from 'vitest';
import { Cachy, Errors } from '../lib';
import TestCache from './test-cache';
import TestStorage from './test-storage';

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
    expect(() => { new Cachy({ cache: TestCache, storage: testStorage }) }).toThrowError(Errors.NO_CLIENT_IN_CONSTRUCTOR);
});
