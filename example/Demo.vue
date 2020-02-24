<template>
  <div id="app">
    <DynamicForms :theme="'light'" v-model="form" />
    <pre>
      <code>{{form}}</code>
    </pre>
  </div>
</template>

<script>
import DynamicForms from '../src/components/DynamicForms.vue'

const state = {
  date1: new Date()
}

export default {
  name: 'demo',
  components: {
    DynamicForms
  },
  data () {
    return {
      form : {},
    }
  }
}
</script>

<style>
@import url('https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css');
</style>
