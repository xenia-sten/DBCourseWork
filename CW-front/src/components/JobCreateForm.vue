<template>
  <form @submit.prevent>
    <h4>Создание специализации</h4>
    <my-input v-model="job.name" type="text" placeholder="Имя" />
    <my-button
      style="align-self: flex-end; margin-top: 15px"
      @click="createJob"
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
      job: {
        user_id: "",
        name: "",
      },
    };
  },

  methods: {
    createJob() {
      this.$emit("create", this.job);
      this.job = {
        user_id: "",
        name: "",
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