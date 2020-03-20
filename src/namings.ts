/**
 * @packageDocumentation
 * @module @proc7ts/namespace-aliaser
 */
import { Naming } from './naming';

/**
 * @internal
 */
class DefaultNaming extends Naming {

  applyAlias(name: string, alias: string): string {
    return `${alias}-${name}`;
  }

}

/**
 * Default naming schema.
 *
 * Prefixes a name with namespace alias separating them by dash.
 *
 * The result looks like `<alias>-<name>`.
 */
export const default__naming: Naming = (/*#__PURE__*/ new DefaultNaming());

/**
 * HTML elements naming schema.
 *
 * Prefixes a name with namespace alias separating them by dash.
 *
 * The result looks like `<alias>-<name>`.
 */
export const html__naming: Naming = (/*#__PURE__*/ new DefaultNaming());

/**
 * @internal
 */
class XmlNaming extends Naming {

  applyAlias(name: string, alias: string): string {
    return `${alias}:${name}`;
  }

}

/**
 * XML elements naming schema.
 *
 * Prefixes a name with namespace alias separating them by colon.
 *
 * The result looks like `<alias>:<name>`.
 */
export const xml__naming: Naming = (/*#__PURE__*/ new XmlNaming());

/**
 * Element identifiers naming schema.
 *
 * Prefixes a name with namespace alias separating them by colon.
 *
 * The result looks like `<alias>:<name>`.
 */
export const id__naming: Naming = (/*#__PURE__*/ new XmlNaming());

/**
 * @internal
 */
class CssNaming extends Naming {

  applyAlias(name: string, alias: string): string {
    return `${name}@${alias}`;
  }

}

/**
 * CSS classes naming scheme.
 *
 * Appends namespace alias as a name suffix separated by `@` sign.
 *
 * The result looks like `<name>@<alias>`.
 */
export const css__naming: Naming = (/*#__PURE__*/ new CssNaming());
