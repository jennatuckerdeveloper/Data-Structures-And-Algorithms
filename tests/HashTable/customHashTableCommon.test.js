const { HashTable } = require('../../HashTable/customHashTable.js')

module.exports = {
	HashTableCommon: (hashTable) => {
		describe('custom JS HashTable', () => {
			// Make 200 unique keys
			const myKeys = new Set()
			for (let i = 0; myKeys.size < 200; i++) {
				myKeys.add(Math.random() * 100)
			}

			const computedValue = (key) => `${key} value`

			it('should set the length as entries are added', () => {
				expect(myKeys.size).toBe(200)
				let length = 0
				for (let key of myKeys.values()) {
					length++
					hashTable.set(key, computedValue(key))
					expect(Object.keys(hashTable.buckets).length).toBe(length)
					expect(hashTable.length).toBe(length)
				}
			})
			it('should make 200 unique indices for 200 unique keys', () => {
				const indices = new Set()
				for (let hashIndex of Object.keys(hashTable.buckets)) {
					indices.add(hashIndex)
				}
			})
			it('should make 200 unique entries for 200 keys passed', () => {
				for (let key of myKeys) {
					expect(hashTable.get(key)).toBe(computedValue(key))
				}
			})
			it('HashMap.has() should return true for keys in table ', () => {
				for (let key of myKeys) {
					expect(hashTable.has(key)).toBe(true)
				}
			})
			it('HashMap.has() should return false for key not in table ', () => {
				const unUsedKey = 'not in table'
				expect(hashTable.has(unUsedKey)).toBe(false)
			})
			it('should replace the value of a repeated key', () => {
				const lengthBefore = hashTable.length
				const repeatKey = 'same key'
				for (let i = 0; i < 6; i++) {
					hashTable.set(repeatKey, i)
					expect(hashTable.length).toBe(lengthBefore + 1)
					expect(hashTable.get('same key')).toBe(i)
				}
			})
			it('HashTable.get() should return undefined for key not in table', () => {
				expect(hashTable.get('not used key')).toBe(undefined)
			})
			it('should delete an entry from the table', () => {
				const lengthBefore = hashTable.length
				const keyToDelete = myKeys.values().next().value
				expect(hashTable.get(keyToDelete)).toBe(computedValue(keyToDelete))
				expect(hashTable.delete(keyToDelete)).toBe(true)
				expect(hashTable.get(keyToDelete)).toBe(undefined)
				expect(hashTable.length).toBe(lengthBefore - 1)
			})
			it('should return false from delete() if not found in table', () => {
				const lengthBefore = hashTable.length
				const keyNotInMap = 'not in map'
				expect(hashTable.get(keyNotInMap)).toBe(undefined)
				expect(hashTable.delete(keyNotInMap)).toBe(false)
				expect(hashTable.length).toBe(lengthBefore)
			})
			it('should clear the table', () => {
				hashTable.clear()
				for (let key of myKeys) {
					expect(hashTable.get(key)).toBe(undefined)
				}
				expect(hashTable.length).toBe(0)
			})
		})
	}
}

// just to avoid warning, that no tests in test file
describe('Common tests for custom HashTable implementations', () => {
	it('should be used per implementation', () => {})
})
