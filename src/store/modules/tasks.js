import { taskService } from '../../services/task.service.js';

export default {
  namespaced: true,
  state: () => ({
    tasks: [],
  }),

  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    UPDATE_TASK(state, updatedTask) {
      const idx = state.tasks.findIndex(t => t.id === updatedTask.id);
      if (idx !== -1) state.tasks.splice(idx, 1, updatedTask);
    },
    DELETE_TASK(state, id) {
      state.tasks = state.tasks.filter(t => t.id !== id);
    },
  },

  actions: {
    async fetchTasks({ commit }, projectId) {
      const result = await taskService.getTasksByProject(projectId);
      commit('SET_TASKS', result);
    },

    async addTask({ commit }, task) {
      const result = await taskService.addTask(task);
      commit('ADD_TASK', result);
    },

    async updateTask({ commit }, task) {
      const result = await taskService.updateTask(task);
      commit('UPDATE_TASK', result);
    },

    async deleteTask({ commit }, id) {
      await taskService.deleteTask(id);
      commit('DELETE_TASK', id);
    },
  },

  getters: {
    tasksByProject: (state) => (projectId) =>
      state.tasks.filter(task => task.projectId === projectId),
  },
};
