import { defineStore } from 'pinia';
import axios from 'axios';
const backend_url = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
    state: () => ({
        groups: [],
        groups_total: null,
        users: [],
        users_total: null,
        items: [],
        errorCode: "",
        errorMessage: "",
    }),
    actions: {
        async get_groups(page = 0, perpage = 5, search = "") {
            this.errorMessage = "";
            try {
                const response = await axios.get(backend_url + '/groups', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    params: {
                        page: page,
                        perpage: perpage,
                        search: search
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
        async get_users(page = 0, perpage = 5, search = "") {
            this.errorMessage = "";
            try {
                const response = await axios.get(backend_url + '/users', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    params: {
                        page: page,
                        perpage: perpage,
                        search: search
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
        async get_groups_total(search = "") {
            this.errorMessage = "";
            try {
                const response = await axios.get(backend_url + '/groups_total', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    params: {
                      search: search
                    },
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
        async get_users_total(search = "") {
            this.errorMessage = "";
            try {
                const response = await axios.get(backend_url + '/users_total', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    params: {
                      search: search
                    },
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
        async delete_group(id) {
          this.errorCode = 0;
          this.errorMessage = "";
          try {
            const response = await axios.delete(backend_url + '/group/' + id, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: 'Bearer ' + localStorage.getItem('token')
                },
              }
            );
            this.errorCode = response.data.code;
            this.errorMessage = response.data.error;
          } catch (error) {
              if (error.response) {
                  this.errorCode = 11;
                  this.errorMessage = error.response.data.message;
                  console.log(error);
              } else if (error.request) {
                  this.errorCode = 12;
                  this.errorMessage = error.message;
                  console.log(error);
              } else {
                  this.errorCode = 13;
                  console.log(error);
              }
            }
        },
        async create_group(formData) {
            this.errorMessage = "";
            try {
                const response = await axios.post(backend_url + '/group', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                });
                this.errorCode = response.data.code;
                this.errorMessage = response.data.message;
            } catch (error) {
                if (error.response) {
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        },
        async update_group(formData, id) {
            this.errorMessage = "";
            try {
                const response = await axios.post(backend_url + '/group/' + id, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                });
                this.errorCode = response.data.code;
                this.errorMessage = response.data.message;
            } catch (error) {
                if (error.response) {
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        },
        async create_user(formData) {
            this.errorMessage = "";
            try {
                const response = await axios.post(backend_url + '/user', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                });
                this.errorCode = response.data.code;
                this.errorMessage = response.data.message;
            } catch (error) {
                if (error.response) {
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        },
    },
});
