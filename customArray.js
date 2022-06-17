/* 
  Implement a custom array like the one Mosh makes in Java
  He builds on top of static, dense built-in arrays.
  This is built on top of object.  
  He mainly makes Java's static arrays dynamic:
    - doubling in size 
    - always with empty spaces 
  JS arrays are already dynamic. So how to parallel his example?  
  For insert, first fill the empty holes. Enforce density. Increase length by only 1. 
  For removeAt, re-index everything and decrement the length by 1. 
  For print, represent the empty holes. 
  So there isn't any attempt to "hold" memory or mimic any assumed underlying Java behavior. 
*/

/*
  Exercises:  
  CustomArray.insertAt() => O(1) constant time 
    - Not a replace().  Simply adds new, the prior value to end of array go up in index. 
    - This should dynamically resize the array if it needs to be larger. 
    - This should not allow the user to create a sparse array.

  CustomArray.max() => O(n) linear time 
  CustomArray.reverse() => O(n) linear time 
  CustomArray.intersect() => 
*/

class CustomArray {
	constructor(length) {
		this.length = length
		this.count = 0
		this.contents = {}
	}
	insert = (e) => {
		// assumes that insert should fill the first empty index or create a new one
		// const space = this.count < this.length
		// const nextInd = space ? this.count : this.length
		// this.contents[nextInd] = e
		// this.count++
		// if (!space) this.length++
		this.contents[this.length] = e
	}
	insertAt = (e, i) => {
		this.contents[i] = e
		if (i > this.length - 1) this.length = i + 1
	}
	removeAt = (i) => {
		for (let ind = i; ind < this.count - 1; ind++) {
			this.contents[ind] = this.contents[ind + 1]
		}
		delete this.contents[this.count - 1]
		this.length--
		this.count--
	}
	indexOf = (e) => {
		for (let i = 0; i < this.count; i++) {
			if (this.contents[i] === e) return i
		}
		return -1
	}
	max = () => {
		for (let i = 0; i < this.count; i++) {}
	}
	print = () => {
		let holes = 0
		for (let i = 0; i < this.length; i++) {
			if (this.contents.hasOwnProperty(i)) {
				if (holes) console.log(`<${holes} empty items>`)
				holes = 0
				console.log(this.contents[i])
			} else {
				holes++
			}
		}
		if (holes) console.log(`<${holes} empty items>`)
	}
}

const customArr = new CustomArray(3)
// console.log(customArr)
// console.log(customArr.length)
customArr.insert(10)
customArr.insert(20)
customArr.insert(30)
customArr.insert(40)
customArr.print()
customArr.insertAt(1000, 6)
console.log(customArr.contents)
customArr.print()
console.log('length now', customArr.length)
customArr.insertAt(2000, 12)
customArr.print()
console.log('length now', customArr.length)
