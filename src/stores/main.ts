import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      error: false,
      homepageLoading: false,
      listpageLoading: false,
      userId: '6379a3dd73782e0954f01fb4',
      userLists: [] as List[],
      selectedList: {} as List,
      newListModalOpen: false,
      newListTitle: '',
      tunnelUrl: 'https://13de-2001-48f8-300b-2cb-284a-5114-d050-9166.ngrok.io',
    };
  },
  actions: {
    async fetchUserLists() {
      try {
        this.homepageLoading = true;

        const response = await fetch(`${this.tunnelUrl}/user/${this.userId}/lists`);

        const data = await response.json();

        this.userLists = data.record;
        this.homepageLoading = false;
      } catch (error) {
        this.error = true;
        this.homepageLoading = false;
        console.error(error);
      }
    },
    async fetchListById(id: string) {
      try {
        this.listpageLoading = true;

        const response = await fetch(`${this.tunnelUrl}/list/${id}`);

        const data = await response.json();

        this.selectedList = data.record;
        this.listpageLoading = false;
      } catch (error) {
        this.error = true;
        this.listpageLoading = false;
        console.error(error);
      }
    },
  },
});
