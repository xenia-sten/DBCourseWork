<template>
  <div class="list row">
    <div>
      <h5>Список клиентов:</h5>
      <my-button id="btn-add-client" @click="showDialog"> Создать </my-button>
      <!-- eslint-disable -->
      <my-dialog v-model:show="dialogVisible">
        <client-form @create="createClient" />
      </my-dialog>
      <ul class="list-group" v-if="this.clients.length > 0">
        <li
          class="clientItem list-group-item"
          v-for="client in clients"
          :key="client.id"
        >
          {{ client.name }}
          <button class="badge badge-success" @click="showHistory(client)">
            History
          </button>
          <!-- eslint-disable -->
          <my-dialog v-model:show="historyVisible" class="client_dialog">
            <visit-list :visits="visitList" @remove="removeVisit" />
          </my-dialog>
          <router-link :to="'/clients/' + client.id" class="badge badge-warning"
            >Edit</router-link
          >
        </li>
      </ul>
      <h5 v-else style="color: red">Список клиентов пуст</h5>
    </div>
  </div>
</template>

<script>
import clientService from "@/services/client.service";
import ClientForm from "./ClientForm.vue";
import MyButton from "./UI/MyButton.vue";
import MyDialog from "./UI/MyDialog.vue";
import VisitList from "./VisitList.vue";
import visitService from "@/services/visit.service";

export default {
  components: { MyButton, MyDialog, ClientForm, VisitList },
  props: {
    clients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      historyVisible: false,
      visitList: [],
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    showHistory(client) {
      this.historyVisible = true;
      clientService
        .getVisitsByClientId(client.id)
        .then((response) => {
          this.visitList = response.data;
        })
        .catch((e) => console.log(e));
    },
    createClient(client) {
      var data = {
        company_id: client.company_id,
        name: client.name,
        email: client.email,
        phone_number: client.phone_number,
        description: client.descripiton,
      };
      clientService
        .createClient(data)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
      this.dialogVisible = false;
    },

    removeVisit(visit) {
      visitService.deleteVisit(visit.id).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          visit =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
      this.visitList = this.visitList.filter((v) => v.id !== visit.id);
    },
  },
};
</script>

<style>
.clientItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #343a40;
  border-radius: 5px;
  min-width: 300px;
  position: static;
}
#btn-add-client {
  width: 200px;
  margin-bottom: 10px;
}
.client_dialog {
  overflow-y: scroll;
}
</style>