<template>
  <form @submit.prevent>
    <h4>Создание компании</h4>
    <my-input v-model="company.name" type="text" placeholder="Имя" />
    <my-input v-model="company.description" type="text" placeholder="Описание" />
    <my-button
      style="align-self: flex-end; margin-top: 15px"
      @click="createCompany"
    >
      Создать
    </my-button>
  </form>
</template>

<script>
import MyButton from "./UI/MyButton.vue";
import MyInput from "./UI/MyInput.vue";

export default {
  components: { MyButton, MyInput},

  data() {
    return {
      company: {
        name: "",
        description: '',
      },
    };
  },

  methods: {
    createCompany() {
      this.$emit("create", this.company);
      this.company = {
        name: "",
        description: '',
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