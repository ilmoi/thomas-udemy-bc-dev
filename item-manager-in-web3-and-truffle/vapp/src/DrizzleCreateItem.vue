<template>
  <div>
    <form>
      <input v-model="itemId" type="text"/>
      <input v-model="itemCost" type="text"/>
      <button @click.prevent="onSubmit">Create item</button>
    </form>
  </div>
</template>

<script>
// import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      itemId: 0,
      itemCost: 321,
    }
  },
  // computed: {
  //   ...mapGetters('drizzle', ['drizzleInstance'])
  // },
  methods: {
    async onSubmit() {
      // get store's state
      const state = this.$store.state
      console.log(state)

      // perform the transaction
      const stackId = await state //turns out I can use the actual store object instead of mapGetters...
        .drizzle
        .drizzleInstance
        .contracts['ItemManager']
        .methods['createItem']
        .cacheSend(this.itemId, this.itemCost)

      //WEB3 method which works
      // const ret_val = await state
      //   .drizzle
      //   .drizzleInstance
      //   .contracts['ItemManager']
      //   .methods['createItem'](this.itemId, this.itemCost)
      //   .send()
      //
      // console.log(ret_val)

      //DOESNT WORK
      //todo - https://github.com/trufflesuite/drizzle/issues/113
      // console.log(state.transactionStack)
      // Use the stackId to display the transaction status.
      // if (state.transactionStack[stackId]) {
      //     const txHash = state.transactionStack[stackId]
      //     console.log(txHash)
      //     console.log(state.transactions[txHash].status)
      //     return state.transactions[txHash].status
      // }
    }
  },
}
</script>

<style scoped>
</style>