/**
 * @packageDocumentation
 * @module namespace-aliaser
 */
import { NamespaceDef } from './namespace';

/**
 * @internal
 */
class DefaultNs extends NamespaceDef {

  constructor() {
    super('');
  }

  name(_alias: string, name: string): string {
    return name;
  }

}

/**
 * Default namespace.
 *
 * This namespace is assumed for names without namespace specified.
 *
 * Its URL is empty. And it does not alter names, i.e. its [[NamespaceDef.name]] method returns the name as is.
 */
export const DEFAULT__NS: NamespaceDef = (/*#__PURE__*/ new DefaultNs());
