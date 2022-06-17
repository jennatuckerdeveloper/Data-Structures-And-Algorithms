/* 
A JavaScript object is essentially a hash table. 
However, it has extra properties (its own and through the prototype chain.)
It also does not keep track of its own count.  
There is a newer, built-in type called a Map() that solves these problems.

This exercise aims to build a JS hash table from scratch. 
It should be brought into alignment with actual JS Map(), 
except where there is a learning benefit to doing otherwise. 

HashTables don't need to be ordered, but JS Map() is ordered by insertion order. 
Keep track of its own a length. 
Accept anything as a key like JS Map() (Objects accept strings and symbols). 
- So they must be stringified and hashed, right? 
Use a hash function to assign indices. 
Deal with collisions.  

Open addressing 
Quadratic probing - loses efficiency when over 50% of buckets filled 
Double Hashing - solves problem of slow down with quadratic probing 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
https://stackoverflow.com/questions/63178278/do-javascript-maps-have-a-set-amount-of-keys-that-they-can-set-or-do-they-have-a
https://stackoverflow.com/questions/54452896/maximum-number-of-entries-in-node-js-map#comment95714163_54452896
https://www.geeksforgeeks.org/double-hashing/
https://cathyatseneca.gitbooks.io/data-structures-and-algorithms/content/tables/quadratic_probing_and_double_hashing.html

Implement this with quadratic probing.
But create a mode for double hashing. 
How does Mosh explain the relationship between these two?  

* Implement quadratic probing. - Slows after 50% full, vulnerable to going over the same indices, creating infinite loop. 
* Implement mode for double hashing. 
* Test behavior. 

For this.buckets, underlying datatype:  
Array is ordered, but it will have it's own properties. 
Object.create(null) gets rid of those extra keys, but how is it ordered? 
By creating strings that won't convert to numbers as keys, this should be insertion order. 
https://www.stefanjudis.com/today-i-learned/property-order-is-predictable-in-javascript-objects-since-es2015/

https://stackoverflow.com/questions/28739745/how-to-make-an-iterator-out-of-an-es6-class
*/

class HashTable {
	constructor(doubleHashingMode = false) {
		this.size = 2 ** 24 - 1 // 16777215
		this.prime = 16777213
		this.buckets = Object.create(null)
		this.length = Object.keys(this.buckets).length
		this.doubleHashingMode = doubleHashingMode
	}

	[Symbol.iterator]() {
		let index = -1
		let data = Object.keys(this.buckets)

		return {
			next: () => ({
				value: this.buckets[data[++index]],
				done: !(index in data)
			})
		}
	}

	unicodeSumOfKey(key) {
		return String(key)
			.split('')
			.reduce((res, c) => res + c.charCodeAt(0), 0)
	}

	hash(key) {
		const hash = this.hash1(key)
		const probe = this.doubleHashingMode
			? this.doubleHash
			: this.hashQuadraticProbe
		if (this.buckets[hash]) {
			for (let i = 0; i < this.size - hash; i++) {
				const probeResult = probe(hash, i, key)
				if (!this.buckets[probeResult]) return probeResult
			}
		}
		return hash
	}

	hash1(key) {
		return this.unicodeSumOfKey(key) % this.size
	}

	hashQuadraticProbe = (hash1, i) => {
		return (hash1 + i ** 2) % this.size
	}

	doubleHash = (hash1, i, key) => {
		const hash2 = (key) => {
			return this.prime - (this.unicodeSumOfKey(key) % this.prime)
		}
		return (hash1 + i * hash2(key)) % this.size
	}

	hashedIndex(key) {
		// Make the hashed key non-numerical string to order by insertion / chronological.
		return this.hash(`Map${key}`)
	}

	get(key) {
		const index = this.hashedIndex(key)
		return this.buckets[index][1]
	}

	set(key, value) {
		if (this.length >= this.size)
			throw new Error(`Map maximum size exceeded. Length ${this.length}`)
		const index = this.hashedIndex(key)
		this.buckets[index] = Object.freeze([key, value])
		this.length++
		return this
	}

	has(key) {
		const index = this.hashedIndex(key)
		return Boolean(this.buckets[index])
	}

	delete(key) {
		if (!this.has(key)) return false
		const index = this.hashedIndex(key)
		delete this.buckets[index]
		return true
	}

	clear() {
		this.buckets = Object.create(null)
		this.length = 0
	}
}

const myMap = new HashTable()
const myMapD = new HashTable(true)

const myKeys = new Set()
for (let i = 0; myKeys.size < 200; i++) {
	myKeys.add(Math.random() * 100)
}

const myIndices = new Set()
const myIndicesD = new Set()
for (let key of myKeys.values()) {
	// myIndices.add(myMap.hash(key))
	myMap.set(key, 'a generic value')
	myMapD.set(key, 'a generic value')
}
console.log('unique key set size', myKeys.size)
// console.log('indices set size', myIndices.size)
console.log('length in Map', Object.keys(myMap.buckets).length)
console.log('called', myMap.called)
console.log('inner', myMap.inner)

console.log(myMapD.length)
console.log('length in Map', Object.keys(myMapD.buckets).length)

// Missing feature / logic => Should be able to replace the same key 