<template>
  <div>

  </div>
</template>

<script>
export default {
  methods: {
    listenForEvents() {
      this.$store.state.drizzle.drizzleInstance.contracts['ItemManager']
          .events.SupplyChainStep().on('data', async function(e) {
            console.log(e)
      })
    }
  },
  created() {
    this.listenForEvents()
  }
}
</script>

<style scoped>

</style>