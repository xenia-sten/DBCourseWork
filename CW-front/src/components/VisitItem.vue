<template>
  <div class="visit">
    <div>
      <div>{{ visit.id }}</div>
      <div><strong>Дата:</strong> {{ visitDate }}</div>
      <div><strong>Клиент:</strong> {{ clientName }}</div>
      <div><strong>Услуга:</strong> {{ templateName }}</div>
      <div><strong>Описание:</strong> {{ visit.description }}</div>
      <div><strong>Дата создания:</strong> {{ createDate }}</div>
    </div>
    <div class="visit__btns">
      <!-- <my-button @click="$router.push(`/posts/${post.id}`)">
        Открыть
      </my-button> -->
      <my-button @click="$emit('remove', visit)"> Удалить </my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "./UI/MyButton.vue";
import ClientService from "../services/client.service";
import TemplateService from "../services/template.service";
import { format } from "../../node_modules/@formkit/tempo";

export default {
  components: { MyButton },
  props: {
    visit: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      clientName: "",
      templateName: "",
      visitDate: "",
      createDate: "",
    };
  },

  mounted() {
    this.visitDate = format({
      date: this.visit.visit_date,
      format: "HH:mm DD-MM-YYYY",
      tz: "Europe/Samara",
    });
    this.createDate = format({
      date: this.visit.creation_date,
      format: "HH:mm DD-MM-YYYY",
      tz: "Europe/Samara",
    });
    ClientService.getClient(this.visit.client_id).then(
      (response) => {
        this.clientName = response.data.name;
      },
      (error) => {
        this.client =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    TemplateService.getTemplate(this.visit.template_id).then(
      (response) => {
        this.templateName = response.data.name;
      },
      (error) => {
        this.templateName =
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
.visit {
  padding: 15px;
  border: 2px solid teal;
  border-radius: 5px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.visit__btns {
  display: flex;
}
</style>