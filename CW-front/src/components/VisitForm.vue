<template>
  <form @submit.prevent>
    <h4>Создание визита</h4>
    <select v-model="visit.company_id">
      <option disabled value="">Выберите компанию</option>
      <option
        v-for="company in companyByUser"
        :key="company.id"
        :value="company.id"
      >
        {{ company.name }}
      </option>
    </select>
    <select v-model="visit.client_id" @click="currClient">
      <option disabled value="">Выберите клиента</option>
      <option
        v-for="client in clientsByCompany"
        :key="client.id"
        :value="client.id"
      >
        {{ client.name }}
      </option>
    </select>
    <select v-model="job_id">
      <option disabled value="">Выберите должность</option>
      <option v-for="job in jobsByUser" :key="job.id" :value="job.id">
        {{ job.name }}
      </option>
    </select>
    <select v-model="category_id" @click="currCategory">
      <option disabled value="">Выберите категорию</option>
      <option
        v-for="category in categByUser"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <select v-model="visit.template_id" @click="currTemplate">
      <option disabled value="">Выберите услугу</option>
      <option
        v-for="template in templByCateg"
        :key="template.id"
        :value="template.id"
      >
        {{ template.name }}
      </option>
    </select>
    <my-input
      v-model="visit.visit_date"
      type="text"
      placeholder="Дата(HH:mm DD-MM-YYYY)"
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
import companyService from "@/services/company.service";
import MyButton from "./UI/MyButton.vue";
import MyInput from "./UI/MyInput.vue";
import UserService from "@/services/user.service";
import jobsServices from "@/services/jobs.services";
import categoryServices from "@/services/category.services";
import { parse } from "../../node_modules/@formkit/tempo";

export default {
  components: {
    MyButton,
    MyInput,
  },
  data() {
    return {
      visit: {
        user_id: "",
        company_id: "",
        template_id: "",
        client_id: "",
        visit_date: "",
        description: "",
      },
      job_id: "",
      category_id: "",
      companyByUser: [],
      clientsByCompany: [],
      jobsByUser: [],
      categByUser: [],
      templByCateg: [],
      currMaster: '',
    };
  },
  methods: {
    createVisit() {
      this.visit.visit_date = parse({
        date: this.visit.visit_date,
        format: "HH:mm DD-MM-YYYY",
        tz: "Europe/Samara",
      });
      this.$emit("create", this.visit);
      this.visit = {
        user_id: "",
        company_id: "",
        template_id: "",
        client_id: "",
        visit_date: "",
        description: "",
      };
    },
    currClient() {
      companyService.getClientsByCompany(this.visit.company_id).then(
        (response) => {
          this.clientsByCompany = response.data;
        },
        (error) => {
          this.clientsByCompany =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    currCategory() {
      jobsServices.getCategoriesByJob(this.job_id).then(
        (response) => {
          this.categByUser = response.data;
        },
        (error) => {
          this.categByUser =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    currTemplate() {
      categoryServices.getTemplByCategory(this.category_id).then(
        (response) => {
          this.templByCateg = response.data;
        },
        (error) => {
          this.templByCateg =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  watch: {
    
  },
  mounted() {
    UserService.getCompaniesByUser(this.currentUser.id).then(
      (response) => {
        this.companyByUser = response.data;
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
    UserService.getJobsByUser(this.currentUser.id).then(
      (response) => {
        this.jobsByUser = response.data;
      },
      (error) => {
        this.jobsByUser =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    UserService.getUserById(this.currentUser.id).then(
      (response) => {
        this.visit.user_id = response.data.id;
      },
      (error) => {
        this.visit.user_id =
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