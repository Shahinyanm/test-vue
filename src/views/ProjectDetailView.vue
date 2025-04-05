<template>
  <div class="container">
    <h2>Tasks for "{{ projectName }}"</h2>
    <task-form :projectId="projectId" />

    <task-item
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="toggleTask"
      @delete="deleteTask"
      @update="updateTask"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import TaskItem from '../components/task/TaskItem.vue';
import TaskForm from '../components/task/TaskForm.vue';

const store = useStore();
const route = useRoute();
const projectId = Number(route.params.id);

const tasks = computed(() => store.getters['tasks/tasksByProject'](projectId));
const projects = computed(() => store.getters['projects/allProjects']);

const projectName = computed(() => {
  const project = projects.value.find(p => p.id === projectId);
  return project ? project.name : `Project ${projectId}`;
});

onMounted(() => {
  store.dispatch('tasks/fetchTasks', projectId);
});

function toggleTask(task) {
  store.dispatch('tasks/updateTask', {
    ...task,
    completed: !task.completed
  });
}

function updateTask(task) {
  store.dispatch('tasks/updateTask', task);
}

function deleteTask(id) {
  store.dispatch('tasks/deleteTask', id);
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>


<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
