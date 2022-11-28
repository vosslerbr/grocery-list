<template>
  <main>
    <Message v-if="store.listpageLoading" severity="info" :closable="false">
      Loading list...
    </Message>

    <div v-else>
      <div class="list-toolbar">
        <h1>{{ store.selectedList.title }}</h1>
        <Button label="New Category" icon="pi pi-plus" @click="handleNewCategoryClick"></Button>
      </div>

      <DataTable
        v-for="(category, index) in store.selectedList.categories"
        :key="index"
        :value="category.items"
        style="margin-bottom: 2rem"
        stripedRows
        class="p-datatable-sm">
        <template #header>
          <div class="list-toolbar">
            <h3>{{ category.title }}</h3>
            <Button
              label="Add Item"
              icon="pi pi-plus"
              class="p-button-secondary p-button-sm"
              @click="handleNewItemClick(category)"></Button>
          </div>
        </template>
        <template #empty> No items in this category. </template>
        <Column field="name" header="Name" style="width: 50%"></Column>
        <Column field="quantity" header="Quantity"></Column>
        <Column header="Edit" style="max-width: 4rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-secondary p-button-sm"
              @click="handleEditItemClick(slotProps.data._id)"></Button>
          </template>
        </Column>
        <Column header="Delete" style="max-width: 4rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              class="p-button-danger p-button-sm"
              @click="handleDeleteItemClick(slotProps.data._id)"></Button>
          </template>
        </Column>
      </DataTable>

      <Dialog
        header="New Category"
        v-model:visible="newCategoryStore.newCategoryModalOpen"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw !important' }"
        position="top">
        <div class="field">
          <label for="title">Category Title</label>
          <InputText v-model="newCategoryStore.newCategoryTitle" id="title" />
        </div>
        <template #footer>
          <Button
            label="Cancel"
            class="p-button-danger p-button-text"
            @click="handleNewCategoryCancelClick" />
          <Button label="Create" icon="pi pi-check" @click="handleNewCategoryCreateClick" />
        </template>
      </Dialog>

      <Dialog
        header="New Item"
        v-model:visible="newItemStore.newItemModalOpen"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw !important' }"
        position="top">
        <div class="field">
          <Tag :value="newItemStore.newItemCategoryTitle" icon="pi pi-folder-open" />
        </div>

        <div class="field">
          <label for="name">Name</label>
          <InputText v-model="newItemStore.newItemName" id="name" />
        </div>
        <div class="field">
          <label for="quantity">Quantity</label>
          <InputNumber
            v-model="newItemStore.newItemQuantity"
            id="quantity"
            showButtons
            buttonLayout="horizontal"
            :step="1"
            :min="1"
            decrementButtonClass="p-button-secondary"
            incrementButtonClass="p-button-secondary"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus" />
        </div>
        <template #footer>
          <Button
            label="Cancel"
            class="p-button-danger p-button-text"
            @click="handleNewItemCancelClick" />
          <Button label="Create" icon="pi pi-check" @click="handleNewItemCreateClick" />
        </template>
      </Dialog>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { useMainStore } from '@/stores/main';
  import { useNewCategoryStore } from '@/stores/newCategory';
  import { useNewItemStore } from '@/stores/newItem';

  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const store = useMainStore();
  const newCategoryStore = useNewCategoryStore();
  const newItemStore = useNewItemStore();
  const route = useRoute();

  const id = route.params.id as string;
  console.log(id);

  onMounted(async () => {
    await store.fetchListById(route.params.id as string);
  });

  const handleNewCategoryClick = () => {
    newCategoryStore.newCategoryModalOpen = true;
  };

  const handleNewItemClick = (category: any) => {
    newItemStore.newItemCategoryId = category._id;
    newItemStore.newItemCategoryTitle = category.title;
    newItemStore.newItemModalOpen = true;
  };

  const handleNewCategoryCancelClick = () => {
    newCategoryStore.$reset();
  };

  const handleNewItemCancelClick = () => {
    newItemStore.$reset();
  };

  const handleNewCategoryCreateClick = async () => {
    try {
      await fetch(`${store.tunnelUrl}/list/${store.selectedList._id}/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newCategoryStore.newCategoryTitle,
        }),
      });

      await store.fetchListById(store.selectedList._id);

      newCategoryStore.$reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewItemCreateClick = async () => {
    try {
      await fetch(`${store.tunnelUrl}/category/${newItemStore.newItemCategoryId}/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newItemStore.newItemName,
          quantity: newItemStore.newItemQuantity,
          checked: newItemStore.newItemChecked,
        }),
      });

      await store.fetchListById(store.selectedList._id);

      newItemStore.$reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditItemClick = async (id: string) => {
    console.log(id);
  };

  const handleDeleteItemClick = async (id: string) => {
    console.log(id);
  };
</script>

<style scoped>
  .list-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-toolbar h3 {
    margin: 0;
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
