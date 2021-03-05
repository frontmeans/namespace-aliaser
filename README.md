Namespace Aliaser
=================

[![NPM][npm-image]][npm-url]
[![Build Status][build-status-img]][build-status-link]
[![GitHub Project][github-image]][github-url]
[![API Documentation][api-docs-image]][api-docs-url]

Maintains unique aliases for namespaces. Supports XML, HTML, and CSS.


[npm-image]: https://img.shields.io/npm/v/@frontmeans/namespace-aliaser.svg?logo=npm
[npm-url]: https://www.npmjs.com/package/@frontmeans/namespace-aliaser
[build-status-img]: https://github.com/frontmeans/namespace-aliaser/workflows/Build/badge.svg
[build-status-link]: https://github.com/frontmeans/namespace-aliaser/actions?query=workflow%3ABuild
[github-image]: https://img.shields.io/static/v1?logo=github&label=GitHub&message=project&color=informational
[github-url]: https://github.com/frontmeans/namespace-aliaser
[api-docs-image]: https://img.shields.io/static/v1?logo=typescript&label=API&message=docs&color=informational
[api-docs-url]: https://frontmeans.github.io/namespace-aliaser/


Usage
-----

Namespaces can be used to ensure the names are unique.

For doing so with the help of this library:

1. Create namespace definition(s).
2. Create `NamespaceAliaser` instance.
3. Use that namespace aliaser to convert names from different namespaces to simple string names.

The library ensures that names from different namespaces converted to different string names by applying
unique namespace aliases to them. 

```typescript
import { newNamespaceAliaser, NamespaceDef } from '@frontmeans/namespace-aliaser';

// Create namespace definition
const ns1 = new NamespaceDef(
  'http://my-site.com/ns1',  // Unique namespace URL. Namespaces are identified by their URLs.
  'my-ns', 'my-namespace',   // Preferred namespace aliases to use.
);

// Create another namespace definition
const ns2 = new NamespaceDef(
  'http://my-site.com/ns2',  // Different URL
  'my-ns', 'my-namespace-2', // Aliases could be the same for different namespaces
                             // The library would select the one unique to each of the them,
                             // or generate a new alias. 
);

// Create namespace aliaser.
// It is important to use the same instance for all operations
const nsAlias = newNamespaceAliaser();

// Create aliases for each namespace
const alias1 = nsAlias(ns1); // `my-ns`
const alias2 = nsAlias(ns2); // `my-namespace-2`

// Convert names in namespaces to simple ones, unique to each namespace
// Even though the local names are the same, the resulting names are unique,
// as different aliases applied.   
const name1 = ns1.name(alias1, 'name'); // `my-ns-name`
const name2 = ns2.name(alias2, 'name'); // `my-namespace-2-name`
```

Namespace
---------

There are several predefined namespaces:

- `DEFAULT__NS` Default namespace.

  This namespace is assumed for names without namespace specified.
                                    
  Its URL is empty. And it does not alter names, i.e. its [[NamespaceDef.name]] method returns the name as is.
  
- `MathML__NS` [MathML](https://www.w3.org/Math/) namespace.
- `SVG__NS` [SVG](https://www.w3.org/Graphics/SVG/) namespace.
- `XHTML__NS` [XHTML](https://www.w3.org/TR/xhtml1/) namespace.
- `XML__NS` [XML](https://www.w3.org/XML/1998/namespace) namespace. Always bound to `xml` alias.
- `XMLNS__NS` [XML Namespaces](https://www.w3.org/TR/xml-names/#ns-decl) namespace. Always bound to `xmlns` alias.
- `XSLT__NS` [XSL Transformations](https://www.w3.org/TR/1999/REC-xslt-19991116#xslt-namespace) namespace.   

More namespaces could be defined by instantiating or extending `NamespaceDef` class. Note that namespaces are
identified by their URLs, rather by their definitions.


Naming Schema
-------------

A naming schema is responsible for applying namespace aliases to simple names.

Naming schemes extend `Naming` class.

A naming schema can be passed as a third argument to `NamespaceDef.name()` method. A `default__naming` is used
by default.

So, given the previous definitions, the following code would result to different names:
```typescript
const xmlName1 = ns1.name(alias1, 'name', xml__naming); // `my-ns:name`
const cssName2 = ns2.name(alias2, 'name', css__naming); // `name@my-namespace-2`
```

There are several predefined naming schemas:

- `default__naming` Default naming schema.
   
  Prefixes a name with namespace alias separating them by dash.
   
  The result looks like `<alias>-<name>`.

- `html__naming` HTML elements naming schema.

  Prefixes a name with namespace alias separating them by dash.
  
  The result looks like `<alias>-<name>`.
  
- `xml__naming` XML elements naming schema.

  Prefixes a name with namespace alias separating them by colon.
  
  The result looks like `<alias>:<name>`.
  
- `id__naming` Element identifiers naming schema.

  Prefixes a name with namespace alias separating them by colon.
  
  The result looks like `<alias>:<name>`.
  
- `css__naming` CSS classes naming scheme.

  Appends namespace alias as a name suffix separated by `@` sign.
  
  The result looks like `<name>@<alias>`.         


Qualified Name
--------------

Qualified name is a tuple consisting of local name string and namespace definition.

The `Naming` class has a utility method that allows to convert arbitrary qualified name to simple one.

So, the example above could be simplified to this:
```typescript
import { default__naming, newNamespaceAliaser, NamespaceDef } from '@frontmeans/namespace-aliaser';

// Create namespace definition
const ns1 = new NamespaceDef(
  'http://my-site.com/ns1',  // Unique namespace URL. Namespaces are identified by their URLs.
  'my-ns', 'my-namespace',   // Preferred namespace aliases to use.
);

// Create another namespace definition
const ns2 = new NamespaceDef(
  'http://my-site.com/ns2',  // Different URL
  'my-ns', 'my-namespace-2', // Aliases could be the same for different namespaces
                             // The library would select the one unique to each of the them,
                             // or generate a new alias. 
);

// Create namespace aliaser.
// It is important to use the same instance for all operations
const nsAlias = newNamespaceAliaser();

// Convert qualified names to simple ones.   
const name1 = default__naming.name(['name', ns1], nsAlias); // `my-ns-name`
const name2 = default__naming.name(['name', ns2], nsAlias); // `my-namespace-2-name`
```

A simple string is considered a qualified name in default namespace (`DEFAULT__NS`) and can be passed to `Naming.name()`
method too. The original name would not be altered though. So all of the following expressions would return the same
result:
```typescript
default__naming.name('name', nsAlias);                // `name`
css__naming.name('name', nsAlias);                    // `name`
default__naming.name(['name', DEFAULT__NS], nsAlias); // `name`
```
