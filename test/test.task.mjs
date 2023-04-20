import { JSDOM } from 'jsdom';
import { Task, TaskController } from '../src/Task.mjs';
import { expect } from 'chai';
import { assert } from 'chai';


describe('Task.mjs', () => {

  describe('Task', () => {
    let task;

    beforeEach(() => {
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
      global.window = dom.window;
      global.document = dom.window.document;
      global.HTMLElement = window.HTMLElement;

      task = new Task('Test task', false, 1);
    });

    afterEach(() => {
      delete global.window;
      delete global.document;
    });

    describe("constructor()", () => {
      it('should create a new Task object with the correct properties', () => {
        // Instantiate a new Task object
        const task = new Task('Sample task', false, 1);

        // Assert that the properties match the values passed in
        assert.equal(task.text, 'Sample task');
        assert.equal(task.completed, false);
        assert.equal(task.order, 1);
        expect(task._taskController).to.be.an.instanceOf(TaskController);
        expect(typeof task.id).to.equal('string');
      });
    })

    describe("getters", () => {
      it('should have the correct text', () => {
        expect(task.text).to.equal('Test task');
      });
      it('should have the correct completed status', () => {
        expect(task.completed).to.equal(false);
      });
      it('should have the correct order', () => {
        expect(task.order).to.equal(1);
      });
      it('should have a unique id', () => {
        const task2 = new Task('Another task', false, 2);
        expect(task.id).to.not.equal(task2.id);
      });
      it('should have an html element', () => {
        expect(task.html).to.be.an.instanceOf(HTMLElement);
      });
    });
    describe("setters", () => {
      it('should be able to change the text', () => {
        task.text = 'New text';
        expect(task.text).to.equal('New text');
      });

      it('should be able to change the completed status', () => {
        task.completed = true;
        expect(task.completed).to.equal(true);
      });

      it('should be able to change the order', () => {
        task.order = 2;
        expect(task.order).to.equal(2);
      });
    });
  });

  describe('TaskController', () => {
    let taskController;
    let task;

    beforeEach(() => {
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
      global.window = dom.window;
      global.document = dom.window.document;
      global.HTMLElement = window.HTMLElement;

      task = new Task('test task', false, 1);
      taskController = task._taskController;
    });

    afterEach(() => {
      delete global.window;
      delete global.document;
    });

    describe('constructor()', () => {
      it('should create a task element with the correct id', () => {
        assert.equal(taskController.taskElement.id, task.id);
      });

      it('should create a task element with the correct label text', () => {
        assert.equal(taskController.taskElement.querySelector('label').textContent, task.text);
      });

      it('should create a task element with the correct checkbox state', () => {
        assert.equal(taskController.taskElement.querySelector('input[type="checkbox"]').checked, task.completed);
      });
    });

    describe('get taskElement()', () => {
      it('should return the task element', () => {
        assert.equal(taskController.taskElement.tagName, 'LI');
      });
    });

    describe('changeText(text)', () => {
      it('should update the task element label text', () => {
        const newText = 'updated task text';
        taskController.changeText(newText);
        assert.equal(taskController.taskElement.querySelector('label').textContent, newText);
      });
    });

    describe('changeCompleted(completed)', () => {
      it('should update the task element checkbox state', () => {
        const newCompleted = true;
        taskController.changeCompleted(newCompleted);
        assert.equal(taskController.taskElement.querySelector('input[type="checkbox"]').checked, newCompleted);
      });
    });
  });
});