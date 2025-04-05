let tasks = [
  { id: 1, title: 'Setup backend connection', completed: false, projectId: 1 },
  { id: 2, title: 'Design database schema', completed: true, projectId: 1 },
  { id: 3, title: 'Create UI layout', completed: false, projectId: 2 },
];

export const taskService = {
  async getTasksByProject(projectId) {
    return tasks.filter(task => task.projectId === projectId);
  },
  async addTask(task) {
    tasks.push(task);
    return task;
  },
  async updateTask(updatedTask) {
    tasks = tasks.map(task =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );
    return updatedTask;
  },
  async deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    return id;
  },
};
