<template>
  <main>
    <h1>{{ store.selectedList.title }}</h1>
  </main>
</template>

<script setup lang="ts">
  import { useMainStore } from '@/stores/main';
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const store = useMainStore();
  const route = useRoute();

  const id = route.params.id as string;
  console.log(id);

  onMounted(async () => {
    await store.fetchListById(route.params.id as string);
  });
</script>
