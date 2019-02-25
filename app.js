const todoItems = require("./todo");
const mongoConnection = require("./mongoConnection");

async function main() {
  const createdTask1 = await todoItems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
  console.log("First task is added");
  console.log(createdTask1);

  const createdTask2 = await todoItems.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
  console.log("Second task is added");
  console.log(createdTask2);

  console.log("------------------------------------------------------------------------------------------------------");

  console.log("This are our two tasks");
  const getAll = await todoItems.getAllTasks();
  console.log(getAll);

  console.log("------------------------------------------------------------------------------------------------------");

  console.log("let's remove first task");
  const removeMe = await todoItems.removeTask(createdTask1._id);
  console.log("task 1 was removed");

  console.log("------------------------------------------------------------------------------------------------------");

  console.log("Remaining tasks are......");
  const getAll2 = await todoItems.getAllTasks();
  console.log(getAll2);

  console.log("------------------------------------------------------------------------------------------------------");

  console.log("Now update the remaining task");
  const completed = await todoItems.completeTask(createdTask2._id);
  console.log("updated task....");
  console.log(completed);


  const db = await mongoConnection();
  await db.serverConfig.close();

  console.log("Schedule Done!");
}

main().catch(error => {
  console.log(error);
});
