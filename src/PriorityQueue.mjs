/* 
Priority queue (FIFO) implement using linked list.
*/
class PriorityQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }
  pop() {
    if (this.head === null) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    this._size--;
    return value;
  }

  push(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this._size++;
  }

  size() {
    return this._size;
  }

  forEach(func) {
    if (this.head === null) {
      return;
    }
    let node = this.head;
    while (node !== null) {
      func(node.value);
      node = node.next;
    }
  }

  /** Change the position of an item to new position.
   * The item at oldPos will be moved to newPos.
   * And all items between oldPos and newPos will be moved one position
   * If oldPos and newPos are the same, do nothing.
   */

  changePosition(oldPos, newPos) {
    // Initialize variables to keep track of the current and previous nodes
    let currentNode = this.head;
    let previousNode = null;

    // Loop through the linked list until we reach the old position
    for (let i = 0; i < oldPos; i++) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    // If oldPos and newPos are the same, do nothing
    if (oldPos === newPos) {
      return;
    }

    // Remove the node at oldPos from the linked list
    if (previousNode === null) {
      this.head = currentNode.next;
    } else {
      previousNode.next = currentNode.next;
    }

    // Insert the node at oldPos into the new position
    if (newPos === 0) {
      currentNode.next = this.head;
      this.head = currentNode;
    } else if (newPos >= this.size()) {
      this.tail.next = currentNode;
      this.tail = currentNode;
    } else {
      let newNode = this.head;
      for (let i = 0; i < newPos - 1; i++) {
        newNode = newNode.next;
      }
      currentNode.next = newNode.next;
      newNode.next = currentNode;
    }

    // If the node was at the end of the linked list, update the tail
    if (currentNode.next === null) {
      this.tail = currentNode;
    } else if (newPos <= oldPos) {
      this.tail = this.tail.next;
    } else {
      currentNode.next = null;
    }
  }
  // Change the position of the value to tail.
  // And remove it, update parameters.
  remove(value) {
    //Find the node with the value
    let currentNode = this.head;
    let previousNode = null;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        break;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    // If the node is not found, do nothing
    if (currentNode === null) {
      return;
    }

    // Remove the node from the linked list
    if (previousNode === null) {
      this.head = currentNode.next;
    }
    else {
      previousNode.next = currentNode.next;
    }

    // If the node was at the end of the linked list, update the tail
    if (currentNode.next === null) {
      this.tail = previousNode;
    }
    this._size--;
  }

}


class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}



export default PriorityQueue;