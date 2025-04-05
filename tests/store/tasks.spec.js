import tasks from '@/store/modules/tasks';

describe('tasks Vuex module', () => {
  it('adds a task', () => {
    const state = { tasks: [] };
    const task = { id: 1, title: 'Test Task', projectId: 1, completed: false };
    tasks.mutations.ADD_TASK(state, task);
    expect(state.tasks[0].title).toBe('Test Task');
  });

  it('deletes a task', () => {
    const state = {
      tasks: [
        { id: 1, title: 'Task', projectId: 1 },
        { id: 2, title: 'Task 2', projectId: 1 },
      ],
    };
    tasks.mutations.DELETE_TASK(state, 1);
    expect(state.tasks.length).toBe(1);
    expect(state.tasks[0].id).toBe(2);
  });

  it('updates a task', () => {
    const state = {
      tasks: [{ id: 1, title: 'Old Task', projectId: 1, completed: false }],
    };
    tasks.mutations.UPDATE_TASK(state, {
      id: 1,
      title: 'Updated Task',
      projectId: 1,
      completed: true,
    });
    expect(state.tasks[0].title).toBe('Updated Task');
    expect(state.tasks[0].completed).toBe(true);
  });
});
