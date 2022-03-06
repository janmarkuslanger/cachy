import { describe, expect, it, test } from 'vitest';
import { Cachy } from '../src';
import Message from '../src/messages';

test('sadas', () => {
    expect(() => { new Cachy() }).toThrowError(Message.NO_CLIENT_GIVEN);
  })


