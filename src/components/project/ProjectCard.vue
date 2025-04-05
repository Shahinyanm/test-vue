<template>
  <el-card class="project-card" shadow="hover">
    <div class="card-content">
      <div class="left" @click="$emit('select')">
        <div class="name">{{ project.name }}</div>
        <div class="meta">Tasks: {{ taskCount }}</div>
      </div>
      <div class="actions">
        <el-button :icon="Edit" circle size="small" @click.stop="$emit('edit', project)" />
        <el-button :icon="Delete" circle size="small" @click.stop="$emit('delete', project.id)" />
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { Edit, Delete } from '@element-plus/icons-vue';
defineProps({
  project: Object,
  taskCount: Number,
});defineEmits(['select', 'edit', 'delete']);
</script>

<style scoped>
.project-card {
  padding: 10px;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap:20px
}

.name {
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
}

.actions {
  display: flex;
  gap: 10px;
}
.left {
  cursor: pointer;
}
</style>
