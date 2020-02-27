<template>
    <div id="Demo">
        <DynamicForms :theme="'light'" v-model="form" />
        <pre>
            <code>{{form}}</code>
        </pre>
    </div>
</template>

<script>
import DynamicForms from '../plugins/dynamicForms'

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

<style lang="scss" scoped>
#Demo{
  max-width: 700px;
  margin : 50px auto;
}
</style>