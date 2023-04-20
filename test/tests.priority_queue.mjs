
import PriorityQueue from '../src/PriorityQueue.mjs';
import assert from 'assert';
import { expect } from 'chai';


describe('PriorityQueue', function () {
  describe('pop() & push()', function () {
    it('POP and PUSH', function () {
      const queue = new PriorityQueue();
      queue.push(1);
      queue.push(3);
      queue.push(2);

      assert.equal(queue.pop(), 1);
      assert.equal(queue.pop(), 3);
      assert.equal(queue.pop(), 2);
      assert.equal(queue.pop(), null);
    });
  });
  describe('remove()', () => {
    it('should remove the specified value from the queue', () => {
      const queue = new PriorityQueue();
      queue.push(1);
      queue.push(2);
      queue.push(3);
      queue.remove(2);
      assert.equal(queue.size(), 2);
      assert.equal(queue.pop(), 1);
      assert.equal(queue.pop(), 3);
    });
    it('should do nothing if the value is not in the queue', () => {
      const queue = new PriorityQueue();
      queue.push(1);
      queue.push(2);
      queue.push(3);
      queue.remove(4);
      assert.equal(queue.size(), 3);
      assert.equal(queue.pop(), 1);
      assert.equal(queue.pop(), 2);
      assert.equal(queue.pop(), 3);
    });
  });

  describe('size()', () => {
    it('should return 0 for an empty queue', () => {
      const queue = new PriorityQueue();
      expect(queue.size()).to.equal(0);
    });

    it('should return the correct size for a non-empty queue', () => {
      const queue = new PriorityQueue();
      queue.push(1);
      queue.push(2);
      queue.push(3);
      expect(queue.size()).to.equal(3);
    });
  });

  describe('forEach()', () => {
    it('should call the given function on each node', () => {
      const queue = new PriorityQueue();
      queue.push(1);
      queue.push(2);
      queue.push(3);
      const values = [];
      queue.forEach(node => values.push(node));
      expect(values).to.deep.equal([1, 2, 3]);
    });
  });

  describe('changePosition()', () => {
    it('should move the node to the new position', () => {
      const queue = new PriorityQueue();
      queue.push(1);
      queue.push(2);
      queue.push(3);
      console.log(queue);
      queue.changePosition(0, 2);
      const values = [];
      queue.forEach(node => values.push(node));
      expect(values).to.deep.equal([2, 3, 1]);
    });
    it('should move the node forward to the new position', () => {
      const queue = new PriorityQueue();
      queue.push(1);
      queue.push(2);
      queue.push(3);
      queue.changePosition(2, 0);
      const values = [];
      queue.forEach(node => values.push(node));
      expect(values).to.deep.equal([3, 1, 2]);
    });

    it('should do nothing if oldPos and newPos are the same', () => {
      const queue = new PriorityQueue();
      queue.push(1);
      queue.push(2);
      queue.push(3);
      queue.changePosition(1, 1);
      const values = [];
      queue.forEach(node => values.push(node));
      expect(values).to.deep.equal([1, 2, 3]);
    });

    it('should move the node at oldPos to the beginning of the queue if newPos is 0', () => {
      const queue = new PriorityQueue();
      queue.push(1);
      queue.push(2);
      queue.push(3);
      const originalQueue = JSON.stringify(queue);
      queue.changePosition(1, 0);
      assert.notStrictEqual(JSON.stringify(queue), originalQueue);
      assert.strictEqual(queue.pop(), 2);
      assert.strictEqual(queue.pop(), 1);
      assert.strictEqual(queue.pop(), 3);
    });
    it('should move the node at oldPos to the end of the queue if newPos >= the size of the queue', () => {
      const queue = new PriorityQueue();
      queue.push(1);
      queue.push(2);
      queue.push(3);
      const originalQueue = JSON.stringify(queue);
      queue.changePosition(1, 3);
      assert.notStrictEqual(JSON.stringify(queue), originalQueue);
      assert.strictEqual(queue.pop(), 1);
      assert.strictEqual(queue.pop(), 3);
      assert.strictEqual(queue.pop(), 2);
    });
  });


});
