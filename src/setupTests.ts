import '@testing-library/jest-dom';
// @ts-ignore
import { TextEncoder } from 'node:util';

if (typeof globalThis.TextEncoder === 'undefined') {
  // @ts-ignore
  globalThis.TextEncoder = TextEncoder;
}
