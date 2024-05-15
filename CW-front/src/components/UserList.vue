<template>
  <div class="list row">
    <div>
      <h5>Список участников:</h5>
      <my-button id="btn-add-user" @click="showAddUser">
        Добавить участника
      </my-button>
      <form @submit.prevent v-if="isVisibleAddUser" style="margin-top: 20px;">
        <h4>Добавить пользователя в компанию</h4>
        <my-input placeholder="Search by email" v-model="emailQuery" />
        <ul class="list-group" style="margin-top: 20px">
          <li
            class="userItem list-group-item"
            v-for="user in sortByEmailUsers"
            :key="user.id"
          >
            {{ user.name }} - {{ user.email }}
            <button
              @click="$emit('create', user)"
              class="badge badge-success"
              v-if="user.id !== this.currentUser.id"
              style="float: right"
            >
              Добавить
            </button>
          </li>
        </ul>
      </form>
      <ul class="list-group" v-else>
        <li
          class="userItem list-group-item"
          v-for="user in users"
          :key="user.id"
        >
          {{ user.name }}
          <button
            class="badge badge-danger mr-2"
            @click="$emit('remove', user)"
            v-if="user.id !== this.currentUser.id"
          >
            Удалить
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import MyButton from "./UI/MyButton.vue";
// import MyDialog from "./UI/MyDialog.vue";
// import UserForm from './UserForm.vue';
import MyInput from "./UI/MyInput.vue";

export default {
  // components: { MyButton, MyDialog, UserForm },
  components: { MyInput, MyButton },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // dialogVisible: false,
      isVisibleAddUser: false,
      usersWO: [],
      emailQuery: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    sortByEmailUsers() {
      return this.usersWO.filter((user) =>
        user.email.includes(this.emailQuery)
      );
    },
  },
  methods: {
    // showDialog() {
    //   this.dialogVisible = true;
    // },

    showAddUser() {
      if (this.isVisibleAddUser) {
        this.isVisibleAddUser = false;
        return;
      }
      this.isVisibleAddUser = true;
    },
  },
  mounted() {
    userService
      .getAllUsers()
      .then((response) => {
        this.usersWO = response.data;
      })
      .catch((e) => console.log(e));
  },
};
</script>

<style scoped>
.userItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #343A40;
  border-radius: 5px;
  min-width: 300px;
  position: static;
}
#btn-add-user {
  width: 200px;
  margin-bottom: 10px;
}
</style>