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

	hashModeSet() {
		return this.doubleHashingMode ? this.doubleHash : this.hashQuadraticProbe
	}

	hash(key) {
		const hash = this.hash1(key)
		const probe = this.hashModeSet()
		if (this.buckets[hash]) {
			if (this.buckets[hash][0] === key) return hash
			for (let i = 0; i < this.size - hash; i++) {
				const probeResult = probe(hash, i, key)
				if (this.buckets[probeResult] && this.buckets[probeResult][0] === key)
					return probeResult
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
		return this.hash(key)
	}

	get(key) {
		const index = this.hashedIndex(key)
		return this.buckets[index] ? this.buckets[index][1] : undefined
	}

	set(key, value) {
		if (this.length >= this.size)
			throw new Error(`Map maximum size exceeded. Length ${this.length}`)
		const index = this.hashedIndex(key)
		if (!this.buckets[index]) this.length++
		this.buckets[index] = Object.freeze([key, value])

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
		this.length--
		return true
	}

	clear() {
		this.buckets = Object.create(null)
		this.length = 0
	}
}

module.exports = {
	HashTable
}
