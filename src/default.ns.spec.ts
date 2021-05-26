import { describe, expect, it } from '@jest/globals';
import { DEFAULT__NS } from './default.ns';

describe('DEFAULT__NS', () => {
  describe('url', () => {
    it('is empty', () => {
      expect(DEFAULT__NS.url).toBe('');
    });
  });
  describe('qualify', () => {
    it('does not qualify names', () => {
      expect(DEFAULT__NS.name('alias', 'some-name')).toBe('some-name');
    });
  });
});
