<template>
  <form @submit.prevent>
    <h4>Создание услуги</h4>
    <my-input v-model="service.name" type="text" placeholder="Название" />
    <my-input v-model="service.price" type="text" placeholder="Цена" />
    <my-input v-model="service.duration" type="text" placeholder="Длительность" />
    <my-input v-model="service.description" type="text" placeholder="Описание" />
    <my-button
      style="align-self: flex-end; margin-top: 15px"
      @click="createService"
    >
      Создать
    </my-button>
  </form>
</template>

<script>
import MyButton from "./UI/MyButton.vue";
import MyInput from "./UI/MyInput.vue";

export default {
  components: { MyButton, MyInput },
  data() {
    return {
      service: {
        category_id: "",
        name: "",
        price: '',
        duration: "",
        description: "",
      },
    };
  },

  methods: {
    createService() {
      this.$emit("create", this.service);
      this.service = {
        category_id: "",
        name: "",
        price: '',
        duration: "",
        description: "",
      };
    },
  },

}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>