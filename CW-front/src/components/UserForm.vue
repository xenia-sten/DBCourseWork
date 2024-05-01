<template>
  <div class="edit-form">
    <h4>Изменить пользователя:</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <my-input
          type="text"
          class="form-control"
          id="name"
          v-model="user.name"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <my-input
          type="text"
          class="form-control"
          id="email"
          v-model="user.email"
        />
      </div>
      <div class="form-group">
        <label for="phone_number">Phone-number</label>
        <my-input
          type="text"
          class="form-control"
          id="phone_number"
          v-model="user.phone_number"
        />
      </div>
    </form>

    <button type="submit" class="badge badge-success" @click="updateUser">
      Update
    </button>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import MyInput from "./UI/MyInput.vue";
export default {
  components: { MyInput },
  data() {
    return {
      user: {},
    };
  },

  methods: {
    updateUser(){
      this.$emit("update", this.user);
    },
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {
    userService.getUserById(this.currentUser.id).then(
      (response) => {
        this.user = response.data;
      }
    ).catch(e => console.log(e));
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>