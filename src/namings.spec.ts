import { NamespaceDef } from './namespace';
import { NamespaceAliaser, newNamespaceAliaser } from './namespace-aliaser';
import { css__naming, default__naming, html__naming, id__naming, xml__naming } from './namings';

describe('namings', () => {

  let ns: NamespaceDef;
  let nsAlias: NamespaceAliaser;

  beforeEach(() => {
    ns = new NamespaceDef('test/ns', 'test');
    nsAlias = newNamespaceAliaser();
  });

  describe('default__naming', () => {
    it('does not prefix simple name', () => {
      expect(default__naming.name('some-name', nsAlias)).toBe('some-name');
    });
    it('prefixes name', () => {
      expect(default__naming.name(['some-id', ns], nsAlias)).toBe('test-some-id');
    });
  });

  describe('html__naming', () => {
    it('prefixes name', () => {
      expect(html__naming.name(['some-id', ns], nsAlias)).toBe('test-some-id');
    });
  });

  describe('xml__naming', () => {
    it('prefixes name', () => {
      expect(xml__naming.name(['some-id', ns], nsAlias)).toBe('test:some-id');
    });
  });

  describe('id__naming', () => {
    it('prefixes name', () => {
      expect(id__naming.name(['some-id', ns], nsAlias)).toBe('test:some-id');
    });
  });

  describe('css__naming', () => {
    it('appends namespace alias', () => {
      expect(css__naming.name(['some-id', ns], nsAlias)).toBe('some-id@test');
    });
  });
});
