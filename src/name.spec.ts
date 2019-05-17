import {
  compareNames,
  isNameAndNamespace,
  isNameInNamespace,
  nameAndNamespace,
  NameInNamespace,
  namesEqual,
  namespaceOf,
  qualifyCssName,
  qualifyHtmlName,
  qualifyId,
  qualifyName,
  qualifyXmlName
} from './name';
import { NamespaceDef } from './namespace';
import { NamespaceAliaser, newNamespaceAliaser } from './namespace-aliaser';
import { DEFAULT__NS } from './default.ns';

describe('isNameAndNamespace', () => {
  it('returns `true` for name with namespace', () => {
    expect(isNameAndNamespace(['foo', new NamespaceDef('test/ns')])).toBe(true);
  });
  it('returns `false` for empty name with namespace', () => {
    expect(isNameAndNamespace(['', new NamespaceDef('test/ns')])).toBe(false);
  });
  it('returns `false` when array is too long', () => {
    expect(isNameAndNamespace(['foo', new NamespaceDef('test/ns'), 'bar'])).toBe(false);
  });
  it('returns `false` when array is too short', () => {
    expect(isNameAndNamespace(['foo'])).toBe(false);
  });
  it('returns `false` when the first element is not a string', () => {
    expect(isNameAndNamespace([1, new NamespaceDef('test/ns')])).toBe(false);
  });
  it('returns `false` when the second element is not a `NamespaceDef`', () => {
    expect(isNameAndNamespace(['foo', 'ns'])).toBe(false);
  });
});

describe('isNameInNamespace', () => {
  it('returns `true` for name with namespace', () => {
    expect(isNameInNamespace(['foo', new NamespaceDef('test/ns')])).toBe(true);
  });
  it('returns `true` for simple string name', () => {
    expect(isNameInNamespace('foo')).toBe(true);
  });
  it('returns `false` for empty string', () => {
    expect(isNameInNamespace('')).toBe(false);
  });
  it('returns `false` for everything else', () => {
    expect(isNameInNamespace(['foo', 'bar'])).toBe(false);
  });
});

describe('namespaceOf', () => {
  it('returns namespace for name with namespace', () => {

    const ns = new NamespaceDef('test/url');

    expect(namespaceOf(['name', ns])).toBe(ns);
  });
  it('returns default namespace for string name', () => {
    expect(namespaceOf('name')).toBe(DEFAULT__NS);
  });
});

describe('nameAndNamespace', () => {
  it('returns the name itself for the name with namespace', () => {

    const name: NameInNamespace = ['some-name', new NamespaceDef('test/url')];

    expect(nameAndNamespace(name)).toBe(name);
  });
  it('returns default namespace for string name', () => {

    const name = 'some-name';

    expect(nameAndNamespace(name)).toEqual([name, DEFAULT__NS]);
  });
});

describe('namesEqual', () => {

  let ns1: NamespaceDef;
  let ns2: NamespaceDef;

  beforeEach(() => {
    ns1 = new NamespaceDef('test/ns1', 'test1');
    ns2 = new NamespaceDef('test/ns2', 'test2');
  });

  it('compares string names', () => {
    expect(namesEqual('foo', 'bar')).toBe(false);
    expect(namesEqual('foo', 'foo')).toBe(true);
  });
  it('compares string name and the name in default namespace', () => {
    expect(namesEqual('foo', ['foo', DEFAULT__NS])).toBe(true);
    expect(namesEqual(['foo', DEFAULT__NS], 'foo')).toBe(true);
  });
  it('compares string name and name with namespace', () => {
    expect(namesEqual('foo', ['foo', ns1])).toBe(false);
    expect(namesEqual(['foo', ns1], 'foo')).toBe(false);
  });
  it('compares names with namespace', () => {
    expect(namesEqual(['foo', ns1], ['foo', ns1])).toBe(true);
    expect(namesEqual(['foo', ns1], ['foo', new NamespaceDef(ns1.url, 'other-alias')])).toBe(true);
    expect(namesEqual(['foo', ns1], ['foo', ns2])).toBe(false);
    expect(namesEqual(['bar', ns1], ['foo', ns1])).toBe(false);
  });
});

describe('compareNames', () => {

  let ns1: NamespaceDef;
  let ns2: NamespaceDef;

  beforeEach(() => {
    ns1 = new NamespaceDef('test/ns1', 'test1');
    ns2 = new NamespaceDef('test/ns2', 'test2');
  });

  it('compares string names', () => {
    expect(compareNames('a', 'a')).toBe(0);
    expect(compareNames('a', 'b')).toBe(-1);
    expect(compareNames('b', 'a')).toBe(1);
  });
  it('compares string name and the name in default namespace', () => {
    expect(compareNames('foo', ['foo', DEFAULT__NS])).toBe(0);
    expect(compareNames(['foo', DEFAULT__NS], 'foo')).toBe(0);
    expect(compareNames('a', ['b', DEFAULT__NS])).toBe(-1);
    expect(compareNames(['a', DEFAULT__NS], 'b')).toBe(-1);
    expect(compareNames('b', ['a', DEFAULT__NS])).toBe(1);
    expect(compareNames(['b', DEFAULT__NS], 'a')).toBe(1);
  });
  it('compares string name and name in namespace', () => {
    expect(compareNames('a', ['a', ns1])).toBe(-1);
    expect(compareNames(['a', ns1], 'a')).toBe(1);
  });
  it('compares names with namespaces', () => {
    expect(compareNames(['a', ns1], ['a', ns1])).toBe(0);
    expect(compareNames(['a', ns1], ['b', ns1])).toBe(-1);
    expect(compareNames(['a', ns2], ['b', ns1])).toBe(1);
  });
});

describe('qualifyName', () => {

  let ns: NamespaceDef;
  let nsAlias: NamespaceAliaser;

  beforeEach(() => {
    ns = new NamespaceDef('test/ns', 'test');
    nsAlias = newNamespaceAliaser();
  });

  it('does not qualify string name', () => {
    expect(qualifyName('some-name', nsAlias)).toBe('some-name');
  });
  it('qualifies identifier', () => {
    expect(qualifyId(['some-id', ns], nsAlias)).toBe('test:some-id');
  });
  it('qualifies XML name', () => {
    expect(qualifyXmlName(['some-name', ns], nsAlias)).toBe('test:some-name');
  });
  it('qualifies HTML name', () => {
    expect(qualifyHtmlName(['some-name', ns], nsAlias)).toBe('test-some-name');
  });
  it('qualifies CSS class name', () => {
    expect(qualifyCssName(['some-class', ns], nsAlias)).toBe('some-class@test');
  });
});
