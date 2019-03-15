class Node {
	constructor(data, priority) {
		[this.parent, this.left, this.right] = Array(3).fill(null);
		Object.assign(this, { data, priority });
	}

	appendChild(node) {
		if (this.left == null) {
			this.left = node;
			node.parent = this;
			return;
		} else if (this.right == null) {
			this.right = node;
			node.parent = this;
			return;
		}
		return;
	}

	removeChild(node) {
		if (this.left != node && this.right != node) throw new Error("Error: parent doesn't have this child");
		if (this.left == node) this.left = null;
		if (this.right == node) this.right = null;
		node.parent = null;
	}

	remove() {
		if (this.parent == null) return;
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (this.parent == null) return;

		let grandson = this;
		let child = this.parent;
		let root = this.parent.parent;

		child.removeChild(grandson);
		if(root != null) root.removeChild(child);
		
		let sonsGr = [grandson.left, grandson.right];
		let sonsCh = [child.left, child.right];
		[grandson.left, grandson.right] = sonsCh;
		[child.left, child.right] = sonsGr;
		if(grandson.left != null) grandson.left.parent = grandson;
		if(grandson.right != null) grandson.right.parent = grandson;
		if(child.left != null) child.left.parent = child;
		if(child.right != null) child.right.parent = child;

		grandson.appendChild(child);
		if(root != null) root.appendChild(grandson);

	}
}

module.exports = Node;
