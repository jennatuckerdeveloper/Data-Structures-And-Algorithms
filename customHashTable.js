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
*/

class HashTable {
	constructor(doubleHashingMode = false) {
		this.size = 2 ** 24 - 1 // 16777215
		this.prime = 16777213
		this.buckets = Object.create(null)
		this.length = Object.keys(this.buckets).length
		this.doubleHashingMode = doubleHashingMode
		this.called = 0
		this.inner = 0
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

	newHashFunction(key) {
		this.called++
		const hash1 = this.unicodeSumOfKey(key) % this.size
		if (!this.buckets[hash1]) {
			this.buckets[hash1] = []
			return hash1
		}
		this.inner++
		let skip = 1
		for (let i = 0; i < this.size - hash1; i++) {
			console.log(hash1 + skip)
			if (!this.buckets[hash1 + skip]) {
				this.buckets[hash1 + skip] = []
				return hash1 + skip
			}
			skip++
		}
	}

	unicodeSumOfKey(key) {
		return String(key)
			.split('')
			.reduce((res, c) => res + c.charCodeAt(0), 0)
	}

	hash(key) {
		return this.doubleHashingMode
			? this.doubleHash(key)
			: this.hashQuadraticProbe(key)
	}

	hash1 = (key) => {
		return this.unicodeSumOfKey(key) % this.size
	}

	hashQuadraticProbe(key) {
		this.called++
		const hash = this.hash1(key)
		// if (!this.buckets[hash]) {
		// 	this.buckets[hash] = []
		// 	return hash
		// }

		// Missing logic.  SOmetimes you get the same index, and you do want to replace the value.
		// if (this.buckets[hash]) {
		// 	console.log(this.buckets[hash][0] === key)
		// }

		if (this.buckets[hash]) {
			this.inner++
			for (let i = 0; i < this.size - hash; i++) {
				const probeAtIndex = (hash + i ** 2) % this.size
				if (!this.buckets[probeAtIndex]) {
					return probeAtIndex
				}
			}
		}

		return hash
	}

	doubleHash(key) {
		const hash2 = (key) => {
			return this.prime - (this.unicodeSumOfKey(key) % this.prime)
		}

		const hash = this.hash1(key)

		if (this.buckets[hash]) {
			for (let i = 0; i < this.size; i++) {
				const doubleHashed = (hash + i * hash2(key)) % this.size
				if (!this.buckets[this.formatKey(doubleHashed)]) return doubleHashed
			}
		}
		return hash
	}

	formatKey(key) {
		return String(`x${this.hash(key)}`)
	}

	get(key) {
		const index = this.formatKey(key)
		return this.buckets[index][1]
	}

	set(key, value) {
		if (this.length >= this.size)
			throw new Error(`Map maximum size exceeded. Length ${this.length}`)
		// Make the hashed key non-numerical string to order by insertion / chronological.
		const index = this.hash(key)
		this.buckets[index] = Object.freeze([key, value])
		this.length++
		return this
	}

	has(key) {
		const index = hash(key)
		return Boolean(this.content[index])
	}

	delete() {}

	clear() {}

	print() {
		return this.buckets
	}
}

/* 

Create a set of 200 unique keys.
Create a hashing function to find unique indices in a range.
Create a set of these indices => Are there 200?

*/

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
}
console.log('unique key set size', myKeys.size)
// console.log('indices set size', myIndices.size)
console.log('length in Map', Object.keys(myMap.buckets).length)
console.log('called', myMap.called)
console.log('inner', myMap.inner)
// console.log(myIndicesD.size)

