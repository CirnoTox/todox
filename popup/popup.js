import TaskManager from '../src/TaskManager.mjs';

const taskManager = new TaskManager();

taskManager.taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && taskManager.taskInput.value !== '') {
    taskManager.addTask(taskManager.taskInput.value);
    taskManager.taskInput.value = '';
  }
});

taskManager.taskList.addEventListener('change', function (event) {
  if (event.target.type === 'checkbox') {
    //using id to find the task
    console.log(event.target.parentElement.id)
    const task = taskManager.findTask(event.target.parentElement.id);
    taskManager.updateTask(task, task.text, event.target.checked);
  }
});

/*
Change the task text.
When double click the task text, the task text will change to a input box.
When press enter, the task text will change to the input box value.
*/
taskManager.taskList.addEventListener('dblclick', function (event) {
  // when double click the label html element
  if (event.target.nodeName === 'LABEL') {
    //using id to find the task
    const task = taskManager.findTask(event.target.parentElement.id);
    //change the task text to "ABC"
    taskManager.updateTask(task, 'ABC', task.completed,task.order);
    console.log("change the task text to ABC")
  }
});


/*
Change the h1 "todo-title".
Keep the Title same as "TODO" + the highest priority task.
using a while loop to find the highest priority task ( the first unchecked checkbox ).
*/
function changeTitle() {

}

