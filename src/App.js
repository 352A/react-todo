import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (deletedTask) => {
    setTasks(tasks.filter((task) => task !== deletedTask));
  };

  const completeTask = (completedTask) => {
    setTasks(tasks.filter((task) => task !== completedTask));
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const deleteCompletedTask = (deletedTask) => {
    setCompletedTasks(completedTasks.filter((task) => task !== deletedTask));
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Add new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit" onClick={addTask}>
        +
      </button>

      <Tasks tasks={tasks} onComplete={completeTask} onDelete={deleteTask} />

      {completedTasks.length > 0 && (
        <CompletedTasks tasks={completedTasks} onDelete={deleteCompletedTask} />
      )}
    </div>
  );
}

function Tasks({ tasks, onComplete, onDelete }) {
  return (
    <div className="task-items">
      <p>Tasks to do - {tasks.length} </p>
      <div className="task-container">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <span>{task}</span>
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <button type="button" onClick={() => onComplete(task)}>
                ✓
              </button>
              <button type="button" onClick={() => onDelete(task)}>
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompletedTasks({ tasks, onDelete }) {
  return (
    <div className="completed">
      <p>Done - {tasks.length} </p>
      <div className="task-container">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <span>{task}</span>
            <button type="button" onClick={() => onDelete(task)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
