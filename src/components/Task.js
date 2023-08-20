import React from "react";
import { useState } from "react";
const Task = (props) => {
  const [edit, setEdit] = useState(false);
  const { task, handleChangeTitle, handleDeleteTask, handleCompleted } = props;
  const [checkBox, setCheckBox] = useState(task.completed);
  const [title, setTitle] = useState(task.title);
  const handleChangeEdit = (val) => {
    setEdit(val);
  };
  const checkboxToggle = (val) => {
    setCheckBox(val);
    handleCompleted(task.id, val);
  };

  return (
    <div className="taskContainer" id={`taskContainer-${task.id}`}>
      <input
        type="checkbox"
        id={task.id}
        defaultChecked={checkBox}
        onChange={(e) => checkboxToggle(e.target.checked)}
      />
      {edit ? (
        <input
          defaultValue={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <label htmlFor={task.id}>{title}</label>
      )}
      <div className="rightAction">
        {edit ? (
          <img
            src="https://cdn0.iconfinder.com/data/icons/leading-international-corporate-website-app-collec/16/Hook-256.png"
            alt="this is a if action right"
            onClick={() => {
              handleChangeEdit(false);
              handleChangeTitle(task.id, title);
            }}
          />
        ) : (
          <img
            src="https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/pencil-edit-write-draw-stationary-256.png"
            alt="this is a if edit"
            onClick={() => handleChangeEdit(true)}
          />
        )}
        <img
          src="https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/trash-can-256.png"
          alt="this is a if action delete"
          onClick={() => handleDeleteTask(task.id)}
        />
      </div>
    </div>
  );
};

export default Task;
