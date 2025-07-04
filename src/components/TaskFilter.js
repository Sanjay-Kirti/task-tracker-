import React from 'react';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'completed', label: 'Completed' },
  { key: 'pending', label: 'Pending' },
];

const TaskFilter = ({ current, counts, onChange }) => {
  return (
    <div className="task-filter">
      {FILTERS.map(f => (
        <button
          key={f.key}
          className={current === f.key ? 'active' : ''}
          onClick={() => onChange(f.key)}
        >
          {f.label} ({counts[f.key] || 0})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter; 