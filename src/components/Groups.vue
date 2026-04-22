<template>
  <DataTable
    :value="groups"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords=groups_total
    @page="onPageChange"
    responsive-layout="scroll"
    :leading="true"
    :first="offset"
  >
  <Column field="id" header="№"/>
  <Column field="name" header="Наименование группы"/>
  <Column header="Изображение">
    <template #body="slotProps">
      <img
      :src="slotProps.data.picture_url || defaultImage"
      @error="err => err.target.src = defaultImage"
      alt="group image"
      style="width: 100px; height: 100px; border-radius: 6px;"
      />
    </template>
  </Column>
  <template #footer>
    <div class="text-end">
      <Button type="button" @click="this.$router.push('/createGroup')" icon="pi pi-plus" label="Добавить группу" />
    </div>
  </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import {useDataStore} from '@/stores/dataStore';

export default {
  name: "Groups",
  components: {DataTable, Column, Button},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      page: 0,
      offset: 0,
      defaultImage: 'https://storage.yandexcloud.net/nifty-db/groups_pictures/nifty-default-group.png'
    }
  },
  computed: {
    groups() {
      return this.dataStore.groups;
    },
    groups_total() {
      return this.dataStore.groups_total;
    }
  },
  mounted() {
    console.log('Groups component mounted!');
    this.dataStore.get_groups();
    this.dataStore.get_groups_total();
    console.log('Groups=', this.groups);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_groups(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>
<style scoped>
</style>
