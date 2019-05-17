import { NamespaceDef } from './namespace';

describe('NamespaceDef', () => {
  describe('localName', () => {

    let ns: NamespaceDef;

    beforeEach(() => {
      ns = new NamespaceDef('test/url');
    });

    it('appends suffix to CSS class names', () => {
      expect(ns.qualify('ns', 'class-name', 'css')).toBe('class-name@ns');
    });
    it('prefixes ID', () => {
      expect(ns.qualify('ns', 'id', 'id')).toBe('ns:id');
    });
    it('prefixes XML name', () => {
      expect(ns.qualify('ns', 'name', 'xml')).toBe('ns:name');
    });
    it('prefixes other names', () => {
      expect(ns.qualify('ns', 'element-name')).toBe('ns-element-name');
    });
  });

  describe('alias', () => {
    it('is `ns` by default', () => {
      expect(new NamespaceDef('test/url').alias).toBe('ns');
    });
  });
});
