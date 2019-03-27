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
    if (this.left !== null && this.left.priority == node.priority && this.left.data == node.data) {
      this.left = null;
      node.parent = null;
    } else if (this.right !== null && this.right.priority == node.priority && this.right.data == node.data) {
      this.right = null;
      node.parent = null;
    } else
      throw new Error("Passed node is not a child of this node");
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
    } else {
      let granny = this.parent.parent;
      let parent = this.parent;
      let left = this.parent.left;
      let right = this.parent.right;
      let leftChild = this.left;
      let rightChild = this.right;
      if (this.parent.left == this) {
        this.parent.removeChild(parent.left);
        if (leftChild !== null) { this.removeChild(leftChild); }
        if (rightChild !== null) { this.removeChild(rightChild); }
        if (parent.right !== null) { parent.removeChild(right); }
        this.appendChild(parent);
        if (right !== null) { this.appendChild(right); }
        if (leftChild !== null) { this.left.appendChild(leftChild); }
        if (rightChild !== null) { this.left.appendChild(rightChild); }
      } else if (this.parent.right == this) {
        this.parent.removeChild(parent.right);
        if (leftChild !== null) { this.removeChild(leftChild); }
        if (rightChild !== null) { this.removeChild(rightChild); }
        if (parent.left !== null) { parent.removeChild(left); }
        if (left !== null) { this.appendChild(left); }
        this.appendChild(parent);
        if (leftChild !== null) { this.right.appendChild(leftChild); }
        if (rightChild !== null) { this.right.appendChild(rightChild); }
      }
      if (granny !== null) {
        this.parent = granny;
        granny.removeChild(parent);
        granny.appendChild(this);
        if (this.left) { this.left.parent = this; }
        if (this.right) { this.right.parent = this; }
      }
    }
  }
}

module.exports = Node;
