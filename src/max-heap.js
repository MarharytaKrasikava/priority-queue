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
        }
        return detachedRoot;
    }

    restoreRootFromLastInsertedNode(detached) {
        if (this.parentNodes.length !== 0) {
            let lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
            this.root = lastInsertedNode;
            if (detached.left) { this.root.appendChild(detached.left); }
            if (detached.right) { this.root.appendChild(detached.right); }
            let deep = this.root;
            while (deep) {
                if (deep.left == lastInsertedNode || deep.right == lastInsertedNode) {
                    let parentOfLastNode = lastInsertedNode.parent;
                    lastInsertedNode.parent.removeChild(lastInsertedNode);
                    this.parentNodes.pop();
                    this.parentNodes.unshift(parentOfLastNode);
                    break;
                } deep = deep.left;
            } if (this.root.right) {
                let deep = this.root.right;
                while (deep) {
                    if (deep.left == lastInsertedNode || deep.right == lastInsertedNode) {
                        let parentOfLastNode = lastInsertedNode.parent;
                        lastInsertedNode.parent.removeChild(lastInsertedNode);
                        this.parentNodes.pop();
                        this.parentNodes.unshift(parentOfLastNode);
                        break;
                    } deep = deep.right;
                }
                this.root.parent = null;
            }
        }
    }

    size() {
        let c = 0;
        if (this.root != null) {
            var tmp1 = this.root;
            while (tmp1) {
                c++;
                if (tmp1.right != null) {
                    c++;
                }
                tmp1 = tmp1.left;
            }
            if (this.root.right) {
                c--;
                var tmp2 = this.root.right;
                while (tmp2) {
                    c++;
                    if (tmp2.left != null) {
                        c++;
                    }
                    tmp2 = tmp2.right;
                }
            }
        }
        return c;
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
            } else { ; }
            node.swapWithParent();
            this.shiftNodeUp(node);
        } if (node.parent == null) { this.root = node; }
    }

    shiftNodeDown(node) {
        if (node.left || node.right) {
            let indexOfNode = this.parentNodes.indexOf(node);
            if (node.left && node.right) {
                if (node.priority < node.left.priority && node.left.priority > node.right.priority) {
                    node.left.swapWithParent();
                    if (indexOfNode < 0 && this.parentNodes.indexOf(node.parent) >= 0) {
                        this.parentNodes[this.parentNodes.indexOf(node.parent)] = node;
                    } else if (indexOfNode >= 0 && this.parentNodes.indexOf(node.parent) >= 0) {
                        this.parentNodes[this.parentNodes.indexOf(node.parent)] = node;
                        this.parentNodes[indexOfNode] = node.parent;
                    } if (this.root == node) { this.root = node.parent; }
                } else if (node.priority < node.right.priority && node.left.priority < node.right.priority) {
                    node.right.swapWithParent();
                    if (indexOfNode < 0 && this.parentNodes.indexOf(node.parent) >= 0) {
                        this.parentNodes[this.parentNodes.indexOf(node.parent)] = node;
                    } else if (indexOfNode >= 0 && this.parentNodes.indexOf(node.parent) >= 0) {
                        this.parentNodes[this.parentNodes.indexOf(node.parent)] = node;
                        this.parentNodes[indexOfNode] = node.parent;
                    } if (this.root == node) { this.root = node.parent; }
                } else return false;
            } else if (node.left && node.priority < node.left.priority) {
                node.left.swapWithParent();
                if (indexOfNode < 0 && this.parentNodes.indexOf(node.parent) >= 0) {
                    this.parentNodes[this.parentNodes.indexOf(node.parent)] = node;
                } else if (indexOfNode >= 0 && this.parentNodes.indexOf(node.parent) >= 0) {
                    this.parentNodes[this.parentNodes.indexOf(node.parent)] = node;
                    this.parentNodes[indexOfNode] = node.parent;
                } if (this.root == node) { this.root = node.parent; }

            } else if (node.right && node.priority < node.right.priority) {
                node.right.swapWithParent();
                if (indexOfNode < 0 && this.parentNodes.indexOf(node.parent) >= 0) {
                    this.parentNodes[this.parentNodes.indexOf(node.parent)] = node;
                } else if (indexOfNode >= 0 && this.parentNodes.indexOf(node.parent) >= 0) {
                    this.parentNodes[this.parentNodes.indexOf(node.parent)] = node;
                    this.parentNodes[indexOfNode] = node.parent;
                } if (this.root == node) { this.root = node.parent; }

            } else { return false; }
            this.shiftNodeDown(node);
        } else { return false; }
    }    
}

module.exports = MaxHeap;
