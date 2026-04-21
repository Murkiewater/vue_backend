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
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore';

export default {
  name: "Groups",
  components: {DataTable, Column},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      page: 0,
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