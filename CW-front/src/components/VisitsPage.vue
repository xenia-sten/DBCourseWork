<template>
  <div>
    <h1>Страница с визитами</h1>
    <div class="visits__btns">
      <my-button @click="showDialog"> Создать визит </my-button>
    </div>
    <my-dialog :show="dialogVisible">
      <visit-form
        @create="createVisit"
      />
    </my-dialog>
    <div class="container">
      <visit-list :visits="visits" @remove="removeVisit" />
      <!-- <div v-else>Идет загрузка...</div> -->
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import VisitList from "./VisitList.vue";
import MyDialog from "./UI/MyDialog.vue";
import VisitForm from "./VisitForm.vue";
import MyButton from "./UI/MyButton.vue";

export default {
  components: { VisitList, VisitForm, MyDialog, MyButton },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Visits",
  data() {
    return {
      visits: [],
      isVisitsLoading: false,
      dialogVisible: false,
    };
  },
  methods: {
    createVisit(visit) {
      this.visits.push(visit);
      this.dialogVisible = false;
    },
    removeVisit(visit) {
      this.visits = this.visits.filter((v) => v.id !== visit.id);
    },
    showDialog() {
      this.dialogVisible = true;
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