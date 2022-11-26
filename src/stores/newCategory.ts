import { defineStore } from 'pinia';

export const useNewCategoryStore = defineStore('newCategory', {
  state: () => {
    return {
      error: false,
      newCategoryModalOpen: false,
      newCategoryTitle: '',
    };
  },
  actions: {},
});
