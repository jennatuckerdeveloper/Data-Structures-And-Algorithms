# JavaScript Custom Implementation Of Array

This learning exercise builds a custom JavaScript implementation of an array data structure called `CustomArray`.  This exercise serves as an exploration of array data structures (an to an extent related data structures as discussed below), built-in JS array methods, and various common, sorting algorithms.  

## On JavaScript's Built-In Implementations of Array

### Built-In Array Type

An [array data structure](https://en.wikipedia.org/wiki/Array_data_structure) holds a collection of elements referenced by an array index or key, and the keys are a contiguous set of integer values.  An element can be found in constant or O(1) time, no matter the position in the array.  Generally, a mathematical formula uses the start or base address of the array and the stride, essentially the size of the data type in the array, to determine any element's address. So in traditional, direct implementations of an array data structure, arrays hold a single data type and often have an explicit size.  This allows arrays their fast speed.

The most well-known meaning of "array" in JavaScript is the built-in JavaScript `Array` type.  This is "an array-like" construct" with the expected keys and sequential, numerical indices.  Most JS devs leverage `Arrays` frequently as the main ordered and iterable type in JS.  However, JavaScript arrays take elements of any type and are dynamically sized.  In other words, developers who know more traditional arrays in other languages can use JS arrays intuitively, but they do work differently under the hood.  

Under the hood, JavaScript's `Array` type is built on top of JavaScript's `Object` type.  A JavaScript `Object` is essentially a hash table data structure, not a direct implementation of an array data structure.  Traditionally, direct implementations of an array data structure use contiguous blocks of memory for fast look-up.  JavaScript arrays dynamically allocate memory in addresses that are not contiguous.  This means that JavaScript leverages other optimization strategies to make look-ups fast than traditional, direct implementations of array data structures in other languages.  

Using `Object` under the hood for a JS `Array` allows for the expected constant O(1) time to reference any element.  Unlike an object, when adding or removing to the beginning of an array, all existing elements will need to be re-indexed.  This is in line with array data structures that expect adding and removing (pushing and popping) from the end to be O(1) and adding and removing from the beginning (unshifting and shifting) to be linear O(2) as existing elements get re-indexed.  

Note: There are also complexities as to how JavaScript runs under the hood compared to what's assumed of a hash table data structure. The V8 engine may run in "dictionary mode" with a more traditional hashing algorithm. But it is more likely to use "hidden classes."  Essentially, the interfaces and times of these types in JavaScript match expectations.  But the actual implementation and optimizations strategies differ.  

#### Associative Array Distinction

One other confusing distinction comes with the similarities between `array` and `associative array`.  An associative array is also a collection of elements with indices or keys, but those keys do not have to be sequential or numerical.  A `hash table` is an implementation of the higher-level abstract concept of an `associative array`, so JS's `Object` type is an `associative array`. By inheritance, the JS `array` type would be an `associative array.` However, the docs explicitly state that JS array is not an `associative array`, because the keys/indices cannot be any string, but must be nonnegative integers. But these are actually their string representations under the hood, since this is, in fact, a type built on top of an associate array.  So the conversation across discussions can be confusing.  

### TypedArray

As the uses of JavaScript expanded, the language came to include an implement of an array data structure closer to the way more traditional high-level languages directly implemented an array data structure.  The built-in [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) [uses a contiguous block of memory](https://stackoverflow.com/questions/20321047/how-are-javascript-arrays-represented-in-physical-memory).  These arrays are essentially typed, though the implementation of typing may take a moment for devs coming out of other traditions besides JS.  There is essentially a separation between the binary data buffer and array-like data view that applies the type interpretation.

## In This Custom Version Of A JavaScript Array

This implementation will parallel the common, built-in JavaScript `Array` type that inherits from `Object` to the extent possible.  They will allow for various types and be dynamic, sparse arrays that do not allocate memory when the code `new Array(100)` runs.  

## Developer Contact Info

You are welcome to contact me regarding:

- Jobs
- Alternative learning and self-learning to code
- Women and LGBTQ+ folks in tech

LinkedIn: https://www.linkedin.com/in/jenna-tucker/

Gmail: jennatuckerdeveloper[at]gmail.com
