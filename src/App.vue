<script setup lang="ts">
  import { RouterView } from 'vue-router';

  const menuItems = [
    {
      label: 'Home',
      to: '/',
    },
    {
      label: 'Meals',
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
