import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { Mock } from 'jest-mock';
import { NamespaceDef } from './namespace-def';
import type { Naming } from './naming';

describe('NamespaceDef', () => {

  let ns: NamespaceDef;
  let naming: { [K in keyof Naming]: Mock<Naming[K]> };

  beforeEach(() => {
    ns = new NamespaceDef('test/url');
    naming = {
      applyAlias: jest.fn((name, alias, _ns) => `${name}/${alias}`),
      name: jest.fn(),
    };
  });

  describe('name', () => {
    it('applies naming schema', () => {
      expect(ns.name('ns', 'local-name', naming)).toBe('local-name/ns');
      expect(naming.applyAlias).toHaveBeenCalledWith('local-name', 'ns', ns);
    });
    it('applies default naming schema when omitted', () => {
      expect(ns.name('ns', 'local-name')).toBe('ns-local-name');
    });
  });

  describe('alias', () => {
    it('is `ns` by default', () => {
      expect(new NamespaceDef('test/url').alias).toBe('ns');
    });
  });
});
