<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <div class="col-md-6">
      <div class="container">
        <ul class="list-group">
          <li
            class="userItem list-group-item"
            v-for="user in usersWO"
            :key="user.id"
          >
            {{ user.name }}
            <button
              class="badge badge-danger mr-2"
              @click="removeUser(user)"
              v-if="user.id !== this.currentUser.id"
            >
              Удалить
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Admin",
  data() {
    return {
      content: "",
      usersWO: [],
    };
  },

  methods: {
    removeUser(user) {
      UserService.deleteUser(user.id)
        .then((response) => console.log(response))
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
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    UserService.getAllUsers()
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
  border: 2px solid #343a40;
  border-radius: 5px;
  min-width: 300px;
  position: static;
}
</style>