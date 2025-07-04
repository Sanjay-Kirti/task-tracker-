// localStorage.js utility for Personal Task Tracker

const USERNAME_KEY = 'ptt_username';
const TASKS_KEY = 'ptt_tasks';

export function saveUsername(username) {
  localStorage.setItem(USERNAME_KEY, username);
}

export function getUsername() {
  return localStorage.getItem(USERNAME_KEY);
}

export function removeUsername() {
  localStorage.removeItem(USERNAME_KEY);
}

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function getTasks() {
  const data = localStorage.getItem(TASKS_KEY);
  return data ? JSON.parse(data) : [];
}

export const sampleTasks = [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Build a task tracker application",
    completed: false,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features",
    completed: true,
    createdAt: "2024-01-14T15:30:00Z"
  }
];

export function loadSampleTasksIfEmpty() {
  let tasks = getTasks();
  // Add sample tasks if not already present (by id)
  const sampleIds = new Set(sampleTasks.map(t => t.id));
  const existingIds = new Set(tasks.map(t => t.id));
  const missingSamples = sampleTasks.filter(t => !existingIds.has(t.id));
  if (missingSamples.length > 0) {
    tasks = [...missingSamples, ...tasks];
    saveTasks(tasks);
  }
} 