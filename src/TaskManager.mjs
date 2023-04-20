import { Task } from './Task.mjs';
import PriorityQueue from './PriorityQueue.mjs';

class TaskPriorityQueue {
  constructor() {
    this._priorityQueue = new PriorityQueue();
  }

  push(task) {
    this._priorityQueue.push(task);
  }
  pop() {
    return this._priorityQueue.pop();
  }

  remove(task) {
    this._priorityQueue.remove(task);
    // update the order of the tasks
    this._priorityQueue.forEach((task, index) => {
      task.order = index;
    });
  }

  size() {
    return this._priorityQueue.size();
  }

  forEach(callback) {
    this._priorityQueue.forEach(callback);
  }

  // find the task with the given id,For loop
  find(id) {
    for (let i = 0; i < this._priorityQueue.size(); i++) {
      const task = this._priorityQueue.pop();
      if (task.id === id) {
        this._priorityQueue.push(task);
        return task;
      }
      this._priorityQueue.push(task);
    }
    return null;
  }

  // Change the order,
  // using PriorityQueue's changePosition function.
  changeOrder(oldOrder, Neworder) {
    this._priorityQueue.changePosition(oldOrder, Neworder);
  }
}



/*
Manager for the task list. 
It is responsible for managing: 
  the tasks-list html element;
  the task list content.
*/
export default class TaskManager {
  constructor() {
    this.taskList = document.getElementById('task-list');
    this.taskInput = document.getElementById('task-input');
    this.priorityQueue = new TaskPriorityQueue();
    this.loadTasks();
  }

  /*
  Load data.
  Retrieve data from local storage, add data to a new array,
  finally add the array to taskList.
  */
  async loadTasks() {
    const result = await chrome.storage.local.get(['tasks']);
    const tasks = result.tasks;
    if (tasks) {
      for (let i = 0; i < tasks.length; i++) {
        this.addTask(tasks[i].text, tasks[i].completed, tasks[i].order);
      }
    }
  }

  /*
  Save data.
  Detailed process: 
    Get task from the priority queue,
    add data to a new array, 
    finally save the array to local storage.
  */
  saveTasks() {
    const tasks = [];
    this.priorityQueue.forEach(task=> {
      tasks.push({
        text: task.text,
        completed: task.completed,
        order: task.order,
      });
    });
    // Set the tasks property of the storage to the array.
    chrome.storage.local.set({ tasks: tasks });
  }

  /*
  Add new task.
  Function parameters:
    input: taskText
    completed: the checkbox is checked or not
    order: the order of the task
  Function process:
    Create a new Task object,
    add the task to Both Queue and taskList.
  */
  addTask(text, completed = false, order = this.priorityQueue.size()) {
    const task = new Task(text, completed, order);
    this.priorityQueue.push(task);
    // inerst into taskList with order
    // Create a new task element and insert it into the task list at the specified order.
    const taskListChildren = this.taskList.children;
    this.taskList.insertBefore(task.html, taskListChildren[order]);
    this.saveTasks();
    return task;
  }

  /*
  Remove task.
  Function parameters:
    task: the task to be removed  
  */
  removeTask(task) {
    // Remove from task list.
    this.taskList.removeChild(task.html);
    // Remove from priority queue.
    this.priorityQueue.remove(task);
    // Save data.
    this.saveTasks();
    return task;
  }

  /*
  Find task.
  Function parameters:
    id: the id of the task
  */
  findTask(id) {
    return this.priorityQueue.find(id);
  }

  /*
  Update task.
  Function parameters:
    task: the task to be updated
    text: the new text of the task
    completed: the new status of the checkbox
    order: the new order of the task
  */

  //TODO
  updateTask(task, text, completed, order = null) {
    this.removeTask(task)
    if (order !== null) {
      this.addTask(text, completed, order)
      this.saveTasks();
      return;
    }

    if (completed === true) {
      this.addTask(text, completed, this.priorityQueue.size())
    }
    //Set task order to the first
    else {
      this.addTask(text, completed, 0)
    }
  }

}

export { TaskPriorityQueue, TaskManager };