class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;

	}

	appendChild(node) {
		if (this.left == null) {
			this.left = node;
			node.parent = this;
		} else if (this.left !== null && this.right == null) {
			this.right = node;
			node.parent = this;
		} else if (this.left !== null && this.right !== null) {
			return;
		}
	}

	removeChild(node) {
		if (this.left.priority == node.priority && this.left.data == node.data) {
			this.left = null;
			node.parent = null;
		} else if (this.right.priority == node.priority && this.right.data == node.data) {
			this.right = null;
			node.parent = null;
		} else if (this.left.priority !== node.priority || this.right.priority !== node.priority || this.left.data !== node.data || this.right.data !== node.data) {
			throw new Error("Passed node is not a child of this node");
		}
	}

	remove() {
		if (this.parent == null) {
			return;
		}
		else this.parent.removeChild(this);
	}

	swapWithParent() {
		if (this.parent == null) {
			return;
		} else if (this.parent.parent == null) {
			let root = this.parent;
			let left = root.left;
			let right = root.right;
			root.parent = this;
			this.parent = null;
			if (root.left == this && root.right == null) {
				root.parent = this;
				this.parent = null;
				root.left = null;
				this.left = root;
			} else if (root.left == this && root.right != null) {
				let thisRightFirst = this.right;
				let thisLeftFirst = this.left;
				this.right = right;
				this.right.parent = this;
				this.left = root;
				root.right = thisRightFirst;
				root.left = thisLeftFirst;
				if (thisRightFirst != null && thisRightFirst.parent != null) {
					thisRightFirst.parent = root;
				}
				if (thisLeftFirst != null && thisLeftFirst.parent != null) {
					thisLeftFirst.parent = root;
				}
			} else if (root.right == this) {
				let thisLeftFirst = this.left;
				let thisRightFirst = this.right;
				this.left = left;
				this.left.parent = this;
				this.right = root;
				root.right = thisRightFirst;
				root.left = thisLeftFirst;
				if (thisRightFirst != null && thisRightFirst.parent != null) {
					thisRightFirst.parent = root;
				}
				if (thisLeftFirst != null && thisLeftFirst.parent != null) {
					thisLeftFirst.parent = root;
				}
			}
		} else if (this.parent.parent !== null) {
			let grandpa = this.parent.parent;
			let leftChild = this.parent.parent.left;
			let rightChild = this.parent.parent.right;
			if (leftChild.left == this) {
				let right = leftChild.right;
				let thisRightFirst = this.right;
				let thisLeftFirst = this.left;
				leftChild.parent = this;
				this.parent = grandpa;
				grandpa.left = this;
				this.left = leftChild;
				this.right = right;
				if (this.right != null && this.right.parent != null) {
					this.right.parent = this;
				}
				leftChild.right = thisRightFirst;
				leftChild.left = thisLeftFirst;
				if (thisLeftFirst != null) {
					thisLeftFirst.parent = leftChild;
				} else if (thisRightFirst != null) {
					thisRightFirst.parent = leftChild;
				}
			} else if (leftChild.right == this) {
				let left = leftChild.left;
				let thisRightFirst = this.right;
				let thisLeftFirst = this.left;
				leftChild.parent = this;
				this.parent = grandpa;
				grandpa.left = this;
				this.right = leftChild;
				this.left = left;
				if (this.left != null && this.left.parent != null) {
					this.left.parent = this;
				}
				leftChild.right = thisRightFirst;
				leftChild.left = thisLeftFirst;
				if (thisLeftFirst != null) {
					thisLeftFirst.parent = leftChild;
				} else if (thisRightFirst != null) {
					thisRightFirst.parent = leftChild;
				}
			} else if (rightChild.left == this) {
				let right = rightChild.right;
				let thisRightFirst = this.right;
				let thisLeftFirst = this.left;
				rightChild.parent = this;
				this.parent = grandpa;
				grandpa.right = this;
				this.left = rightChild;
				this.right = right;
				if (this.right != null && this.right.parent != null) {
					this.right.parent = this;
				}
				rightChild.right = thisRightFirst;
				rightChild.left = thisLeftFirst;
				if (thisLeftFirst != null) {
					thisLeftFirst.parent = rightChild;
				} else if (thisRightFirst != null) {
					thisRightFirst.parent = rightChild;
				}
			} else if (rightChild.right == this) {
				let left = rightChild.left;
				let thisRightFirst = this.right;
				let thisLeftFirst = this.left;
				rightChild.parent = this;
				this.parent = grandpa;
				grandpa.right = this;
				this.right = rightChild;
				this.left = left;
				if (this.left != null && this.left.parent != null) {
					this.left.parent = this;
				}
				rightChild.right = thisRightFirst;
				rightChild.left = thisLeftFirst;
				if (thisLeftFirst != null) {
					thisLeftFirst.parent = rightChild;
				} else if (thisRightFirst != null) {
					thisRightFirst.parent = rightChild;
				}
			}
		}
	}
}

module.exports = Node;
