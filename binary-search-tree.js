class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newNode = new Node(val);
    //if the binary tree is empty then new node is the root
    if (!this.root){
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    
    while(current){
      if (current.val >= newNode.val){
        if(current.left){
          current = current.left
        }else{
          current.left = newNode;
          break;
        }
      }else{
        if(current.right){
          current = current.right
        }else{
          current.right = newNode;
          break;
        }
      }
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    //if the binary tree is empty then new node is the root
    if (!this.root){
      this.root = new Node(val);
      return this;
    }
    //start recursion
    if(current.val >= val){
      if(current.left){
        this.insertRecursively(val, current.left);
      }else{
        current.left = new Node(val);
      } 
    }else{
      if(current.right){
        this.insertRecursively(val, current.right);
      }else{
        current.right = new Node(val);
      }
    }
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    while (current) {
      if (current.val === val){
        return current;
      }
      current = (val < current.val) ? current.left : current.right;
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current=this.root) {
    if (!current){
      return undefined;
    }
    if (current.val === val){
      return current;
    }
    if(val > current.val){
      return this.findRecursively(val, current.right);
    }else{
      return this.findRecursively(val, current.left);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(current = this.root, nodelist = []) {
    nodelist.push(current.val);
    if (current.left) this.dfsPreOrder(current.left, nodelist) ;
    if (current.right) this.dfsPreOrder(current.right, nodelist);
    return nodelist;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(current = this.root, nodelist = []) {
    if (current.left) this.dfsInOrder(current.left, nodelist);
    nodelist.push(current.val);
    if (current.right) this.dfsInOrder(current.right, nodelist);
    return nodelist;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(current = this.root, nodelist = []) {
    if (current.left) this.dfsPostOrder(current.left, nodelist);
    if (current.right) this.dfsPostOrder(current.right, nodelist);
    nodelist.push(current.val);
    return nodelist;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes.
   * we are going to assuem that all values are unique in the bst */

  bfs() {
    let queue = [this.root];
    let nodelist = [];
    while (queue.length){
      let current = queue.shift();
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      nodelist.push(current.val);
    }
    return nodelist;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeToRemove = this.root;
    let parent;

    while (nodeToRemove.val !== val) {
      parent = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }

    if (nodeToRemove !== this.root) {
      if (nodeToRemove.left === null && nodeToRemove.right === null) {
        if (parent.left === nodeToRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
        let rightParent = nodeToRemove;
        let right = nodeToRemove.right;
        if (right.left === null) {
          right.left = nodeToRemove.left;
          if (parent.left === nodeToRemove) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === nodeToRemove) {
            parent.left.val = right.val;
          } else {
            parent.right.val = right.val;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if (parent.left === nodeToRemove) {
          if (nodeToRemove.right === null) {
            parent.left = nodeToRemove.left;
          } else {
            parent.left = nodeToRemove.right;
          }
        } else {
          if (nodeToRemove.right === null) {
            parent.right = nodeToRemove.left;
          } else {
            parent.right = nodeToRemove.right;
          }
        }
      }
    }
    return nodeToRemove;
  }

  // deleteNode(parentNode, targetNode, parentDir){
  //   if (parentDir === 'l'){
  //     if(targetNode.right){
  //       parentNode.left = targetNode.right;
  //       targetNode.right.left = targetNode.left;
  //     }else{

  //     }
  //   }
  // }
  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(current=this.root) {
    if (current === null) return;
    return maxDepth(current) - minDepth(current) <= 1;

    function minDepth(current) {
      if (current === null) return 0;
      return 1 + Math.min(minDepth(current.left), minDepth(current.right));
    }

    function maxDepth(current) {
      if (current === null) return 0;
      return 1 + Math.max(maxDepth(current.left), maxDepth(current.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (this.root){
      if(!this.root.right && !this.root.left) return undefined;
      let current = this.root;
      let secondhighest;
      while(current.right){
        secondhighest = current.val;
        current = current.right;
      }
      return secondhighest;
    }else{
      return undefined;
    }
  }
}

let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50);
    binarySearchTree.remove(50);

module.exports = BinarySearchTree;
