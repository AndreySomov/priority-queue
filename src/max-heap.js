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
		if (this.isEmpty()) return;
		let detachedRoot = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detachedRoot);
		this.shiftNodeDown(this.root);
		return detachedRoot.data;
	}

	detachRoot() {
		if (this.root == this.parentNodes[0]) {
			this.parentNodes.shift()
		}
		let buffer = this.root;
		this.root = null;
		return buffer;

	}

	restoreRootFromLastInsertedNode(detached) {
		let lastNode = this.parentNodes.pop();
		if (lastNode == undefined) return;
		if (lastNode.parent != null && lastNode.parent.right == lastNode) {
			if (lastNode.parent == detached) {
				this.parentNodes.unshift(lastNode);
			} else {
				this.parentNodes.unshift(lastNode.parent);
			}
		}

		lastNode.remove();
		this.root = lastNode;

		let tmpLeft = detached.left;
		let tmpRight = detached.right;

		if (tmpLeft != null) {
			detached.removeChild(tmpLeft);
			lastNode.appendChild(tmpLeft);
		}
		if (tmpRight != null) {
			detached.removeChild(tmpRight);
			lastNode.appendChild(tmpRight);
		}
	}


	size() {

		function count(node) {
			if (node == null) {
				return 0;
			}
			return 1 + count(node.left) + count(node.right);
		}
		return count(this.root);
	}

	isEmpty() {
		if (this.size()) {
			return false;
		}
		return true;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
			this.parentNodes.push(node);
			return;
		}

		this.parentNodes[0].appendChild(node);
		this.parentNodes.push(node);

		if (this.parentNodes[0].left != null && this.parentNodes[0].right != null) {
			this.parentNodes.shift();
		}
		
	}

	shiftNodeUp(node) {
		if (node.parent == null) {
			this.root = node;
			return;
		}
		if (node.priority > node.parent.priority) {
			let [indexOfNode, indexOfParent] = [this.parentNodes.indexOf(node), 
				                                this.parentNodes.indexOf(node.parent)];
			if (~indexOfNode) this.parentNodes[indexOfNode] = node.parent;
			if (~indexOfParent) this.parentNodes[indexOfParent] = node;

			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (node == null) return;
		let eldestSon;
		if(node.left === null && node.right === null){
			return;
		} else if(node.right === null && node.left !== null){
			eldestSon = node.left;
		} else if(node.left === null && node.right !== null){
			eldestSon = node.right;
		} else if(node.right.priority > node.left.priority){
			eldestSon = node.right;
		} else if(node.left.priority >= node.right.priority ){
			eldestSon = node.left
		}

		if (node.priority < eldestSon.priority){
			let [indexOfNode, indexOfParent] = [this.parentNodes.indexOf(node), 
												this.parentNodes.indexOf(eldestSon)];
			if (~indexOfNode) this.parentNodes[indexOfNode] = eldestSon;
			if (~indexOfParent) this.parentNodes[indexOfParent] = node;
			eldestSon.swapWithParent();
			if (this.root == node) this.root = eldestSon;
			this.shiftNodeDown(node);
		}
	}
	
}


module.exports = MaxHeap;
