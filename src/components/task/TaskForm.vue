<template>
  <div class="add-task-wrapper">
    <el-button type="primary" @click="dialogVisible = true">
      + Add Task
    </el-button>

    <el-dialog v-model="dialogVisible" title="New Task" width="400px">
      <el-form @submit.prevent="submit">
        <el-form-item label="Task title">
          <el-input v-model="title" placeholder="Enter task title" />
        </el-form-item>
        <div class="footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" native-type="submit">Create</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

const props = defineProps({ projectId: Number });
const store = useStore();
const title = ref('');
const dialogVisible = ref(false);

function submit() {
  if (!title.value.trim()) {
    ElMessage.warning('task title cannot be empty');
    return;
  }

  const task = {
    id: Date.now(),
    title: title.value,
    completed: false,
    projectId: props.projectId
  };

  store.dispatch('tasks/addTask', task);
  title.value = '';
  dialogVisible.value = false;
  ElMessage.success('task created!');
}
</script>

<style scoped>
.add-task-wrapper {
  margin-bottom: 20px;
}
.footer {
  text-align: right;
  margin-top: 10px;
}
</style>
