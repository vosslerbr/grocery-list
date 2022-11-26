<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { useMainStore } from './stores/main';

  const store = useMainStore();

  const menuItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      to: '/',
    },
  ];
</script>

<template>
  <header>
    <div class="wrapper">
      <Menubar :model="menuItems" />
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
