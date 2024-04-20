<template>
  <form @submit.prevent>
    <h4>Создание визита</h4>
    <my-input
      v-focus
      v-model="visit.company_id"
      type="text"
      placeholder="Компания"
    />
    <my-input v-model="visit.template_id" type="text" placeholder="Услуга" />
    <my-input v-model="visit.client_id" type="text" placeholder="Клиент" />
    <my-input
      v-model="visit.visit_date"
      type="text"
      placeholder="Дата посещения"
    />
    <my-input v-model="visit.description" type="text" placeholder="Описание" />
    <my-button
      style="align-self: flex-end; margin-top: 15px"
      @click="createVisit"
    >
      Создать
    </my-button>
  </form>
</template>

<script>
import MyButton from "./UI/MyButton.vue";
import MyInput from "./UI/MyInput.vue";
import { parse } from "../../node_modules/@formkit/tempo";

export default {
  components: {
    MyButton,
    MyInput,
  },
  data() {
    return {
      visit: {
        company_id: "",
        template_id: "",
        client_id: "",
        visit_date: "",
        description: "",
      },
    };
  },
  methods: {
    createVisit() {
      this.$emit("create", this.visit);
      this.visit = {
        company_id: "",
        template_id: "",
        client_id: "",
        visit_date: "",
        description: "",
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>