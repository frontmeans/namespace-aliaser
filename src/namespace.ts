/**
 * @module namespace-aliaser
 */
/**
 * Namespace definition.
 *
 * Namespaces are identified by their URLs.
 */
export class NamespaceDef {

  /**
   * Unique namespace URL.
   */
  readonly url: string;

  /**
   * Preferred namespace aliases.
   */
  readonly aliases: readonly string[];

  /**
   * The most preferred namespace alias.
   *
   * By default this is the first preferred alias, or `ns` if there is no preferred aliases.
   */
  get alias(): string {
    return this.aliases[0] || 'ns';
  }

  /**
   * Constructs new namespace definition.
   *
   * @param url  Unique namespace URL.
   * @param aliases  Preferred namespace aliases. It is expected that each alias is an ASCII letter followed by
   * any number of ASCII letters, digits, `-`, or `_` signs. Aliases starting with `xml` are reserved. Empty alias
   * is reserved for [default namespace][[DEFAULT__NS]].
   */
  constructor(url: string, ...aliases: string[]) {
    this.url = url;
    this.aliases = aliases;
  }

  /**
   * Qualifies a local name in this namespace. E.g by prefixing it with namespace alias.
   *
   * By default:
   * - qualifies `name` in `id` and `xml` scopes as `<alias>:<name>`, which is valid XML and HTML4 ID,
   * - qualifies `name` in `css` scope as `<name>@<alias>`,
   * - qualifies `name` in `html` and other scopes as `<alias>-<name>`.
   *
   * @param alias  Namespace alias to apply to the name.
   * @param name  A name to convert.
   * @param scope  Name usage scope.
   *
   * @returns A name qualified with namespace alias.
   */
  qualify(alias: string, name: string, scope?: NameScope): string {
    switch (scope) {
      case 'id':
      case 'xml':
        return `${alias}:${name}`;
      case 'css':
        return `${name}@${alias}`;
    }
    return `${alias}-${name}`;
  }

}

/**
 * Name usage scope.
 *
 * The following scopes supported:
 * - `id` for element identifiers,
 * - `xml` for XML element names,
 * - `html` for HTML element names,
 * - `css` for CSS class names.
 */
export type NameScope = 'id' | 'xml' | 'html' | 'css';
