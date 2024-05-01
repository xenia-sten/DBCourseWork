<template>
  <div v-if="client" class="edit-form">
    <h4>Client</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="client.name"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          v-model="client.email"
        />
      </div>
      <div class="form-group">
        <label for="phone_number">Phone-number</label>
        <input
          type="text"
          class="form-control"
          id="phone_number"
          v-model="client.phone_number"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="client.description"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deleteClient">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateClient">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import clientService from "@/services/client.service";

export default {
  name: "ClientPage",
  data() {
    return {
      client: null,
      message: "",
    };
  },

  methods: {
    getClintById(id) {
      clientService.getClient(id).then(
        (response) => {
          this.client = response.data;
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

    updateClient() {
      var data = {
        name: this.client.name,
        company_id: this.client.company_id,
        email: this.client.email,
        phone_number: this.client.phone_number,
        description: this.client.description,
      };
      clientService
        .updateClient(this.client.id, data)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteClient() {
      clientService
        .delClient(this.client.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "companies" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.message = "";
    this.getClintById(this.$route.params.id);
  },
};
</script>

<style>
</style>