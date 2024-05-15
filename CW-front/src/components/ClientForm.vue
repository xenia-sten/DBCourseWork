<template>
  <form @submit.prevent>
    <h4>Создание клиента</h4>
    <select v-model="client.company_id">
      <option disabled value="">Выберите компанию</option>
      <option
        v-for="company in companyByUser"
        :key="company.id"
        :value="company.id"
      >
        {{ company.name }}
      </option>
    </select>
    <my-input v-model="client.name" type="text" placeholder="Имя" />
    <my-input v-model="client.email" type="text" placeholder="Email" />
    <my-input v-model="client.phone_number" type="text" placeholder="Номер телефона" />
    <my-input v-model="client.description" type="text" placeholder="Описание" />
    <my-button
      style="align-self: flex-end; margin-top: 15px"
      @click="createClient"
    >
      Создать
    </my-button>
  </form>
</template>

<script>
import UserService from "@/services/user.service";
import MyButton from "./UI/MyButton.vue";
import MyInput from "./UI/MyInput.vue";

export default {
  components: { MyButton, MyInput},
  data() {
    return {
      client: {
        company_id: "",
        email: "",
        phone_number: "",
        name: "",
        description: '',
      },
      companyByUser: [],
    };
  },

  methods: {
    createClient() {
      this.$emit("create", this.client);
      this.client = {
        company_id: "",
        email: "",
        phone_number: "",
        name: "",
        description: '',
      };
    },
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {
    UserService.getCompaniesByUser(this.currentUser.id).then(
      (response) => {
        this.companyByUser = response.data;
        console.log(this.companyByUser);
      },
      (error) => {
        this.companyByUser =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
select {
  width: 100%;
  border: 1px solid #343A40;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>