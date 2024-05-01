<!-- eslint-disable vue/no-mutating-props -->
<template>
  <select v-bind="modelValue" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option
      v-for="option in options"
      :key="option.id"
      :value="option.id"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: { //поле по кторому будет идти сортировка / выбранная компания
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>

</style>