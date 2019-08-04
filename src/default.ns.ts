/**
 * @module namespace-aliaser
 */
import { NamespaceDef } from './namespace';

class DefaultNs extends NamespaceDef {

  constructor() {
    super('');
  }

  name(alias: string, name: string): string {
    return name;
  }
}

/**
 * Default namespace.
 *
 * This namespace is assumed for names without namespace specified.
 *
 * Its URL is empty. And it does not qualify any names, i.e. its [[NamespaceDef.qualify]] method returns the name as is.
 */
export const DEFAULT__NS: NamespaceDef = /*#__PURE__*/ new DefaultNs();
