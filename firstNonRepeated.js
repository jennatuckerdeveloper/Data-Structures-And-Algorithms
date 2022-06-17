const firstNonRepeated = (str) => {
	const occurrences = {}
	for (let char of str) {
		const count = occurrences.hasOwnProperty(char) ? occurrences[char] : 0
		occurrences[char] = count + 1
	}
	for (let char of str) {
		if (occurrences[char] == 1) return char
	}
	return null
}

console.log(firstNonRepeated('a green apple'))

