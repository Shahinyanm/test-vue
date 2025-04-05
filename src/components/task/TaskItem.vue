<template>
  <div class="task-row">
    <div class="left">
      <el-checkbox v-model="checked" @change="toggleDone" />
      <div class="text" :class="{ done: checked }">{{ task.title }}</div>
    </div>

    <div class="right">
      <el-tag :type="task.completed ? 'success' : 'warning'" size="small">
        {{ task.completed ? 'Done' : 'Pending' }}
      </el-tag>

      <el-button :icon="Edit" text circle size="small" @click="startEdit" />
      <el-button :icon="Delete" text circle size="small" @click="$emit('delete', task.id)" />
    </div>

    <el-dialog v-model="editVisible" title="Edit Task" width="400px">
      <el-input v-model="editedTitle" />
      <template #footer>
        <el-button @click="editVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveEdit">Save</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';

const props = defineProps({ task: Object });
const emit = defineEmits(['update', 'toggle', 'delete']);

const checked = ref(props.task.completed);
const editedTitle = ref(props.task.title);
const editVisible = ref(false);

watch(() => props.task.completed, val => checked.value = val);

function toggleDone() {
  emit('toggle', { ...props.task, completed: checked.value });
}

function startEdit() {
  editedTitle.value = props.task.title;
  editVisible.value = true;
}

function saveEdit() {
  emit('update', { ...props.task, title: editedTitle.value });
  editVisible.value = false;
}
</script>

<style scoped>
.task-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  background: white;
  transition: background 0.2s ease;
}

.task-row:hover {
  background: #f8f9fa;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 20px;
}

.text {
  font-size: 15px;
}

.text.done {
  text-decoration: line-through;
  color: #aaa;
}

.right {
  display: flex;
  align-items: center;
}
</style>
