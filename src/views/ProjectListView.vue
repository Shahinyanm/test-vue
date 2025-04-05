<template>
  <div class="projects-view">
    <div class="header">
      <h2>Projects</h2>
      <el-button type="primary" @click="openCreate">+ New Project</el-button>
    </div>

    <div class="project-list">
      <project-card
        v-for="project in projects"
        :key="project.id"
        :project="project"
        :taskCount="getTaskCount(project.id)"
        @select="goTo(project.id)"
        @delete="deleteProject"
        @edit="editProject"
      />
    </div>

    <project-modal
      v-model="isModalOpen"
      :mode="modalMode"
      :project="modalProject"
    />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ProjectCard from '../components/project/ProjectCard.vue';
import ProjectModal from '../components/project/ProjectModal.vue';
import { ElMessageBox } from 'element-plus';

const store = useStore();
const router = useRouter();

const projects = computed(() => store.getters['projects/allProjects']);

const isModalOpen = ref(false);
const modalMode = ref('create');
const modalProject = ref(null);
const tasks = computed(() => store.state.tasks.tasks);

function getTaskCount(projectId) {
  return tasks.value.filter(t => t.projectId === projectId).length;
}
function openCreate() {
  modalProject.value = null;
  modalMode.value = 'create';
  isModalOpen.value = true;
}

function editProject(project) {
  modalProject.value = project;
  modalMode.value = 'edit';
  isModalOpen.value = true;
}

function deleteProject(id) {
  ElMessageBox.confirm('Delete this project?', 'Confirm', {
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    store.dispatch('projects/deleteProject', id);
  });
}

function goTo(id) {
  router.push({ name: 'ProjectDetail', params: { id } });
}
</script>
<style scoped>
.project-list{
  margin-top:5px;
  display: flex;
  flex-direction: column;
  gap:5px
}
</style>