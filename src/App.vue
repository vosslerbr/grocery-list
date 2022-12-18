<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { inject } from 'vue';
  import type { Socket } from 'socket.io-client';

  const socket = inject('socket') as Socket;

  socket.on('connect', () => {
    console.log('socket connected');
  });

  const menuItems = [
    {
      label: 'Home',
      to: '/',
    },
    {
      label: 'Meals',
      to: '/',
    },
    {
      label: 'Pantry',
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
