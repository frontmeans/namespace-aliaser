/**
 * @packageDocumentation
 * @module namespace-aliaser
 */
import { NamespaceDef } from './namespace';

/**
 * [MathML](https://www.w3.org/Math/) namespace definition.
 */
export const MathML__NS = (/*#__PURE__*/ new NamespaceDef('http://www.w3.org/1998/Math/MathML', 'math', 'mathml'));

/**
 * [SVG](https://www.w3.org/Graphics/SVG/) namespace definition.
 */
export const SVG__NS = (/*#__PURE__*/ new NamespaceDef('http://www.w3.org/2000/svg', 'svg'));

/**
 * [XHTML](https://www.w3.org/TR/xhtml1/) namespace definition.
 */
export const XHTML__NS = (/*#__PURE__*/ new NamespaceDef('http://www.w3.org/1999/xhtml', 'xhtml'));

/**
 * [XML](https://www.w3.org/XML/1998/namespace) namespace definition.
 *
 * It is always bound to `xml` alias.
 */
export const XML__NS = (/*#__PURE__*/ new NamespaceDef('http://www.w3.org/XML/1998/namespace', 'xml'));

/**
 * [XML Namespaces](https://www.w3.org/TR/xml-names/#ns-decl) namespace definition.
 *
 * It is always bound to `xmlns` alias and should never be declared.
 */
export const XMLNS__NS = (/*#__PURE__*/ new NamespaceDef('http://www.w3.org/2000/xmlns/', 'xmlns'));

/**
 * [XSL Transformations](https://www.w3.org/TR/1999/REC-xslt-19991116#xslt-namespace) namespace definition.
 */
export const XSLT__NS = (/*#__PURE__*/ new NamespaceDef('http://www.w3.org/1999/XSL/Transform', 'xsl'));
