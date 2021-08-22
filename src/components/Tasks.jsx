import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import addDays from "date-fns/addDays";
import isToday from "date-fns/isToday";

const FORMAT = "dd/MM/yyyy";
function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}
const AddTask = (props) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(null);
  const { onCancel, onAddTask } = props;
  return (
    <div className="add-text-dialog">
      <input
        type="text"
        value={task}
        onChange={(event) => {
          setTask(event.target.value);
        }}
      />
      <div className="add-task-action-container">
        <div className="btn-container">
          <button
            disabled={!task}
            className="add-btn"
            onClick={() => {
              onAddTask(task, date);
              onCancel();
              setTask("");
            }}
          >
            Add Task
          </button>
          <button className="cancel-btn" onClick={() => onCancel()}>
            Cancel
          </button>
        </div>
        <div className="icon-container">
          <DayPickerInput
            onDayChange={(day) => setDate(day)}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
            formatDate={formatDate}
            format={FORMAT}
            dayPickerProps={{
              modifiers: {
                disabled: [{ before: new Date() }],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

const TASK_HEADER_MAPPING = {
  INBOX: "Inbox",
  TODAY: "Today",
  NEXT_7: "Next 7 days",
};

const TaskItems = ({ selectedTab, tasks }) => {
  if (selectedTab === "NEXT_7") {
    return tasks
      .filter(
        (task) =>
          isAfter(task.date, new Date()) &&
          isBefore(task.date, addDays(new Date(), 7))
      )
      .map((task) => (
        <div className="show-task">
          <div>{task.text}</div>
          <div>{dateFnsFormat(new Date(task.date), FORMAT)}</div>
        </div>
      ));
  }

  if (selectedTab === "TODAY") {
    return tasks
      .filter((task) => isToday(task.date))
      .map((task) => (
        <div className="show-task">
          <div className="text">
            <p>{task.text}</p>
          </div>
          <div className="date">
            {dateFnsFormat(new Date(task.date), FORMAT)}
          </div>
        </div>
      ));
  }

  return tasks.map((task) => (
    <div className="show-task">
      <div>{task.text}</div>
      <div>{dateFnsFormat(new Date(task.date), FORMAT)}</div>
    </div>
  ));
};

const Tasks = ({ selectedTab }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const addNewTask = (text, date) => {
    const newTaskItem = { text, date: date || new Date() };
    setTasks((prevState) => [...prevState, newTaskItem]);
  };

  return (
    <div className="tasks">
      <h1>{TASK_HEADER_MAPPING[selectedTab]}</h1>
      {selectedTab === "INBOX" ? (
        <div
          className="add-task-btn"
          onClick={() => {
            setShowAddTask((prevState) => !prevState);
          }}
        >
          <span className="plus">+</span>
          <span className="add-task-text">Add Task</span>
        </div>
      ) : null}

      {showAddTask && (
        <AddTask
          onAddTask={addNewTask}
          onCancel={() => setShowAddTask(false)}
        />
      )}
      {tasks.length > 0 ? (
        <TaskItems tasks={tasks} selectedTab={selectedTab} />
      ) : (
        <p>No Task yet </p>
      )}
    </div>
  );
};

export default Tasks;
