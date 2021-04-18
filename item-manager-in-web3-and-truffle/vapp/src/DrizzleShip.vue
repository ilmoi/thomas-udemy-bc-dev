<template>
  <div>
    <form>
      <input v-model="itemIndex" type="text"/>
      <button @click.prevent="onSubmit">Ship it!!</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemIndex: 0,
    }
  },
  methods: {
    async onSubmit() {
      const state = this.$store.state
      const stackId = await state //turns out I can use the actual store object instead of mapGetters...
          .drizzle
          .drizzleInstance
          .contracts['ItemManager']
          .methods['triggerDelivery']
          .cacheSend(this.itemIndex)
      console.log(stackId)
    }
  },
}
</script>

<style scoped>
</style>