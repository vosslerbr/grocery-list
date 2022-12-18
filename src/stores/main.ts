import { defineStore } from 'pinia';
import type { Socket } from 'socket.io-client';

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
      tunnelUrl: 'https://79ad-97-88-53-102.ngrok.io',
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
    async fetchListById(socket: Socket, id: string, triggerLoad: boolean) {
      try {
        this.listpageLoading = triggerLoad;

        socket.emit('get list', id);

        socket.on('get list', ({ data }) => {
          this.selectedList = data;
          this.listpageLoading = false;
        });
      } catch (error) {
        this.error = true;
        this.listpageLoading = false;
        console.error(error);
      }
    },
  },
});
