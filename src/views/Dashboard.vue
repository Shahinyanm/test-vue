<template>
  <div class="dashboard">
    <h2>Dashboard</h2>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <h3>📁 Projects</h3>
          <p>{{ projectCount }} total</p>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <h3>📝 Tasks</h3>
          <p>{{ taskCount }} total</p>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px">
      <h3>📊 Overview</h3>
      <p>This week: {{ taskCount }} tasks across {{ projectCount }} projects.</p>
      <p>Completed: {{ completedCount }}</p>
      <p>Pending: {{ pendingCount }}</p>
    </el-card>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const projects = computed(() => store.getters['projects/allProjects'])
const tasks = computed(() => {
  const all = []
  for (const proj of projects.value) {
    const t = store.getters['tasks/tasksByProject'](proj.id)
    all.push(...t)
  }
  return all
})

const projectCount = computed(() => projects.value.length)
const taskCount = computed(() => tasks.value.length)
const completedCount = computed(() => tasks.value.filter(t => t.completed).length)
const pendingCount = computed(() => tasks.value.filter(t => !t.completed).length)
</script>

<style scoped>
.dashboard {
  width: 100%;
  max-width: 1000px;
}

</style>
