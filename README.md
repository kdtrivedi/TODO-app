# TODO-app
modules
-------------------------------
Database connection in one module
Collections defined in another
Data manipulation in another
async / await for asynchronous code

uuid package in order to generate unique id's to use as identifiers.

mongodb Links to an external site. package.

Database Structure:
-
database with the following organization:

The collection for todo items will be called todoItems
todo.js
In todo.js, export five methods:

async createTask(title, description);
This async function will resolve to the newly created to-do list object, with the following properties.

{
    _id: "a unique identifier for the task; you will generate these using uuid package",
    title: "the title of the task",
    description: "a descriptive bio of the task",
    completed: false,
    completedAt: null
}   
This task will be stored in the todoItems collection.

If the task cannot be created, the method will reject.

You would use it as:
const todoItems = require("./todo");

async function main() {
    const createdTask = await todoItems.createTask("My First Task", "This is the first thing I need to do today");
    console.log(createdTask);
}

main();
async getAllTasks();
This function will resolve to an array of all tasks in the database.

const todoItems = require("./todo");

async function main() {
    const getTasks = await todoItems.getAllTasks();
    console.log(getTasks);
}

main();
async getTask(id);
When given an id, this function will resolve to a task from the database.

If no id is provided, the method should reject.

If the task does not exist, the method should reject.

For example, you would use this method as:

const todoItems = require("./todo");

async function main() {
    const task = await todoItems.getTask("9714a17c-f228-49e9-a772-9086f5ff8bfb");
    console.log(task);
}

main();
async completeTask(taskId)
This function will modify the task in the database. It will set completed to true and completedAt to the current time (Links to an external site.)Links to an external site..

If no id is provided, the method should reject.

If the task cannot be updated (does not exist, etc), this method should reject.

If the update is successful, this method will resolve to the updated task.

const todoItems = require("./todo");

async function main() {
    const task = await todoItems.getTask("9714a17c-f228-49e9-a772-9086f5ff8bfb");
    const finishedTask = await todoItems.completeTask(task._id); 
    console.log(finishedTask);
}

main();

async removeTask(id)
This function will remove the task from the database.

If no id is provided, the method should reject.

If the task cannot be removed (does not exist), the method should reject.

If the removal succeeds, resolve to true.

const todoItems = require("./todo");

async function main() {
    const removeTask = await todoItems.removeTask("9714a17c-f228-49e9-a772-9086f5ff8bfb");

    try {
        return await todoItems.getTask("9714a17c-f228-49e9-a772-9086f5ff8bfb");
    } catch (error) {
      console.error(error);
   }
}

main();
