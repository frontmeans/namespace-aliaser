/**
 * @module namespace-aliaser
 */
import { NameScope, NamespaceDef } from './namespace';
import { NamespaceAliaser } from './namespace-aliaser';
import { DEFAULT__NS } from './default.ns';

/**
 * A name in some namespace.
 *
 * This can be either:
 * - a simple non-empty name string, which means a name in the default namespace, or
 * - a name+namespace tuple.
 */
export type NameInNamespace = string | NameAndNamespace;

/**
 * A name and namespace tuple.
 *
 * Consists of non-empty name and namespace definition this name belongs to.
 */
export type NameAndNamespace = readonly [string, NamespaceDef];

/**
 * Checks whether the given `value` is a name+namespace tuple.
 *
 * @param value  A value to check.
 *
 * @returns `true` if the given `value` is an array consisting of exactly two elements, where the first element is a
 * non-empty string, and the second element is an instance of [[NamespaceDef]]. Or `false` otherwise.
 */
export function isNameAndNamespace(value: any): value is NameAndNamespace {
  return Array.isArray(value)
      && value.length === 2
      && typeof value[0] === 'string'
      && !!value[0]
      && value[1] instanceof NamespaceDef;
}

/**
 * Checks whether the given `value` is a name in some namespace.
 *
 * @param value  A value to check.
 *
 * @returns `true` if the given `value` is a non-empty string or an array consisting of exactly two elements,
 * where the first element is a non-empty string, and the second element is an instance of [[NamespaceDef]].
 * Or `false` otherwise.
 */
export function isNameInNamespace(value: any): value is NameInNamespace {
  return (typeof value === 'string' && !!value) || isNameAndNamespace(value);
}

/**
 * Detects a namespace of the given `name`
 *
 * @param name  A name to detect namespace of.
 *
 * @returns A namespace if the given `name` has it, or {@link DEFAULT__NS default namespace} otherwise.
 */
export function namespaceOf(name: NameInNamespace): NamespaceDef {
  return typeof name !== 'string' ? name[1] : DEFAULT__NS;
}

/**
 * Converts the given `name` to name and namespace tuple.
 *
 * @param name  A name to convert.
 *
 * @returns The `name` itself if it has a namespace, or a tuple consisting of `name` and
 * {@link DEFAULT__NS default namespace} otherwise.
 */
export function nameAndNamespace(name: NameInNamespace): NameAndNamespace {
  return typeof name !== 'string' ? name : [name, DEFAULT__NS];
}

/**
 * Checks whether two names are equal to each other.
 *
 * @param first  First name to compare.
 * @param second  Second name to compare.
 *
 * @returns `true` if both names are equal, or `false` otherwise.
 */
export function namesEqual(first: NameInNamespace, second: NameInNamespace): boolean {
  if (typeof first === 'string') {
    return typeof second === 'string' ? first === second : !second[1].url && second[0] === first;
  }

  const [firstName, { url: firstUrl }] = first;

  if (typeof second === 'string') {
    return !firstUrl && firstName === second;
  }

  return firstName === second[0] && firstUrl === second[1].url;
}

/**
 * Compares two names.
 *
 * Names in default namespace considered less than other names. Namespaces are compared by their URLs.
 *
 * @param first  First name to compare.
 * @param second  Second name to compare.
 *
 * @returns `-1` if `first` name is less than `second` one, `0` if they are equal, or `1` if `first` name is greater
 * than `second` one.
 */
export function compareNames(first: NameInNamespace, second: NameInNamespace): -1 | 0 | 1 {
  if (typeof first === 'string') {
    if (typeof second === 'string') {
      return compareStrings(first, second);
    }
    if (!second[1].url) {
      return compareStrings(first, second[0]);
    }
    return -1;
  }

  const [firstName, { url: firstUrl }] = first;

  if (typeof second === 'string') {
    if (!firstUrl) {
      return compareStrings(firstName, second);
    }
    return 1;
  }

  return compareStrings(firstUrl, second[1].url) || compareStrings(firstName, second[0]);
}

function compareStrings(first: string, second: string): -1 | 0 | 1 {
  return first < second ? -1 : first > second ? 1 : 0;
}

/**
 * Qualifies the given `name` by applying namespace alias to it.
 *
 * Utilizes  method for that.
 *
 * @param name  Name to qualify.
 * @param nsAlias  Namespace alias to apply.
 * @param scope  Name usage scope.
 *
 * @returns `name` itself for plain string names, or the result of [[NamespaceDef.qualify]] method applied to the `name`
 * and namespace alias returned by `nsAlias` namespace aliaser.
 */
export function qualifyName(
    name: NameInNamespace,
    nsAlias: NamespaceAliaser,
    scope?: NameScope): string {
  if (typeof name === 'string') {
    return name;
  }

  const [local, ns] = name;

  return ns.qualify(nsAlias(ns), local, scope);
}

/**
 * Qualifies the given `id` for its usage as identifier.
 *
 * @param id  An identifier to qualify.
 * @param nsAlias  A namespace aliaser to use.
 *
 * @returns `qualifyName(id, nsAlias, 'id')`.
 */
export function qualifyId(id: NameInNamespace, nsAlias: NamespaceAliaser): string {
  return qualifyName(id, nsAlias, 'id');
}

/**
 * Qualifies the given `name` for its usage as XML element name.
 *
 * @param name  A name to qualify.
 * @param nsAlias  A namespace aliaser to use.
 *
 * @returns `qualifyName(id, nsAlias, 'xml')`.
 */
export function qualifyXmlName(name: NameInNamespace, nsAlias: NamespaceAliaser): string {
  return qualifyName(name, nsAlias, 'xml');
}

/**
 * Qualifies the given `name` for its usage as HTML element name.
 *
 * @param name  A name to qualify.
 * @param nsAlias  A namespace aliaser to use.
 *
 * @returns `qualifyName(id, nsAlias, 'html')`.
 */
export function qualifyHtmlName(name: NameInNamespace, nsAlias: NamespaceAliaser): string {
  return qualifyName(name, nsAlias, 'html');
}

/**
 * Qualifies the given `name` for its usage as CSS class name.
 *
 * @param name  A name to qualify.
 * @param nsAlias  A namespace aliaser to use.
 *
 * @returns `qualifyName(id, nsAlias, 'css')`.
 */
export function qualifyCssName(name: NameInNamespace, nsAlias: NamespaceAliaser): string {
  return qualifyName(name, nsAlias, 'css');
}
