import React from "react";
import {
  getTodos,
  addTaskToServer,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../api";
import AddToTodoList from "./AddToTodoList";
import Tasks from "./Tasks";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
  }
  componentDidMount = async () => {
    const serverTasks = (await getTodos()) ? await getTodos() : [];
    // console.log("getTodos", serverTasks);
    this.setState({
      tasks: serverTasks,
    });
  };
  handleChangeTitle = async (id, newTitle) => {
    const tasks = this.state.tasks;
    const newTask = tasks.map((task) => {
      const title = newTitle;
      return task.id === id && newTitle ? { ...task, title } : task;
    });

    const taskToChangeInServer = await updateTask(id, newTitle);
    if (taskToChangeInServer) {
      this.setState(
        () => {
          return {
            tasks: newTask,
          };
        },
        () => console.log("changedTasks: ", this.state.tasks)
      );
    }
  };
  handleAddTask = async (newtaskTitle) => {
    // console.log("newTaskTitle :", newtaskTitle);

    if (newtaskTitle.length > 0) {
      const tasks = this.state.tasks;
      const newTaskToAdd = {
        userId: 1,
        id: Date.now(),
        title: newtaskTitle,
        completed: false,
      };
      console.log("newTaskToAdd :", newTaskToAdd);

      const servernewTask = await addTaskToServer(newTaskToAdd);
      console.log("servernewTask :", servernewTask);
      if (servernewTask) {
        this.setState(
          () => {
            return {
              tasks: [newTaskToAdd, ...tasks],
            };
          },
          () => console.log("state,task", this.state.tasks)
        );
      }
    } else {
      return;
    }
  };
  handleDeleteTask = (id) => {
    const tasks = this.state.tasks;
    const newTask = tasks.filter((task) => task.id !== id);
    deleteTask(id);
    this.setState(() => {
      return {
        tasks: newTask,
      };
    });
  };
  handleCompleted = async (id, checkBox) => {
    const tasks = this.state.tasks;
    const completed = checkBox;
    const newTasks = tasks.map((task) => {
      return task.id === id ? { ...task, completed } : task;
    });
    const taskStatusToChangeInServer = await updateTaskStatus(id, checkBox);
    if (taskStatusToChangeInServer) {
      this.setState(
        () => {
          return {
            tasks: newTasks,
          };
        }
        // () => console.log("changedTasks: ", this.state.tasks)
      );
    } else {
    }
  };
  render() {
    return (
      <div className="App">
        <div className="TodolistContainer">
          <AddToTodoList handleAddTask={this.handleAddTask} />
          <span>Tasks</span>
          <Tasks
            tasks={this.state.tasks}
            handleChangeTitle={this.handleChangeTitle}
            handleDeleteTask={this.handleDeleteTask}
            handleCompleted={this.handleCompleted}
          />
        </div>
      </div>
    );
  }
}

export default App;
