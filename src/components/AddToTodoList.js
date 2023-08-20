import { useState } from "react";
function AddToTodoList(props) {
  const { handleAddTask } = props;
  const [taskTitle, setTaskTitle] = useState("");
  const handleChange = (e) => {
    setTaskTitle(e.target.value);
  };
  return (
    <div className="AddTodoContainer">
      <span>Todo List</span>
      <div className="addTodo">
        <input placeholder="Create new task" onChange={handleChange} />
        {/* <div className="inputAddButton"> */}
        <button onClick={() => handleAddTask(taskTitle)}>Add Task</button>
        {/* </div> */}
      </div>
      <div className="horizontalLine"></div>
    </div>
  );
}

export default AddToTodoList;
