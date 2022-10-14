const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor () {
    this.tree = null;
  }
  root() {
    return this.tree;
  }

  add(data) {
    const addNode = (data, node) => {
      if(node === null) {
        return new Node(data);
      } 
      if (data < node.data) {
          node.left = addNode(data, node.left);
      } 

      if (data > node.data) {
          node.right = addNode(data, node.right)
      }
      return node
    };

    this.tree = addNode(data, this.tree);
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    const findData = (data, node) => {
      if(node.data === data) {
        return node;
      }
      if(node.data < data) {
         return node.right === null ? null : findData(data, node.right);
      }
      if(node.data > data) {
         return node.left === null ? null : findData(data, node.left);
      }
    }
    return findData(data, this.tree);
  }

  remove(data) {
    const getMinNode = (node) => {
      if(node.left === null) return node;
      return getMinNode(node.left);
    };
    
    const removeNode = (data, node) => {
     if(node.data === null) return null
     if(node.data === data) {
       if(node.left === null && node.right === null) {
         return null
       } else if(node.right === null) {
         return node.left;
       } else if(node.left === null) {
         return node.right
       }else {
         const minNode = getMinNode(node.right);
           node.data = minNode.data;
           node.right = removeNode(minNode.data, node.right)
         return node
       }
     } else if(node.data < data) {
         node.right  = removeNode(data, node.right);
         return node;
     } else if(node.data > data) {
        node.left = removeNode(data, node.left);
       return node
     }
      console.log(data)
    };
    
    this.tree = removeNode(data, this.tree);
  }

  min() {
    if(!this.tree) return null;
    let node = this.tree;
    while(node.left) {
      node = node.left
    }
    return node.data;
  }

  max() {
    if(!this.tree) return null;
    let node = this.tree;
    while(node.right) {
      node = node.right
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};