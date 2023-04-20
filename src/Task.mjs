import { generateUuid } from './uuid.mjs';

// Controller for the task html element.
class TaskController {
  constructor(task) {
    this._task = task;
    this._taskElement = document.createElement('li');
    this._taskLabel = document.createElement('label');
    this._taskCheckbox = document.createElement('input');
    this._taskText = document.createTextNode(this._task.text);
    //set id with task.id
    this._taskElement.id = this._task.id;
    // Html Element initialization.
    this._taskCheckbox.type = 'checkbox';
    this._taskCheckbox.checked = this._task.completed;
    this._taskLabel.appendChild(this._taskText);
    this._taskElement.appendChild(this._taskCheckbox);
    this._taskElement.appendChild(this._taskLabel);
  }
  // Get html element.
  get taskElement() {
    return this._taskElement;
  }

  // Change the task text.
  changeText(text) {
    this._taskText = text;
    this._taskLabel.textContent = text;
  }
  // Change the task completed status.
  changeCompleted(completed) {
    this._taskCheckbox.checked = completed;
  }

}

class Task {
  constructor(text, completed, order) {
    this._text = text;
    this._completed = completed;
    this._order = order;
    this._id = generateUuid();
    this._taskController = new TaskController(this);
  }

  // Getters
  get html() {
    return this._taskController.taskElement;
  }
  get completed() {
    return this._completed;
  }
  get id() {
    return this._id;
  }
  get order() {
    return this._order;
  }
  get text() {
    return this._text;
  }

  // Setters
  /**
   * @param {String} text
   */
  set text(text) {
    this._taskController.changeText(text);
    this._text = text;
  }
  /**
   * @param {Boolean} completed
   */
  set completed(completed) {
    this._taskController.changeCompleted(completed);
    this._completed = completed;
  }
  /**
   * @param {Number} order
   */
  set order(order) {
    this._order = order;
  }
}

export { Task, TaskController};