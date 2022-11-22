<script setup lang="ts">
  import { useMainStore } from '@/stores/main';
  import dayjs from 'dayjs';

  const store = useMainStore();

  // add up the number of items in each category of a list
  const numItemsInList = (listId: string) => {
    const list = store.userLists.find((list) => list._id === listId);

    if (!list) return;

    return list.categories.reduce((total, category) => {
      return total + category.items.length;
    }, 0);
  };
</script>

<template>
  <main>
    <h1>Your Lists</h1>
    <section id="lists-grid">
      <RouterLink v-for="(list, index) in store.userLists" :key="index" :to="`/list/${list._id}`">
        <Card>
          <template #title>
            {{ list.title }}
          </template>
          <template #subtitle>
            Last Modified: {{ dayjs(list.created_date).format('MM/DD/YYYY') }}
          </template>
          <template #content>
            <div class="list-card-content">
              <div class="list-card-content-div">
                <h3>Categories</h3>
                <span>{{ list.categories.length }}</span>
              </div>
              <div class="list-card-content-div">
                <h3>Items</h3>
                <span>{{ numItemsInList(list._id) }}</span>
              </div>
            </div>
          </template>
        </Card>
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
  .list-card-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }

  .list-card-content-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--surface-b);
    border-radius: var(--border-radius);
    padding: 1rem;
  }

  .list-card-content-div h3 {
    margin-top: 0px;
    margin-bottom: 0.5rem;
  }

  .list-card-content-div span {
    font-size: 2rem;
    font-weight: bold;
  }
</style>
