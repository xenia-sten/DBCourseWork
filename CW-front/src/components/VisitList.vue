<template>
  <div v-if="visits.length > 0">
    <h2>Список визитов:</h2>
    <visit-item
      v-for="visit in visits"
      :visit="visit"
      :key="visit.id"
      @remove="$emit('remove', visit)"
    />
  </div>
  <h2 v-else style="color: red">Список визитов пуст</h2>
</template>

<script>
import VisitItem from "./VisitItem.vue";

export default {
  components: { VisitItem },
  props: {
    visits: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>