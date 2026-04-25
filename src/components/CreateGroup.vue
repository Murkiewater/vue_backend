<template>
  <div>
    <div class="flex justify-center">
      <form v-on:submit.prevent="saveGroup" class="w-1/2 p-6">
        <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">
          {{ isEdit ? 'Редактирование' : 'Добавление' }} группы
        </h2>

        <div class="flex flex-col">
          <inputText type="text" placeholder="Введите название" v-model="groupName"/>
        </div>
        <div class="mb-4 mt-4">
          <label for="file" id="file-label"
            class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2">
            <span class="pi pi-upload mx-3"></span>Выбрать изображение
          </label>
          <input type="file" hidden id="file" name="file"
            v-on:change="changeCaption" required accept="image/*">
        </div>

        <div class="flex flex-col mt-6">
          <Button type="submit" :label="isEdit ? 'Сохранить' : 'Создать'"></Button>
        </div>
      </form>
    </div>

    <Toast position="bottom-right"/>
  </div>
</template>
<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {useDataStore} from "@/stores/dataStore.js";
import Toast from "primevue/toast";

export default {
  name: "createGroup",
  components: {InputText, Button, Toast},
  data() {
    return {
      dataStore: useDataStore(),
      groupName: '',
      groupImage: null,
    }
  },
  watch: {
    groupId: {
      handler(newId) {
        if (newId) {
          const group = this.dataStore.groups.find(c => c.id == newId);
          if (group) {
            this.groupName = group.name;
            this.groupImage = null;
          }
        } else {
          this.groupName = '';
          this.groupImage = null;
        }
      },
      immediate: true
    }
  },
  computed: {
    errorMessage() {
      return this.dataStore.errorMessage
    },
    errorCode() {
      return this.dataStore.errorCode
    },
    isEdit() {
      return !!this.$route.params.id;
    },
    groupId() {
      return this.$route.params.id;
    },
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        document.getElementById('file-label').innerHTML = '<span class="pi pi-file mx-3"></span>' + file.name;
        this.groupImage = file;
      } else {
        document.getElementById('file-label').innerHTML = '<span class="pi pi-upload mx-3"></span>"Выбрать изображение';
        this.groupImage = null;
      }
    },
    async saveGroup() {
      const form_data = new FormData();
      form_data.append('name', this.groupName);
      if (this.groupImage) {
        form_data.append('image', this.groupImage);
      }
      if (this.isEdit) {
        await this.dataStore.update_group(form_data, this.groupId);
      } else {
        await this.dataStore.create_group(form_data);
      }
      if (this.errorCode > 0)
        this.$toast.add({severity:'error', summary: "Ошибка добавления данных", detail: this.errorMessage, life: 4000})
      else
        this.$toast.add({severity:'success', summary: "Данные успешно добавлены!", detail: this.errorMessage, life: 4000})
    }
  },
}
</script>
<style scoped>
</style>
