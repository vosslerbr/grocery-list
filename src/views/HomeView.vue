<script setup lang="ts">
  import { useMainStore } from '@/stores/main';
  import dayjs from 'dayjs';
  import { onMounted } from 'vue';

  const store = useMainStore();

  onMounted(async () => {
    await store.fetchUserLists();
  });

  // add up the number of items in each category of a list
  const numItemsInList = (listId: string) => {
    const list = store.userLists.find((list) => list._id === listId);

    if (!list) return;

    return list.categories.reduce((total, category) => {
      return total + category.items.length;
    }, 0);
  };

  const handleNewListClick = () => {
    store.newListModalOpen = true;
  };

  const handleNewCategoryCancelClick = () => {
    store.newListTitle = '';
    store.newListModalOpen = false;
  };

  const handleNewCategoryCreateClick = async () => {
    try {
      const response = await fetch(`${store.tunnelUrl}/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: store.newListTitle,
          owner: store.userId,
        }),
      });

      await store.fetchUserLists();

      store.newListTitle = '';
      store.newListModalOpen = false;
    } catch (error) {
      console.error(error);
    }
  };
</script>

<template>
  <main>
    <Message severity="info" :closable="false" v-if="store.homepageLoading"
      >Loading your lists...</Message
    >

    <Message severity="error" :closable="false" v-else-if="store.error">
      Error while loading your lists. Please refresh the page to try again.
    </Message>

    <div v-else>
      <div class="list-toolbar">
        <h1>Your Lists</h1>
        <Button label="New List" icon="pi pi-plus" @click="handleNewListClick"></Button>
      </div>
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
    </div>

    <Dialog
      header="New List"
      v-model:visible="store.newListModalOpen"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '30vw !important' }">
      <div class="field">
        <label for="title">List Title</label>
        <InputText v-model="store.newListTitle" id="title" />
      </div>
      <template #footer>
        <Button
          label="Cancel"
          class="p-button-danger p-button-text"
          @click="handleNewCategoryCancelClick" />
        <Button label="Create" icon="pi pi-check" @click="handleNewCategoryCreateClick" />
      </template>
    </Dialog>
  </main>
</template>

<style scoped>
  .list-toolbar {
    margin: 2rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-toolbar h1 {
    margin: 0;
  }
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

  .field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .field label {
    margin-bottom: 0.5rem;
  }
</style>
