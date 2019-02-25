const collection = require("./mongoCollection");
const todoItems = collection.todoItems;
const idv1 = require('uuid/v1');

module.exports = {
  async getTask(id) {
    if (!id) throw "You must provide an id to search for";

    const toDoCollection = await todoItems();
    const task = await toDoCollection.findOne({
      _id: id
    });
    if (task === null) throw "No task with that id";
    return task;
  },

  async createTask(title, description) {
    if (!title)
      throw "You must provide a title for your todo";

    if (!description)
      throw "You must provide description of todo";

    const toDoCollection = await todoItems();

    var itemId = idv1();

    let newTodo = {
      _id: itemId,
      title: title,
      description: description,
      completed: false,
      completedAt: null
    };

    const insertInfo = await toDoCollection.insertOne(newTodo);
    if (insertInfo.insertedCount === 0) throw "Could not add toDo";

    const newMongoId = insertInfo.insertedId;
    const toDoTask = await this.getTask(newMongoId);
    return toDoTask;
  },

  async getAllTasks() {
    const toDoCollection = await todoItems();
    const toDoTask = await toDoCollection.find({}).toArray();
    return toDoTask;
  },

  async completeTask(id) {
    if (!id) throw "You must provide an id to search for";

    const toDoCollection = await todoItems();
    const updateTask = {
      $set: {
        completed: true,
        completedAt: Date()
      }
    };

    const updateInfo = await toDoCollection.updateOne({
      _id: id
    }, updateTask);
    if (updateInfo.modifiedCount === 0) {
      throw "could not update todo successfully";
    }
    return await this.getTask(id);
  },

  async removeTask(id) {
    if (!id) throw "You must provide an id to search for";

    const toDoCollection = await todoItems();
    const deleteTask = await toDoCollection.removeOne({
      _id: id
    });

    if (deleteTask.deletedCount === 0) {
      throw `Could not delete task with id of ${id}`;
    }
    return deleteTask;
  }
};
