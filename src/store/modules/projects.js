import ProjectService from '../../services/project.service.js';

export default {
  namespaced: true,
  state: () => ({
    projects: []
  }),
  mutations: {
    SET_PROJECTS(state, data) {
      state.projects = data;
    },
    ADD_PROJECT(state, project) {
      state.projects.push(project);
    },
    UPDATE_PROJECT(state, updated) {
      const index = state.projects.findIndex(p => p.id === updated.id);
      if (index !== -1) state.projects.splice(index, 1, updated);
    },
    DELETE_PROJECT(state, id) {
      state.projects = state.projects.filter(p => p.id !== id);
    }
  },
  actions: {
    async fetchProjects({ commit }) {
      const data = await ProjectService.getAll();
      commit('SET_PROJECTS', data);
    },
    async addProject({ commit }, project) {
      const created = await ProjectService.create(project);
      commit('ADD_PROJECT', created);
    },
    async updateProject({ commit }, project) {
      const updated = await ProjectService.update(project);
      commit('UPDATE_PROJECT', updated);
    },
    async deleteProject({ commit }, id) {
      await ProjectService.delete(id);
      commit('DELETE_PROJECT', id);
    }
  },
  getters: {
    allProjects: (state) => state.projects
  }
};
