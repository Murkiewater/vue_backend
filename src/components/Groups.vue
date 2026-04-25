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
  <template #header >
    <div class="flex justify-center">
      <InputText v-model="search" type="text" id="search" required placeholder="Название" class="m-2 sm:w-auto"/>
      <Button type="button" @click="onPushSearchButton()" icon="pi pi-search" class="ml-4" label="Найти"/>
    </div>
  </template>
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
  <Column class="w-24 !text-end" header="Действия">
    <template #body = "{ data }">
      <div class="flex justify-between gap-2">
        <Button icon="pi pi-times-circle" @click="openPopupConfirm($event, data)" severity="secondary" rounded/>
        <Button icon="pi pi-file-edit" @click="selectRow(data)" severity="secondary" rounded/>
      </div>
    </template>
  </Column>
  <template #footer>
    <div class="flex justify-center">
      <Button type="button" @click="this.$router.push('/createGroup')" icon="pi pi-plus" label="Добавить группу" />
    </div>
  </template>
  </DataTable>
  <ConfirmPopup></ConfirmPopup>
  <Toast></Toast>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ConfirmPopup from "primevue/confirmpopup";
import {useDataStore} from '@/stores/dataStore';
import Toast from 'primevue/toast';

export default {
  name: "Groups",
  components: { DataTable, Column, Button, InputText, ConfirmPopup, Toast },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      page: 0,
      offset: 0,
      search: "",
      defaultImage: 'https://storage.yandexcloud.net/nifty-db/groups_pictures/nifty-default-group.png'
    }
  },
  computed: {
    groups() {
      return this.dataStore.groups;
    },
    groups_total() {
      return this.dataStore.groups_total;
    },
    error_code() {
      return this.dataStore.errorCode;
    },
    error_message() {
      return this.dataStore.errorMessage;
    },
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
    },
    onPushSearchButton(event) {
      this.dataStore.get_groups_total(this.search);
      this.dataStore.get_groups(undefined, undefined, this.search);
    },
    openPopupConfirm(event, data) {
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить запись ' + data.id + '?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Да',
        rejectLabel: 'Нет',
        accept: () => {
          this.deleteGroup(data.id);
        },
      })
    },
    selectRow(data) {
      this.$router.push(`/createGroup/${data.id}`)
    },
    async deleteGroup(id) {
      await this.dataStore.delete_group(id);
      if (this.error_code > 0)
        this.$toast.add({severity: 'error', summary: 'Ошибка удаления категории ' +
          id, detail: this.error_message + " (код: " + this.error_code + ")", life: 4000});
      else
        this.$toast.add({severity: 'success', summary: 'Группа ' +
          id + " успешно удалена", detail: this.error_message, life: 4000});

      this.dataStore.get_groups(this.offset/this.perpage, this.perpage, this.search);
    },
  }
}
</script>
<style scoped>
</style>
