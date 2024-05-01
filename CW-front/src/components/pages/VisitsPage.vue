<template>
  <div>
    <h1>Страница с визитами</h1>
    <div class="visits__btns">
      <my-button @click="showDialog"> Создать визит </my-button>
      <select v-model="selectedSort">
        <option disabled value="">Сортировать по</option>
        <option
          v-for="option in sortOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
    <!-- eslint-disable -->
    <my-dialog v-model:show="dialogVisible">
      <visit-form @create="createVisit" />
    </my-dialog>
    <div class="container">
      <visit-list
      :visits="visits"
      @remove="removeVisit" />
      <!-- <div v-else>Идет загрузка...</div> -->
    </div>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
import VisitList from "../VisitList.vue";
import MyDialog from "../UI/MyDialog.vue";
import VisitForm from "../VisitForm.vue";
import MyButton from "../UI/MyButton.vue";
import visitService from "@/services/visit.service";

export default {
  components: { VisitList, VisitForm, MyDialog, MyButton },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Visits",
  data() {
    return {
      visits: [],
      isVisitsLoading: false,
      dialogVisible: false,
      selectedSort: "",
      sortOptions: [
        { value: "visit_date", name: "По дате посещения" },
        { value: "creation_date", name: "По дате создания" },
      ],
    };
  },
  methods: {
    createVisit(visit) {
      visitService
        .createVisit({
          company_id: visit.company_id,
          user_id: visit.user_id,
          template_id: visit.template_id,
          client_id: visit.client_id,
          visit_date: visit.visit_date,
          description: visit.description,
        })
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            this.visits =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      this.visits.push(visit);
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
      this.visits = this.visits.filter((v) => v.id !== visit.id);
    },

    showDialog() {
      this.dialogVisible = true;
    },
  },
  watch: {
    selectedSort(newValue) {
      this.visits.sort((visit1, visit2) => {
        return visit1[newValue]?.localeCompare(visit2[newValue]);
      });
    },
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    UserService.getVisitsByUser(this.currentUser.id).then(
      (response) => {
        this.visits = response.data;
      },
      (error) => {
        this.visits =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
<style scoped>
.visits__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>