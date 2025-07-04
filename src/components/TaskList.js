import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete, onToggle }) => {
  if (!tasks.length) return <div className="no-tasks">No tasks found.</div>;
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TaskList; 