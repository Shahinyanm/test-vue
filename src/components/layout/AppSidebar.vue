<template>
  <el-menu
    router
    default-active="/"
    class="sidebar-menu"
  >
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span>Dashboard</span>
    </el-menu-item>
    <el-menu-item index="/projects">
      <i class="el-icon-folder"></i>
      <span>Projects</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.sidebar-menu {
  height: 100%;
  border: none;
}
</style>
