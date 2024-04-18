<template>
  <div class="container">
    <visit-list 
    :visits="visits" 
    @remove="removeVisit" 
    />
    <!-- <div v-else>Идет загрузка...</div> -->
  </div>
</template>

<script>
import UserService from "../services/user.service";
import VisitList from "./VisitList.vue";

export default {
  components: { VisitList },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Visits",
  data() {
    return {
      visits: [],
      isVisitsLoading: false,
    };
  },
  methods: {
    removeVisit(visit){
      this.visits = this.visits.filter(v => v.id !== visit.id);
    }
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
