import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            userId: '',
        };
    },
    actions: {
        setUserId(userId: string) {
            this.userId = userId;
        },
    },
});