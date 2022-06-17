const firstRepeating = (str) => {
	const set = new Set()
	for (let char of str) {
		if (set.has(char)) return char
		set.add(char)
	}
	return null
}

console.log(firstRepeating('green apple'))
