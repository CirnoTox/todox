import { JSDOM } from 'jsdom';
import { Task, TaskController } from '../src/Task.mjs';
import { expect } from 'chai';
import { TaskManager, TaskPriorityQueue } from '../src/TaskManager.mjs';
import { assert } from 'chai';
import sinon from 'sinon';

describe('TaskManager', () => {
    describe('TaskPriorityQueue', () => {
        let taskPriorityQueue;

        beforeEach(() => {
            const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
            global.window = dom.window;
            global.document = dom.window.document;
            global.HTMLElement = window.HTMLElement;
            // Create a mock for chrome.storage.local
            global.chrome={
                storage: {
                    local: {
                        get: sinon.stub().resolves({}),
                        set: sinon.stub().resolves(),
                    },
                },
            };

        });

        afterEach(() => {
            delete global.window;
            delete global.document;
        });
        beforeEach(() => {
            taskPriorityQueue = new TaskPriorityQueue();
        });

        it('should add tasks to the queue', () => {
            const task1 = new Task('Task 1');
            const task2 = new Task('Task 2');
            taskPriorityQueue.push(task1);
            taskPriorityQueue.push(task2);
            assert.equal(taskPriorityQueue.size(), 2);
        });

        it('should remove tasks from the queue', () => {
            const task1 = new Task('Task 1');
            const task2 = new Task('Task 2');
            taskPriorityQueue.push(task1);
            taskPriorityQueue.push(task2);
            const removedTask = taskPriorityQueue.pop();
            assert.equal(removedTask, task1);
            assert.equal(taskPriorityQueue.size(), 1);
        });
    });

    // Test the TaskManager class
    describe('TaskManager', () => {

        let taskManager;

        beforeEach(() => {
            const dom = new JSDOM('<!DOCTYPE html><html><body><ul id="task-list"></ul><input type="text" id="task-input"></body></html>');
            global.window = dom.window;
            global.document = dom.window.document;
            global.HTMLElement = window.HTMLElement;

            taskManager = new TaskManager();
        });

        afterEach(() => {
            delete global.window;
            delete global.document;
        });

        it('should have a task list', () => {
            expect(taskManager.taskList).to.be.an.instanceOf(HTMLElement);
        });

        it('should have a task input', () => {
            expect(taskManager.taskInput).to.be.an.instanceOf(HTMLElement);
        });

        it('should have a priority queue', () => {
            expect(taskManager.priorityQueue).to.be.an.instanceOf(TaskPriorityQueue);
        });

        it('should add tasks to the task list', () => {
            taskManager.addTask('Test task', false, 1);
            expect(taskManager.taskList.children.length).to.equal(1);
        });

        it('should add tasks to the priority queue', () => {
            taskManager.addTask('Test task', false, 1);
            expect(taskManager.priorityQueue.size()).to.equal(1);
        });

        it('should remove tasks from the task list', () => {
            const task = taskManager.addTask('Test task', false, 1);
            taskManager.removeTask(task);
            expect(taskManager.taskList.children.length).to.equal(0);
        });

        it('should remove tasks from the priority queue', () => {
            const task = taskManager.addTask('Test task', false, 1);
            taskManager.removeTask(task);
            expect(taskManager.priorityQueue.size()).to.equal(0);
        });

        it('should add tasks to the task list in the correct order', () => {
            taskManager.addTask('Test task 1', false, 1);
            taskManager.addTask('Test task 2', false, 2);
            expect(taskManager.taskList.children[0].textContent).to.equal('Test task 1');
            expect(taskManager.taskList.children[1].textContent).to.equal('Test task 2');
        });

        it('should add tasks to the priority queue in the correct order', () => {
            taskManager.addTask('Test task 1', false, 1);
            taskManager.addTask('Test task 2', false, 2);
            expect(taskManager.priorityQueue.pop().text).to.equal('Test task 1');
            expect(taskManager.priorityQueue.pop().text).to.equal('Test task 2');
        });

        it('should add tasks to the task list in the correct order when priority is the same', () => {
            taskManager.addTask('Test task 1', false, 1);
            taskManager.addTask('Test task 2', false, 1);
            expect(taskManager.taskList.children[0].textContent).to.equal('Test task 1');
            expect(taskManager.taskList.children[1].textContent).to.equal('Test task 2');
        });

        it('should add tasks to the priority queue in the correct order when priority is the same', () => {
            taskManager.addTask('Test task 1', false, 1);
            taskManager.addTask('Test task 2', false, 1);
            expect(taskManager.priorityQueue.pop().text).to.equal('Test task 1');
            expect(taskManager.priorityQueue.pop().text).to.equal('Test task 2');
        });

        it('should add tasks to the task list in the correct order when priority is the same and one is completed', () => {
            const task1=taskManager.addTask('Test task 1', false, 1);
            const task2=taskManager.addTask('Test task 2', true, 1);
            expect(taskManager.taskList.children[0].textContent).to.equal('Test task 1');
            expect(taskManager.taskList.children[1].textContent).to.equal('Test task 2');
        });

        it('should add tasks to the priority queue in the correct order when priority is the same and one is completed', () => {
            taskManager.addTask('Test task 1', false, 1);
            taskManager.addTask('Test task 2', true, 1);
            expect(taskManager.priorityQueue.pop().text).to.equal('Test task 1');
            expect(taskManager.priorityQueue.pop().text).to.equal('Test task 2');
        });

    });
});