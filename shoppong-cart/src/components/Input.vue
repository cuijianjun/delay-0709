<template>
  <div>
    <input type="text" :value="value" @input="onInput">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Input',
  props:['value'],
  methods: {
    onInput(e) {
      let value = e.target.value;
      this.$emit('input')
    }
  },
}
</script>

<style scoped>

</style>
