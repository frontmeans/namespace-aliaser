import { describe, expect, it } from '@jest/globals';
import { MathML__NS, SVG__NS, XHTML__NS, XML__NS, XMLNS__NS, XSLT__NS } from './namespaces';

describe('MathML__NS', () => {
  it('has URL `http://www.w3.org/1998/Math/MathML`', () => {
    expect(MathML__NS.url).toBe('http://www.w3.org/1998/Math/MathML');
  });
});
describe('SVG__NS', () => {
  it('has URL `http://www.w3.org/2000/svg`', () => {
    expect(SVG__NS.url).toBe('http://www.w3.org/2000/svg');
  });
});
describe('XHTML__NS', () => {
  it('has URL `http://www.w3.org/1999/xhtml`', () => {
    expect(XHTML__NS.url).toBe('http://www.w3.org/1999/xhtml');
  });
});
describe('XML__NS', () => {
  it('has URL `http://www.w3.org/XML/1998/namespace`', () => {
    expect(XML__NS.url).toBe('http://www.w3.org/XML/1998/namespace');
  });
});
describe('XMLNS__NS', () => {
  it('has URL `http://www.w3.org/2000/xmlns/`', () => {
    expect(XMLNS__NS.url).toBe('http://www.w3.org/2000/xmlns/');
  });
});
describe('XSLT__NS', () => {
  it('has URL `http://www.w3.org/1999/XSL/Transform`', () => {
    expect(XSLT__NS.url).toBe('http://www.w3.org/1999/XSL/Transform');
  });
});
