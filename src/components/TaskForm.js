import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit">{editingTask ? 'Update' : 'Add'} Task</button>
        {editingTask && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskForm; 