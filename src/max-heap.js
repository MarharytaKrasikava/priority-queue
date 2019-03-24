const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.size() == 0) {
			;
		} else {
			let detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			if (this.root != null) {
				let newRoot = this.root;
				this.shiftNodeDown(newRoot);
			}
			return detached.data;
		}
	}

	detachRoot() {
		let detachedRoot = this.root;
		this.root = null;
		if (this.parentNodes[this.parentNodes.indexOf(detachedRoot)]) {
			this.parentNodes.splice(this.parentNodes.indexOf(detachedRoot), 1);
		} else;
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		let inclosureCount = 0;
		let leftRun = detached;
		while (leftRun) {
			inclosureCount++;
			if (leftRun.right != null) {
				inclosureCount++;
			} leftRun = leftRun.left;
		}
		if (detached.right) {
			inclosureCount--;
			let rightRun = detached.right;
			while (rightRun) {
				inclosureCount++;
				if (rightRun.left != null) {
					inclosureCount++;
				}
				rightRun = rightRun.right;
			}
		}

		if (this.root == null) {
			let lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
			if (lastInsertedNode != null) {
				let parentOfLastNode = lastInsertedNode.parent;
				this.root = lastInsertedNode;
				this.root.parent = null;
				if (detached.left != this.root) {
					this.root.left = detached.left;
				}
				if (detached.right != this.root) {
					this.root.right = detached.right;
				}
				if (this.root.left != null) {
					this.root.left.parent = this.root;
				}
				if (this.root.right != null) {
					this.root.right.parent = this.root;
				}
				if (parentOfLastNode != null) {
					if (parentOfLastNode.left == lastInsertedNode) {
						parentOfLastNode.left = null;
					} else if (parentOfLastNode.right == lastInsertedNode) {
						parentOfLastNode.right = null;
					} else return;
				} else return;


				if (this.parentNodes[this.parentNodes.indexOf(detached)]) {
					this.parentNodes.shift();
				} else if (!this.parentNodes[this.parentNodes.indexOf(detached)]) {
					if (inclosureCount === 3) {
						let newRootNode = this.parentNodes[1];
						let swappedNode = this.parentNodes[0];
						this.parentNodes[1] = swappedNode;
						this.parentNodes[0] = newRootNode;
					} else if (inclosureCount > 3) {
						if (inclosureCount % 2 == 0) {
							this.parentNodes.pop();
						} else if (inclosureCount % 2 != 0) {
							this.parentNodes.pop();
							this.parentNodes.unshift(parentOfLastNode);
						}
					}
				}
			} else return;
		}
	}

	size() {
		let counter = 0;
		if (this.root != null) {
			var left = this.root;
			while (left) {
				counter++;
				if (left.right != null) {
					counter++;
				} left = left.left;
			} if (this.root.right) {
				counter--;
				var right = this.root.right;
				while (right) {
					counter++;
					if (right.left != null) {
						counter++;
					} right = right.right;
				}
			}
		} return counter;
	}

	isEmpty() {
		return this.size() == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
		}
		else if (this.root != null) {
			this.parentNodes[0].appendChild(node);
		}
		let size = this.size();
		if (size % 2 == 0) {
			this.parentNodes.push(node);
		} else if (size % 2 != 0) {
			this.parentNodes.shift();
			this.parentNodes.push(node);
		}
	}

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {
			if (this.parentNodes[this.parentNodes.indexOf(node)]) {
				let parent = node.parent;
				if (this.parentNodes[this.parentNodes.indexOf(node.parent)]) {
					let nodeIndex = this.parentNodes.indexOf(node);
					this.parentNodes[this.parentNodes.indexOf(node.parent)] = node;
					this.parentNodes[nodeIndex] = parent;
				} else {
					this.parentNodes[this.parentNodes.indexOf(node)] = parent;
				}
			} else;
			node.swapWithParent();
			this.shiftNodeUp(node);
			if (node.parent == null) {
				this.root = node;
			}
		} else;
	}

	shiftNodeDown(node) {
		if (node != null) {
			const rootFromLeft = node.left;
			const rootFromRight = node.right;
			while (node.left || node.right) {
				if (!this.parentNodes[this.parentNodes.indexOf(node)]) {
					if (this.parentNodes[this.parentNodes.indexOf(node.left)] && this.parentNodes[this.parentNodes.indexOf(node.right)]) {
						if (node.left.priority > node.right.priority) {
							this.parentNodes[this.parentNodes.indexOf(node.left)] = node;
						} else {
							this.parentNodes[this.parentNodes.indexOf(node.right)] = node;
						}
					} else if (this.parentNodes[this.parentNodes.indexOf(node.left)] && !this.parentNodes[this.parentNodes.indexOf(node.right)]) {
						this.parentNodes[this.parentNodes.indexOf(node.left)] = node;
					} else if (!this.parentNodes[this.parentNodes.indexOf(node.left)] && this.parentNodes[this.parentNodes.indexOf(node.right)]) {
						this.parentNodes[this.parentNodes.indexOf(node.right)] = node;
					} else if (!this.parentNodes[this.parentNodes.indexOf(node.left)] && !this.parentNodes[this.parentNodes.indexOf(node.right)]) {
						;
					}
				} else if (this.parentNodes[this.parentNodes.indexOf(node)]) {
					let nodeIndex = this.parentNodes.indexOf(node);
					if (this.parentNodes[this.parentNodes.indexOf(node.left)] && this.parentNodes[this.parentNodes.indexOf(node.right)]) {
						if (node.left.priority > node.right.priority) {
							let left = node.left;
							this.parentNodes[this.parentNodes.indexOf(node.left)] = node;
							this.parentNodes[nodeIndex] = left;
						} else {
							let right = node.right;
							this.parentNodes[this.parentNodes.indexOf(node.right)] = node;
							this.parentNodes[nodeIndex] = right;
						}
					} else if (this.parentNodes[this.parentNodes.indexOf(node.left)] && !this.parentNodes[this.parentNodes.indexOf(node.right)]) {
						let left = node.left;
						this.parentNodes[this.parentNodes.indexOf(node.left)] = node;
						this.parentNodes[nodeIndex] = left;
					} else if (!this.parentNodes[this.parentNodes.indexOf(node.left)] && this.parentNodes[this.parentNodes.indexOf(node.right)]) {
						let right = node.right;
						this.parentNodes[this.parentNodes.indexOf(node.right)] = node;
						this.parentNodes[nodeIndex] = right;
					} else if (!this.parentNodes[this.parentNodes.indexOf(node.left)] && !this.parentNodes[this.parentNodes.indexOf(node.right)]) {
						;
					}
				}

				if (node.left != null && node.right != null && node.priority > node.left.priority && node.priority > node.right.priority) {
					;
				}
				else if (node.left != null && node.right != null) {
					if (node.priority < node.left.priority && node.right.priority < node.left.priority) {
						node.left.swapWithParent();
						this.shiftNodeDown(node);
						this.root = rootFromLeft;
					} else if (node.priority < node.right.priority && node.left.priority <= node.right.priority) {
						node.right.swapWithParent();
						this.shiftNodeDown(node);
						this.root = rootFromRight;
					} else return;
				} else if (node.left != null && node.right == null) {
					if (node.priority < node.left.priority) {
						node.left.swapWithParent();
						this.shiftNodeDown(node);
						this.root = rootFromLeft;
					} else return;
				} else if (node.right != null && node.left == null) {
					if (node.priority < node.right.priority) {
						node.right.swapWithParent();
						this.shiftNodeDown(node);
						this.root = rootFromRight;
					} else return;
				} else if (node.right == null && node.left == null) {
					return;
				}
			}
		}
	}
}

module.exports = MaxHeap;
