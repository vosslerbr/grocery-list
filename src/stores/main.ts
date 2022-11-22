import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      error: false,
      loading: false,
      userId: '6379a3dd73782e0954f01fb4',
      userLists: [] as List[],
      selectedList: {} as List,
    };
  },
  actions: {
    async fetchUserLists() {
      try {
        this.loading = true;

        const response = await fetch(
          `https://8c03-97-88-53-102.ngrok.io/user/${this.userId}/lists`
        );

        const data = await response.json();

        this.userLists = data.record;
        this.loading = false;
      } catch (error) {
        this.error = true;
        this.loading = false;
        console.error(error);
      }
    },
    async fetchListById(id: string) {
      try {
        this.loading = true;

        const response = await fetch(`https://8c03-97-88-53-102.ngrok.io/list/${id}`);

        const data = await response.json();

        this.selectedList = data.record;
        this.loading = false;
      } catch (error) {
        this.error = true;
        this.loading = false;
        console.error(error);
      }
    },
  },
});
