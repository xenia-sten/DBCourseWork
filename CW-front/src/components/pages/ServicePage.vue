<template>
  <div v-if="service" class="edit-form">
    <h4>Услуга</h4>
    <form>
      <div class="form-group">
        <label for="name">Название:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="service.name"
        />
      </div>
      <div class="form-group">
        <label for="price">Цена:</label>
        <input
          type="text"
          class="form-control"
          id="price"
          v-model="service.price"
        />
      </div>
      <div class="form-group">
        <label for="duration">Длительность</label>
        <input
          type="text"
          class="form-control"
          id="duration"
          v-model="parseDuration"
        />
      </div>
      <div class="form-group">
        <label for="description">Описание</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="service.description"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deleteService">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateService">
      Update
    </button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import templateService from "@/services/template.service";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "ServicePage",
  data() {
    return {
      service: null,
      message: "",
      parseDuration: '',
    };
  },
  methods: {
    getServiceById(id) {
      templateService
        .getTemplate(id)
        .then((response) => {
          this.service = response.data;
          this.parseDuration = `${this.service.duration.hours ?? '0'}:${this.service.duration.minutes ?? '00'}`;
        })
        .catch((e) => console.log(e));
        //
    },

    deleteService() {
      templateService
        .deleteTemplate(this.service.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "services" });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateService() {
      var data = {
        name: this.service.name,
        price: this.service.price,
        duration: this.parseDuration,
        category_id: this.service.category_id,
        description: this.service.description,
      };
      templateService
        .updateTemplate(this.service.id, data)
        .then((response) => {
          console.log(response.data);
          this.message = "The service was updated successfully!";
        })
        .catch((e) => console.log(e));
    },
  },

  mounted() {
    this.message = "";
    this.getServiceById(this.$route.params.id);
  },
};
</script>

<style>
</style>