<template>
  <div class="app-layout">
    <app-sidebar class="sidebar" />

    <div class="main">
      <app-header />
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from '../components/layout/AppSidebar.vue';
import AppHeader from '../components/layout/AppHeader.vue';
</script>

<style scoped>
.app-layout {
  width: 100%;
  display: flex;
  height: 100vh;
  background-color: #f4f6f8;
}

.sidebar {
  width: 220px;
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  box-shadow: 2px 0 8px rgba(0,0,0,0.03);
}

.main {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 24px;
  flex: 1;
  background-color: #f4f6f8;
  display: flex;
  justify-content: center;
}

</style>
