<template>
  <form @submit.prevent>
    <h4>Создание категории</h4>
    <my-input v-model="category.name" type="text" placeholder="Имя" />
    <my-button
      style="align-self: flex-end; margin-top: 15px"
      @click="createCategory"
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
      category: {
        job_id: "",
        name: "",
      },
    };
  },

  methods: {
    createCategory() {
      this.$emit("create", this.category);
      this.category = {
        job_id: "",
        name: "",
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