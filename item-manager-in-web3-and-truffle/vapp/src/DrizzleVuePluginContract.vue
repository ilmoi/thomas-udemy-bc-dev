<template>
  <div>
    <drizzle-contract
        contract-name="ItemManager"
        method="items"
        :method-args="[itemNr.toString()]"
    />
    <button @click="onSubmit">refresh</button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  props: {
    itemNr: String,
  },
  computed: mapGetters('drizzle', ['isDrizzleInitialized']),
  methods: {
    onSubmit() {
      console.log('im being called')
      console.log(this.itemNr)
      this.$forceUpdate();
    }
  }
}
</script>

<style scoped>
</style>