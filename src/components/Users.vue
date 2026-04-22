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
    <Column header="Изображение">
      <template #body="slotProps">
        <img
          :src="slotProps.data.picture_url || defaultImage"
          @error="err => err.target.src = defaultImage"
          alt="user image"
          style="width: 100px; height: 100px; border-radius: 6px;"
        />
    </template>
  </Column>
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
      offset: 0,
      page: 0,
      defaultImage: 'https://storage.yandexcloud.net/nifty-db/groups_pictures/nifty-default-user.png'
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
