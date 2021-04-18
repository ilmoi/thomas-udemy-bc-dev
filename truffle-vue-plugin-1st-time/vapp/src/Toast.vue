<template>
  <div>

  </div>
</template>

<script>
import Toasted from 'vue-toasted'
import Vue from 'vue'

Vue.use(Toasted)

export default {
  mounted() {
    const contractEventHandler = ({contractName, eventName, data}) => {
      const display = `${contractName}(${eventName}): ${data.newValue}, ${data.date}`
      const subOptions = {duration: 3000};
      this.$toasted.show(display, subOptions)
    }
    //available on every vue component because we initialized the drizzle vue plugin
    this.$drizzleEvents.$on('drizzle/contractEvent', payload => {
      contractEventHandler(payload);
    })
  }
}
</script>

<style scoped>

</style>