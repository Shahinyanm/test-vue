<template>
  <el-dialog
    v-model="visible"
    :title="mode === 'edit' ? 'Edit Project' : 'Create Project'"
    width="400px"
  >
    <el-form @submit.prevent="submit">
      <el-form-item label="Project Name">
        <el-input v-model="name" placeholder="Enter project name" />
      </el-form-item>
      <div class="footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" native-type="submit">
          {{ mode === 'edit' ? 'Save' : 'Create' }}
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

const props = defineProps({
  modelValue: Boolean,
  project: Object,
  mode: {
    type: String,
    default: 'create',
  },
});
const emit = defineEmits(['update:modelValue']);

const visible = ref(false);
const name = ref('');
const store = useStore();

watch(() => props.modelValue, val => (visible.value = val));
watch(() => props.project, (project) => {
  name.value = project?.name || '';
});
watch(visible, val => {
  if (!val) emit('update:modelValue', false);
});

function close() {
  visible.value = false;
}

function submit() {
  const trimmed = name.value.trim();
  if (!trimmed) {
    ElMessage.warning('Project name is required');
    return;
  }

  if (props.mode === 'edit') {
    store.dispatch('projects/updateProject', {
      ...props.project,
      name: trimmed,
    });
    ElMessage.success('Project updated!');
  } else {
    store.dispatch('projects/addProject', {
      id: Date.now(),
      name: trimmed,
    });
    ElMessage.success('Project created!');
  }

  name.value = '';
  close();
}
</script>

<style scoped>
.footer {
  text-align: right;
  margin-top: 10px;
}
</style>
