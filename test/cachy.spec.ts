import { expect, test } from 'vitest';
import { Cachy, Errors } from '../lib';

test('should throw error if cache is not assigned to cachy', () => {
    expect(() => { new Cachy() }).toThrowError(Errors.NO_CACHE_IN_CONSTRUCTOR);
});
