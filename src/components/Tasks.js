import Task from "./Task";
function Tasks(props) {
  const { tasks, handleChangeTitle, handleDeleteTask, handleCompleted } = props;
  return (
    <div className="tasksContainer">
      {tasks.length > 0 &&
        tasks.map((task) => {
          return (
            <Task
              task={task}
              key={task.id}
              handleChangeTitle={handleChangeTitle}
              handleDeleteTask={handleDeleteTask}
              handleCompleted={handleCompleted}
            />
          );
        })}
    </div>
  );
}

export default Tasks;
