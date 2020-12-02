/**
 * @packageDocumentation
 * @module @frontmeans/namespace-aliaser
 */
import type { QualifiedName } from './name';
import type { NamespaceDef } from './namespace';
import type { NamespaceAliaser } from './namespace-aliaser';

/**
 * Naming schema is responsible for applying namespace aliases to simple names. E.g. by appending alias as prefix or
 * suffix of the name.
 */
export abstract class Naming {

  /**
   * Applies the given namespace `alias` to the given local `name`.
   *
   * @param name Local name to apply namespace alias to.
   * @param alias Namespace alias to apply.
   * @param namespace Aliased namespace definition.
   *
   * @returns A string containing the `name` with `alias` applied to it.
   */
  abstract applyAlias(name: string, alias: string, namespace: NamespaceDef): string;

  /**
   * Converts the given qualified `name` into simple one accordingly to this naming schema.
   *
   * @param name Qualified name to convert.
   * @param nsAlias Namespace aliaser to use.
   */
  name(name: QualifiedName, nsAlias: NamespaceAliaser): string {
    if (typeof name === 'string') {
      return name;
    }

    const [local, ns] = name;

    return ns.name(nsAlias(ns), local, this);
  }

}
