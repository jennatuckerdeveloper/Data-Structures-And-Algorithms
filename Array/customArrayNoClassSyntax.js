// implement a custom array like the one Mosh makes

const CustomArray = function (length) {
	this.length = length
	this.contents = {}
	for (let i = 0; i < this.length; i++) {
		this.contents[i] = undefined
	}

	this.insert = (e) => {
		// assumes that insert should fill the first empty index or create a new one
		for (let i in this.contents) {
			if (this.contents[i] === undefined) {
				this.contents[i] = e
				return
			}
		}
		this.contents[this.length] = e
		this.length++
	}
	this.removeAt = (i) => {
		for (let ind = i; ind < this.length - 1; ind++) {
			this.contents[ind] = this.contents[ind + 1]
		}
		delete this.contents[this.length - 1]
		this.length--
	}
	this.indexOf = (e) => {
		for (let i = 0; i < this.length; i++) {
			if (this.contents[i] === e) return i
		}
		return -1
	}
	this.print = () => {
		console.log(this.contents)
	}
}

const customArr = new CustomArray(3)
console.log(customArr)
// console.log(this)
// console.log(globalThis)
customArr.insert(10)
customArr.insert(20)
customArr.insert(30)
customArr.insert(40)
const otherPrint = customArr.print
otherPrint() // Knows the context still thanks to arrow method 
customArr.print()
console.log(customArr.length)

console.log(customArr.indexOf(10))
console.log(customArr.indexOf(100))

customArr.removeAt(0)
customArr.print()
console.log(customArr.length)
