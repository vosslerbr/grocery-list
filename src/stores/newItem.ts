import { defineStore } from 'pinia';

export const useNewItemStore = defineStore('newItem', {
  state: () => {
    return {
      error: false,
      newItemModalOpen: false,
      newItemCategoryId: '',
      newItemCategoryTitle: '',
      newItemName: '',
      newItemQuantity: 1,
      newItemChecked: false,
    };
  },
  actions: {},
});
