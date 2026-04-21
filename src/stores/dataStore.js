import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';
const backend_url = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
    state: () => ({
        groups: [],
        groups_total: null,
        users: [],
        users_total: null,
        items: [],
        errorMessage: "",
    }),
    actions: {
        async get_groups(page = 0, perpage = 5) {
            const authStore = useAuthStore();
            this.errorMessage = "";
            try {
                const response = await axios.get(backend_url + '/groups', {
                    headers: {
                        Authorization: 'Bearer ' + authStore.token
                    },
                    params: {
                        page: page,
                        perpage: perpage
                    }
                });

                this.groups = response.data;

            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) { 
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
        async get_users(page = 0, perpage = 5) {
            const authStore = useAuthStore();
            this.errorMessage = "";
            try {
                const response = await axios.get(backend_url + '/users', {
                    headers: {
                        Authorization: 'Bearer ' + authStore.token
                    },
                    params: {
                        page: page,
                        perpage: perpage
                    }
                });

                this.users = response.data;

            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) { 
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
        async get_groups_total() {
            this.errorMessage = "";
            try {
                const authStore = useAuthStore();
                const response = await axios.get(backend_url + '/groups_total', {
                    headers: {
                        Authorization: 'Bearer ' + authStore.token
                    }
                });

                this.groups_total = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) { 
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
        async get_users_total() {
            this.errorMessage = "";
            try {
                const authStore = useAuthStore();
                const response = await axios.get(backend_url + '/users_total', {
                    headers: {
                        Authorization: 'Bearer ' + authStore.token
                    }
                });

                this.users_total = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) { 
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
    },
});