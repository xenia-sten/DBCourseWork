<template>
  <div class="list row">
    <div class="col-md-4">
      <br />
      <h4>Специализация:</h4>
      <my-button id="btn-add-job" @click="showDialogCreateJob">
        Создать
      </my-button>
      <!-- eslint-disable -->
      <my-dialog v-model:show="visibleCreateJob">
        <job-create-form @create="createJob" />
      </my-dialog>
      <ul class="list-group" v-if="this.jobs.length > 0">
        <li
          class="jobItem list-group-item"
          :class="{ active: id == currentIdJob }"
          v-for="(job, id) in jobs"
          :key="job.id"
          @click="setActiveJob(job, currentIdJob)"
        >
          {{ job.name }}
          <button class="badge badge-danger mr-2" @click="removeJob(job)">
            Delete
          </button>
        </li>
      </ul>
      <h5 v-else style="color: red">Список специализаций пуст</h5>
    </div>
    <div class="categList col-md-4">
      <div v-if="currentJob">
        <h5>Список категорий:</h5>
        <my-button id="btn-add-job" @click="showDialogCreateCateg">
          Создать
        </my-button>
        <!-- eslint-disable -->
        <my-dialog v-model:show="visibleCreateCategory">
          <category-form @create="createCategory" />
        </my-dialog>
        <ul class="list-group" v-if="this.categories.length > 0">
          <li
            class="jobItem list-group-item"
            :class="{ active: id == currentIdCategory }"
            v-for="(category, id) in categories"
            :key="category.id"
            @click="setActiveCategory(category, currentIdCategory)"
          >
            {{ category.name }}
            <button
              class="badge badge-danger mr-2"
              @click="removeCategory(category)"
            >
              Delete
            </button>
          </li>
        </ul>
        <h5 v-else style="color: red">Список специализаций пуст</h5>
      </div>
    </div>
    <div class="categList col-md-4">
      <div v-if="currentCategory">
        <h5>Список услуг:</h5>
        <my-button id="btn-add-job" @click="showDialogCreateService">
          Создать
        </my-button>
        <!-- eslint-disable -->
        <my-dialog v-model:show="visibleCreateService">
          <service-form @create="createService" />
        </my-dialog>
        <ul class="list-group" v-if="this.services.length > 0">
          <li
            class="jobItem serviceItem list-group-item"
            v-for="service in services"
            :key="service.id"
          >
            <p><b>Название: </b>{{ service.name }}</p>
            <p><b>Цена: </b>{{ service.price }}</p>
            <p><b>Длительность: </b>{{ `${service.duration.hours ?? '0'}:${service.duration.minutes ?? '00'}` }}</p>
            <p><b>Описание: </b>{{ service.description }}</p>
            <router-link
              :to="'/services/' + service.id"
              class="badge badge-warning"
              >Edit</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import MyButton from "../UI/MyButton.vue";
import MyDialog from "../UI/MyDialog.vue";
import JobCreateForm from "../JobCreateForm.vue";
import jobsServices from "@/services/jobs.services";
import categoryServices from "@/services/category.services";
import CategoryForm from "../CategoryForm.vue";
import ServiceForm from '../ServiceForm.vue';
import templateService from "@/services/template.service";

export default {
  components: { MyButton, MyDialog, JobCreateForm, CategoryForm, ServiceForm },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Services",
  data() {
    return {
      visibleCreateJob: false,
      visibleCreateCategory: false,
      visibleCreateService: false,
      jobs: [],
      currentJob: null,
      currentIdJob: -1,
      categories: [],
      currentCategory: null,
      currentIdCategory: -1,
      services: [],
      parseDuration: '',
    };
  },

  methods: {
    getJobsByUser() {
      userService
        .getJobsByUser(this.currentUser.id)
        .then((response) => {
          this.jobs = response.data;
        })
        .catch((e) => console.log(e));
    },
    getCategoriesByJob() {
      jobsServices
        .getCategoriesByJob(this.currentJob.id)
        .then((response) => {
          this.categories = response.data;
        })
        .catch((e) => console.log(e));
    },
    getServicesByCategory() {
      categoryServices
        .getTemplByCategory(this.currentCategory.id)
        .then((response) => {
          this.services = response.data;
        })
        .catch((e) => console.log(e));
    },

    createJob(job) {
      var data = {
        user_id: this.currentUser.id,
        name: job.name,
      };
      jobsServices
        .addJob(data)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
      this.visibleCreateJob = false;
    },
    createCategory(category) {
      var data = {
        name: category.name,
        job_id: this.currentJob.id,
      };
      categoryServices
        .addCategory(data)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
      this.visibleCreateCategory = false;
    },
    createService(service){
      var data = {
        category_id: this.currentCategory.id,
        name: service.name,
        price: service.price,
        duration: service.duration,
        description: service.description
      };
      templateService.addTempalte(data).then(
        (response) => {
          console.log(response);
        }
      ).catch(e => console.log(e));
      this.getServicesByCategory();
      this.visibleCreateService = false;
    },

    removeJob(job) {
      jobsServices
        .deleteJob(job.id)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
      this.getJobsByUser();
    },
    removeCategory(category) {
      categoryServices
        .deleteCategory(category.id)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
    },

    setActiveJob(job, currentIdJob) {
      this.currentJob = job;
      this.currentId = job ? currentIdJob : -1;
      this.getCategoriesByJob();
    },
    setActiveCategory(category, currentIdCategory) {
      this.currentCategory = category;
      this.currentIdCategory = category ? currentIdCategory : -1;
      this.getServicesByCategory();
    },

    showDialogCreateJob() {
      this.visibleCreateJob = true;
    },
    showDialogCreateCateg() {
      this.visibleCreateCategory = true;
    },
    showDialogCreateService() {
      this.visibleCreateService = true;
    },
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {
    this.getJobsByUser();
  },
};
</script>

<style scoped>
.list {
  text-align: left;
  margin: auto;
}
.jobItem {
  border: 2px solid #343A40;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: static;
}
.serviceItem{
  flex-direction: column;
  align-items: flex-start;
}
.lists {
  display: flex;
}
.categList {
  margin-top: 27px;
}
#btn-add-job {
  margin-bottom: 15px;
}
</style>