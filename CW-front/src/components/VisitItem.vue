<template>
  <div class="visit">
    <div>
      <div><strong>Мастер:</strong> {{ userMaster }}</div>
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
import ClientOldService from "../services/client_old.service";
import TemplateService from "../services/template.service";
import { format } from "../../node_modules/@formkit/tempo";
import userService from "@/services/user.service";
import userOldService from "@/services/user-old.service";
import templateOldService from "@/services/template_old.service";

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
      userMaster: "",
    };
  },

  methods: {
    getClientName() {
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
    },
    getClientOldName() {
      ClientOldService.getClientOld(this.visit.client_old_id).then(
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
    },

    getUserName() {
      userService.getUserById(this.visit.user_id).then(
        (response) => {
          this.userMaster = response.data.name;
        },
        (error) => {
          this.userName =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    getUserOldName() {
      userOldService.getUserOldById(this.visit.user_old_id).then(
        (response) => {
          this.userMaster = response.data.name;
        },
        (error) => {
          this.userName =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },

    getTempName() {
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
    getTempOldName() {
      templateOldService.getTemplateOld(this.visit.template_old_id).then(
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

    if (this.visit.client_id == null) {
      this.getClientOldName();
    } else {
      this.getClientName();
    }

    if (this.visit.user_id == null) {
      this.getUserOldName();
    } else {
      this.getUserName();
    }

    if (this.visit.template_id == null) {
      this.getTempOldName();
    } else {
      this.getTempName();
    }
  },
};
</script>

<style scoped>
.visit {
  padding: 15px;
  border: 2px solid #343A40;
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