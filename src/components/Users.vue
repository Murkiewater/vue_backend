<template>
  <DataTable
    :value="users"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords=users_total
    @page="onPageChange"
    responsive-layout="scroll"
    :leading="true"
    :first="offset"
  > 
    <Column field="id" header="№"/> 
    <Column field="full_name" header="Пользователи"/> 
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore';

export default {
  name: "Users",
  components: {DataTable, Column},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      page: 0,
    }
  },
  computed: {
    users() {
      return this.dataStore.users;
    },
    users_total() {
      return this.dataStore.users_total;
    }
  },
  mounted() {
    console.log('Users component mounted!');
    this.dataStore.get_users();
    this.dataStore.get_users_total();
    console.log('Users=', this.users);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_users(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>
<style scoped>
</style>