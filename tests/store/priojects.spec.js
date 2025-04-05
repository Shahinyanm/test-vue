import projects from '@/store/modules/projects';

describe('projects Vuex module', () => {
  it('adds a project', () => {
    const state = { projects: [] };
    const project = { id: 1, name: 'Test Project' };
    projects.mutations.ADD_PROJECT(state, project);
    expect(state.projects).toContainEqual(project);
  });

  it('deletes a project', () => {
    const state = { projects: [{ id: 1, name: 'Test' }] };
    projects.mutations.DELETE_PROJECT(state, 1);
    expect(state.projects.length).toBe(0);
  });

  it('updates a project', () => {
    const state = { projects: [{ id: 1, name: 'Old Name' }] };
    projects.mutations.UPDATE_PROJECT(state, { id: 1, name: 'New Name' });
    expect(state.projects[0].name).toBe('New Name');
  });
});
