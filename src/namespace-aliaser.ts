import { cxDefaultScoped, CxEntry, CxGlobals, cxRecent } from '@proc7ts/context-values';
import type { NamespaceDef } from './namespace-def';

/**
 * Namespace aliaser function interface.
 *
 * Maps namespaces to their unique aliases.
 *
 * @param ns - A definition of namespace to find alias for.
 *
 * @returns Namespace alias.
 */
export type NamespaceAliaser = (this: void, ns: NamespaceDef) => string;

/**
 * Context entry containing global namespace aliaser instance.
 *
 * Tracks the most recently provided namespace aliaser. Creates new global namespace aliaser instance by default.
 */
export const NamespaceAliaser: CxEntry<NamespaceAliaser> = {
  perContext: (/*#__PURE__*/ cxDefaultScoped(
      CxGlobals,
      (/*#__PURE__*/ cxRecent<NamespaceAliaser>({
        create: (recent, _) => recent,
        byDefault: _ => newNamespaceAliaser(),
        assign: ({ get, to }, _) => {

          const nsAlias: NamespaceAliaser = ns => get()(ns);

          return receiver => to((_, by) => receiver(nsAlias, by));
        },
      })),
  )),
  toString: () => '[NamespaceAliaser]',
};

/**
 * Creates a namespace aliaser.
 *
 * The returned function tries to find a registered alias for the given namespace. If not found then tries to use one
 * of its preferred aliases. If all of them are reserved already for another namespaces, generates a new unique alias.
 *
 * @returns New instance of namespace aliaser.
 */
export function newNamespaceAliaser(): NamespaceAliaser {

  const aliasesByNs = new Map<string, string>();
  const nsNumPerAlias = new Map<string, number>();

  return function nsAlias(ns: NamespaceDef): string {

    const found = aliasesByNs.get(ns.url);

    if (found) {
      return found;
    }

    const mostPreferred = ns.alias;
    let nsNumRegistered = 0;

    for (const preferred of [mostPreferred, ...ns.aliases]) {

      const ids = nsNumPerAlias.get(preferred);

      if (!ids) {
        aliasesByNs.set(ns.url, preferred);
        nsNumPerAlias.set(preferred, 1);
        return preferred;
      }
      if (!nsNumRegistered) {
        // Use the first one
        nsNumRegistered = ids;
      }
    }

    const generated = `${mostPreferred}${++nsNumRegistered}`;

    aliasesByNs.set(ns.url, generated);
    nsNumPerAlias.set(mostPreferred, nsNumRegistered);

    return generated;
  };
}
