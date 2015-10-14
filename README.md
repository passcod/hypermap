# HyperMap

A more generic version of BiMap (as seen in [C++ Boost][1], [Google][2]), that
associates two or more values together, such that only one is required to recall
all others.

## Install

```
npm install --save hypermap
```

## API

### new HyperMap([iterable])

`iterable` is an Array or other iterable object whose elements are tuples (arrays).
Each item in each tuple is added to the new HyperMap. `null` is treated as `undefined`.

### HyperMap.prototype.associate(items...)

Associates two or more items. Throws if less than two arguments are passed. If
neither item exists in the HyperMap, creates a new association, otherwise adds
the items to the existing association. Throws if you try to associate an item
already present in another association.

Returns the `HyperMap` object.

### HyperMap.prototype.disassociate(ref, itemsToRemove...)

Disassociate items. Selects an association based on `ref`, then removes items
from it as directed. Does nothing if an association is not found. If, as a result
of this method, an association now has less than two items, it is destroyed.

Returns the `HyperMap` object.

### HyperMap.prototype.get(ref)

Returns the association that contains `ref`, as a `Set`, or `undefined` if not found.

### HyperMap.prototype.has(ref)

Returns a boolean indicating whether `ref` is in the `HyperMap`.

## License

Copyright © 2015 Félix Saparelli, licensed under [MIT][3]

[1]: http://www.boost.org/doc/libs/1_59_0/libs/bimap/doc/html/index.html
[2]: https://google-collections.googlecode.com/svn/trunk/javadoc/com/google/common/collect/BiMap.html
[3]: http://passcod.mit-license.org/
