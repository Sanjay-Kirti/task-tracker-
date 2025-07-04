import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Login from './components/Login';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import { getUsername, removeUsername, getTasks, saveTasks, loadSampleTasksIfEmpty } from './utils/localStorage';

function App() {
  const [username, setUsername] = useState(getUsername());
  const [showDashboard, setShowDashboard] = useState(!!getUsername());
  const [tasks, setTasks] = useState(getTasks());
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadSampleTasksIfEmpty();
    setUsername(getUsername());
    setShowDashboard(!!getUsername());
    setTasks(getTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleLogout = () => {
    removeUsername();
    setUsername(null);
    setShowDashboard(false);
  };

  const handleAddTask = ({ title, description }) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const handleEditTask = ({ title, description }) => {
    setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, title, description } : t));
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="App">
      {!showDashboard ? (
        <Login onLogin={name => { setUsername(name); setShowDashboard(true); }} />
      ) : (
        <div>
          <header className="app-header">
            <span>Welcome, {username}!</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </header>
          <main className="dashboard">
            <TaskForm
              onSubmit={editingTask ? handleEditTask : handleAddTask}
              editingTask={editingTask}
              onCancel={() => setEditingTask(null)}
            />
            <TaskFilter
              current={filter}
              counts={counts}
              onChange={setFilter}
            />
            <TaskList
              tasks={filteredTasks}
              onEdit={task => setEditingTask(task)}
              onDelete={handleDeleteTask}
              onToggle={handleToggleTask}
            />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
