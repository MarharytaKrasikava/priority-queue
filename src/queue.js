const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();

	}

	push(data, priority) {
		if (this.size() < this.maxSize) {
			this.heap.push(data, priority);
		} else throw new Error("Queue has max size");
	}

	shift() {
		if (!this.isEmpty()) {
			return this.heap.pop();			
		} else throw new Error("Queue is empty");

	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.size() == 0;
	}
}

module.exports = PriorityQueue;
