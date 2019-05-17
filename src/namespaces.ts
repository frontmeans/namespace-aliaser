import { NamespaceDef } from './namespace';

/**
 * [MathML] namespace definition.
 *
 * [MathML]: https://www.w3.org/Math/
 */
export const MathML__NS = new NamespaceDef('http://www.w3.org/1998/Math/MathML', 'math', 'mathml');

/**
 * [SVG] namespace definition.
 *
 * [SVG]: https://www.w3.org/Graphics/SVG/
 */
export const SVG__NS = new NamespaceDef('http://www.w3.org/2000/svg', 'svg');

/**
 * [XHTML] namespace definition.
 *
 * [XHTML]: https://www.w3.org/TR/xhtml1/
 */
export const XHTML__NS = new NamespaceDef('http://www.w3.org/1999/xhtml', 'xhtml');

/**
 * [XML] namespace definition.
 *
 * It is always bound to `xml` prefix.
 *
 * [XML]: https://www.w3.org/XML/1998/namespace
 */
export const XML__NS = new NamespaceDef('http://www.w3.org/XML/1998/namespace', 'xml');

/**
 * [XML Namespaces] namespace definition.
 *
 * It is always bound to `xmlns` prefix and should never be declared.
 *
 * [XML Namespace]: https://www.w3.org/TR/xml-names/#ns-decl
 */
export const XMLNS__NS = new NamespaceDef('http://www.w3.org/2000/xmlns/', 'xmlns');

/**
 * [XSL Transformations] namespace definition.
 *
 * [XSL Transformations]: https://www.w3.org/TR/1999/REC-xslt-19991116#xslt-namespace
 */
export const XSLT__NS = new NamespaceDef('http://www.w3.org/1999/XSL/Transform', 'xsl');
