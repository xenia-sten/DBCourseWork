<template>
  <div class="list row">
    <div class="col-md-3">
      <br />
      <h4>Список компаний:</h4>
      <my-button id="btn-add-company" @click="showDialog"> Создать </my-button>
      <!-- eslint-disable -->
      <my-dialog v-model:show="dialogVisible">
        <company-form @create="createCompany" />
      </my-dialog>
      <ul class="list-group" v-if="this.companies.length > 0">
        <li
          class="companyItem list-group-item"
          :class="{ active: id == currentId }"
          v-for="(company, id) in companies"
          :key="company.id"
          @click="setActiveCompany(company, currentId)"
        >
          {{ company.name }}
        </li>
      </ul>
      <h5 v-else style="color: red">Список компаний пуст</h5>
    </div>
    <div class="col-md-9">
      <br />
      <div v-if="currentCompany">
        <h4>Выбранная компания</h4>
        <div>
          <label><strong>Name: </strong></label> {{ currentCompany.name }}
        </div>
        <div>
          <label><strong>Description: </strong></label>
          {{ currentCompany.description }}
        </div>
        <div class="container lists">
          <user-list
            class="usList"
            :users="users"
            @remove="removeUser"
            @create="bindUserWithCompanyId"
          ></user-list>
          <client-list :clients="clients"></client-list>
        </div>
        <!-- <router-link :to="'/tutorials/' + currentTutorial.id" class="badge badge-warning">Edit</router-link> -->
      </div>
      <div v-else>
        <br />
        <p>Please click on a Company...</p>
      </div>
    </div>
  </div>
</template>

<script>
import companyService from "@/services/company.service";
import UserList from "../UserList.vue";
import ClientList from "../ClientList.vue";
import userService from "@/services/user.service";
import MyButton from "../UI/MyButton.vue";
import MyDialog from "../UI/MyDialog.vue";
import CompanyForm from "../CompanyForm.vue";

export default {
  components: { UserList, ClientList, MyButton, MyDialog, CompanyForm },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Companies",
  data() {
    return {
      companies: [],
      currentCompany: null,
      currentId: -1,
      users: [],
      clients: [],
      dialogVisible: false,
    };
  },

  methods: {
    getAllCompanies() {
      userService.getCompaniesByUser(this.currentUser.id).then(
        (response) => {
          this.companies = response.data;
          if (response.status == 404) {
            this.companies = [];
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    setActiveCompany(company, currentId) {
      this.currentCompany = company;
      this.currentId = company ? currentId : -1;
      console.log(this.currentCompany);
      this.getUsersByCompId(company.id);
      this.getClients(company.id);
    },

    getUsersByCompId(currentId) {
      companyService.getUsersByCompanyId(currentId).then(
        (response) => {
          this.users = response.data;
        },
        (error) => {
          this.users =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },

    getClients(currentId) {
      companyService.getClientsByCompany(currentId).then(
        (response) => {
          this.clients = response.data;
          if (response.status == 404) {
            this.clients = [];
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    showDialog() {
      this.dialogVisible = true;
    },

    createCompany(company) {
      var data = {
        name: company.name,
        description: company.description,
      };
      companyService
        .createCompany(data)
        .then((response) => {
          console.log(response.data);
          this.bindUserWithCompany(this.currentUser.id, response.data.id);
        })
        .catch((error) => console.log(error));
      this.dialogVisible = false;
    },

    bindUserWithCompanyId(user){
      this.bindUserWithCompany(user.id, this.currentCompany.id);
    },

    bindUserWithCompany(userId, companyId) {
      companyService
        .addUserInCompany(userId, companyId)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
    },

    removeUser(user){
      companyService.deleteUserInCompany(user.id, this.currentCompany.id).then(
        (response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
        this.users = this.users.filter((v) => v.id !== user.id);
    },
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {
    this.getAllCompanies();
  },
};
</script>

<style scoped>
.list {
  text-align: left;
  margin: auto;
}
.companyItem {
  border: 2px solid teal;
  border-radius: 5px;
}
.lists {
  display: flex;
}
.usList {
  margin-top: 0px;
}
</style>