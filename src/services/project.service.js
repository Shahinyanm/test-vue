let projects = [
  { id: 1, name: 'Project Alpha' },
  { id: 2, name: 'Project Beta' }
];

export default {
  getAll() {
    return new Promise(resolve => setTimeout(() => resolve([...projects]), 300));
  },
  create(project) {
    projects.push(project);
    return Promise.resolve(project);
  },
  update(updated) {
    const idx = projects.findIndex(p => p.id === updated.id);
    if (idx !== -1) projects[idx] = updated;
    return Promise.resolve(updated);
  },
  delete(id) {
    projects = projects.filter(p => p.id !== id);
    return Promise.resolve();
  }
};
