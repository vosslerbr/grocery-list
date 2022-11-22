<script setup lang="ts">
  import { onMounted } from 'vue';
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

  onMounted(async () => {
    await store.fetchUserLists();
  });
</script>

<template>
  <header>
    <div class="wrapper">
      <Menubar :model="menuItems" />
    </div>
  </header>

  <Message severity="info" :closable="false" v-if="store.loading">Loading your lists...</Message>

  <Message severity="error" :closable="false" v-else-if="store.error">
    Error while loading your lists. Please refresh the page to try again.
  </Message>

  <RouterView v-else />
</template>

<style scoped></style>
