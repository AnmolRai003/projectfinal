import React, { useState, useEffect, useRef } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import './App.css';
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import usePrevious from "./components/Previous";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  useEffect(() => {
    const data = localStorage.getItem('listOfTasks');
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('listOfTasks', JSON.stringify(tasks));
  })
  const taskClear = () => {
    setTasks([]);
  }
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState([]);
  // const [isLight, isDark] = useState(false);
  // const [oldEffect, newEffect] = useState('todoapp stack-large');
  const [dark, setDark] = useState(localStorage.getItem('dark-mode') === 'true');
  useEffect(() => {
    localStorage.setItem('dark-mode', dark);
  }, [dark]);
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  const toggleDarkMode = () => {
    setDark(!dark);
  };
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName }
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => <Todo id={task.id} name={task.name} completed={task.completed} key={task.id} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} editTask={editTask} />);
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  // useEffect(() => {
  //   if (isLight) {
  //     newEffect('todoapp stack-large changedMode');
  //   }
  //   else {
  //     newEffect('todoapp stack-large');
  //   }
  // }, [isLight]);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  return (
    <div className={`app-wrapper ${dark ? 'dark' : ''}`}>
      <input type="checkbox" id="switch"
        className="checkbox" onChange={() => { toggleDarkMode() }} />
      <label htmlFor="switch" className="toggle"></label>

      <h1>TodoMatic</h1>
      <Form addTask={addTask} taskClear={taskClear} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}
export default App;
