import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { CxBuilder, cxConstAsset } from '@proc7ts/context-builder';
import { CxGlobals, CxReferenceError } from '@proc7ts/context-values';
import { NamespaceAliaser, newNamespaceAliaser } from './namespace-aliaser';
import { NamespaceDef } from './namespace-def';
import { SVG__NS, XMLNS__NS } from './namespaces';
import { xml__naming } from './namings';

describe('NamespaceAliaser', () => {

  let nsAliaser: NamespaceAliaser;

  beforeEach(() => {
    nsAliaser = newNamespaceAliaser();
  });

  it('uses preferred alias', () => {
    expect(nsAliaser(new NamespaceDef('test/url', 'test'))).toBe('test');
  });
  it('uses second preferred alias when the first one occupied', () => {
    nsAliaser(new NamespaceDef('test/url', 'test'));
    expect(nsAliaser(new NamespaceDef('other/url', 'test', 'other'))).toBe('other');
  });
  it('uses registered alias', () => {

    const ns = new NamespaceDef('test/url', 'test');

    nsAliaser(ns);
    expect(nsAliaser(ns)).toBe('test');
  });
  it('generates unique alias if preferred one is absent', () => {

    const ns = new NamespaceDef('test/url', 'test');
    const alias = nsAliaser(ns);

    expect(nsAliaser(ns)).toBe(alias);
  });
  it('generates unique alias if preferred one is occupied', () => {

    const ns = new NamespaceDef('test/url', 'test');
    const alias = nsAliaser(ns);

    expect(nsAliaser(new NamespaceDef('test2/url', 'test'))).toBe(`${alias}2`);
    expect(nsAliaser(new NamespaceDef('test3/url', 'test'))).toBe(`${alias}3`);
  });
  it('generates unique alias if all preferred ones occupied', () => {
    nsAliaser(new NamespaceDef('tst/url', 'tst'));

    const alias = nsAliaser(new NamespaceDef('test/url', 'test'));

    expect(nsAliaser(new NamespaceDef('test2/url', 'test', 'tst'))).toBe(`${alias}2`);
    expect(nsAliaser(new NamespaceDef('test3/url', 'test', 'tst'))).toBe(`${alias}3`);
  });

  describe('context entry', () => {

    let cxBuilder: CxBuilder;

    beforeEach(() => {
      cxBuilder = new CxBuilder(get => ({ get }));
    });

    it('requires `CxGlobals` scope', () => {
      expect(() => cxBuilder.get(NamespaceAliaser)).toThrow(new CxReferenceError(CxGlobals));
    });
    it('has default value', () => {
      cxBuilder.provide(cxConstAsset(CxGlobals, cxBuilder.context));

      const nsAlias = cxBuilder.get(NamespaceAliaser);

      expect(xml__naming.name(['html', XMLNS__NS], nsAlias)).toBe('xmlns:html');
    });
    it('reflects most recent value', () => {
      cxBuilder.provide(cxConstAsset(CxGlobals, cxBuilder.context));

      const nsAlias1 = jest.fn(newNamespaceAliaser());
      const nsAlias2 = jest.fn(newNamespaceAliaser());

      cxBuilder.provide(cxConstAsset(NamespaceAliaser, nsAlias1));

      const nsAlias = cxBuilder.get(NamespaceAliaser);

      expect(nsAlias(XMLNS__NS)).toBe('xmlns');
      expect(nsAlias1).toHaveBeenLastCalledWith(XMLNS__NS);

      cxBuilder.provide(cxConstAsset(NamespaceAliaser, nsAlias2));

      expect(nsAlias(SVG__NS)).toBe('svg');
      expect(nsAlias2).toHaveBeenLastCalledWith(SVG__NS);
      expect(nsAlias1).not.toHaveBeenCalledWith(SVG__NS);
    });

    describe('toString', () => {
      it('provides string representation', () => {
        expect(String(NamespaceAliaser)).toBe('[NamespaceAliaser]');
      });
    });
  });
});
