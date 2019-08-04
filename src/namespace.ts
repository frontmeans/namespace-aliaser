/**
 * @module namespace-aliaser
 */
import { Naming } from './naming';
import { default__naming } from './namings';

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
   * Converts a local `name` belonging to this namespace to simple one according to the given `naming` schema.
   *
   * Calls [[Naming.applyAlias]] by default.
   *
   * @param alias  Namespace alias to apply to the name.
   * @param name  A name to convert.
   * @param naming  Naming schema to use. {@link default__naming default naming schema} is used when omitted.
   *
   * @returns A simple name with this namespace alias applied.
   */
  name(alias: string, name: string, naming: Naming = default__naming): string {
    return naming.applyAlias(name, alias, this);
  }

}
