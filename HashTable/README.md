# JavaScript Custom Implementation Of Hash Table

This learning exercise builds a custom JavaScript implementation of hash table data structure called `HashTable`.

## On JavaScript's Built-In Implementations of Hash Table

A JavaScript `Object` is essentially a hash table. However, it has extra properties (its own and through the prototype chain.) It also does not keep track of its own size/length.

There is a newer, built-in type called [`Map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) that solves these problems. This custom implementation works in alignment with actual JS  `Map()`, except where there is a learning benefit to doing otherwise, such as implementing two modes.

Note: There are also complexities as to how JavaScript runs under the hood compared to what's assumed of a hash table data structure. The V8 engine may run in "dictionary mode" with a more traditional hashing algorithm. But it is more likely to use "hidden classes."

## In This Version Of A JavaScript Hash Table

1. Ordered

   Hash tables don't need to be ordered, however JS `Map()` is ordered by insertion order.

2. Drops extra keys on built-in `Object` type.  

   For an underlying datatype:  

   `Array` is ordered, but it will have it's own properties.

   `Object.create(null)` gets rid of those extra keys, but how is it ordered?  By creating strings that won't convert to numbers as keys, the [keys should be in insertion order](https://www.stefanjudis.com/today-i-learned/property-order-is-predictable-in-javascript-objects-since-es2015/).

3. Keeps track of its own a length

4. Uses a hash function to assign unique indices for keys to look up key-value pairs (entries).

5. Deals with collisions when two different keys generate the same key and try to fill a filled index.

6. Uses [`[Symbol.iterator]`](https://stackoverflow.com/questions/28739745/how-to-make-an-iterator-out-of-an-es6-class) to make `HashTable` instances iterable.

## Hashing And Collisions

This implementation of a hash table in `HashTable` uses open addressing to resolve collisions. A `HashTable` type can be created in one of two modes, [quadratic probing or double hashing](https://cathyatseneca.gitbooks.io/data-structures-and-algorithms/content/tables/quadratic_probing_and_double_hashing.html).

1. Quadratic probing - Slows after 50% full, vulnerable to going over the same indices, creating infinite loop.

2. [Double Hashing](https://www.geeksforgeeks.org/double-hashing/) - Solves problem of slow down with quadratic probing, more complex to implement / recall.

The hashing algorithms need a size value. A little research turned up a good `size` attribute for the `HashTable`:

- https://stackoverflow.com/questions/63178278/do-javascript-maps-have-a-set-amount-of-keys-that-they-can-set-or-do-they-have-a
- https://stackoverflow.com/questions/54452896/maximum-number-of-entries-in-node-js-map#comment95714163_54452896

## Developer Contact Info

You are welcome to contact me regarding:

- Jobs
- Alternative learning and self-learning to code
- Women and LGBTQ+ folks in tech

LinkedIn: https://www.linkedin.com/in/jenna-tucker/

Gmail: jennatuckerdeveloper[at]gmail.com
