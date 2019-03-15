const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.heap = new MaxHeap;
		this.maxSize = maxSize;
	}

	push(data, priority) {
		if(this.heap.parentNodes != null && this.heap.parentNodes.length == this.maxSize) throw new Error('Error');
		this.heap.push(data, priority);
	}

	shift() {
		this.heap.pop();
		
	}

	size() {
		return this.heap.parentNodes.length;
	}

	isEmpty() {
		if(this.parentNodes.length) {
			return false;
		}
		return true;
	}
}

module.exports = PriorityQueue;
