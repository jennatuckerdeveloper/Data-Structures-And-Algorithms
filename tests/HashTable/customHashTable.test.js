const { HashTable } = require('../../HashTable/customHashTable.js')
const { HashTableCommon } = require('./customHashTableCommon.test')

describe('custom JS HashTable', () => {
	const myMap = new HashTable()
	const myMapDoubleHashing = new HashTable(true)

	// Make 200 unique keys
	const myKeys = new Set()
	for (let i = 0; myKeys.size < 200; i++) {
		myKeys.add(Math.random() * 100)
	}
	
	// First two tests are only unique behavior between modes.

	it('should use quadratic probing by default', () => {
		expect(myMap.doubleHashingMode).toBe(false)
		expect(myMap.hashModeSet().name).toBe('hashQuadraticProbe')
	})
	it('should use double hashing when passed param to set mode', () => {
		expect(myMapDoubleHashing.doubleHashingMode).toBe(true)
		expect(myMapDoubleHashing.hashModeSet().name).toBe('doubleHash')
	})

	HashTableCommon(myMap)
	HashTableCommon(myMapDoubleHashing)
})
