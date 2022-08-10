export default class BinaryNode {
    value;
    parent;
    left;
    right;

    constructor() {
        this.value = null;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    foreach(func) {
        if(this.left !== null) {
            this.left.orderedVisitR(func);
        }
        func(this);
        if(this.right !== null) {
            this.right.orderedVisitR(func);
        }
    }

    isLeaf() {
        return this.left === null && this.right === null;
    }

    isRoot() {
        return this.parent === null;
    }

    addChild(node) {
        if(this.left === null) {
            this.setLeft(node);
        }
        else if(this.right === null) {
            this.setRight(node);
        }
        else {
            throw "binary node is full";
        }
    }

    removeChild(node) {
        if(this.left === node) {
            this.setLeft(null);
        }
        else if(this.right === node) {
            this.setRight(null);
        }
        else {
            throw "node not found";
        }
    }

    setLeft(node) {
        if(this.isSameClass(this.left)) {
            this.left.parent = null;
        }
        if(this.isSameClass(node)) {
            node.parent = this;
            this.left = node;
        }
        return this;
    }

    setRight(node) {
        if(this.isSameClass(this.right)) {
            this.right.parent = null;
        }
        if(this.isSameClass(node)) {
            node.parent = this;
            this.right = node;
        }
        return this;
    }

    isSameClass(that) {
        if(typeof that !== 'object') return false;
        if(that === null) return false;
        return that.constructor.name === this.constructor.name;
    }
}