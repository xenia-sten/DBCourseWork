<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ curUser.name }}</strong> Profile
      </h3>
    </header>
    <!-- <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p> -->
    <p>
      <strong>Email:</strong>
      {{ curUser.email }}
    </p>
    <p>
      <strong>Phone number:</strong>
      {{ curUser.phone_number }}
    </p>
    <strong>Roles:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
    </ul>
    <button class="badge badge-warning" @click="showDialog">Edit</button>
    <!-- eslint-disable -->
    <my-dialog v-model:show="dialogVisible">
      <user-form @update="updateUser" />
    </my-dialog>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import UserForm from "../UserForm.vue";
import MyDialog from '../UI/MyDialog.vue';

export default {
  components: { UserForm, MyDialog },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Profile",

  data() {
    return {
      curUser: {},
      dialogVisible: false,
    };
  },

  methods: {
    updateUser(user) {
      const data = {
        name: user.name,
        email: user.email,
        phone_number: user.phone_number
      };
      userService.updateUser(this.currentUser.id, data).then(
        (response) => {
          console.log(response);
        }
      ).catch(e => console.log(e));
      this.dialogVisible = false;
      this.getCurUser();
    },

    showDialog() {
      this.dialogVisible = true;
    },

    getCurUser(){
      userService
      .getUserById(this.currentUser.id)
      .then((response) => {
        this.curUser = response.data;
      })
      .catch((e) => console.log(e));
    },
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }

    this.getCurUser();
  },
};
</script>
