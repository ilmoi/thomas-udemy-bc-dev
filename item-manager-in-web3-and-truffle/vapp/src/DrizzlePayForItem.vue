<template>
  <div>
    <form>
      <input v-model="itemIndex" type="text"/>
      <input v-model="paymentWei" type="text"/>
      <button @click.prevent="onSubmit(paymentWei)">Pay for item item</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemIndex: 0,
      paymentWei: 321,
      myAddress: '0xF429B1D00678b9e60536F832E312f38B593E8b3c',
    }
  },
  methods: {
    async onSubmit(value=null) {
      const txObj = {
        from: this.myAddress,
        gasPrice: '20', //optional
        gas: 5000000, //optional
        value: value, //optional
      }

      const state = this.$store.state
      const stackId = await state //turns out I can use the actual store object instead of mapGetters...
          .drizzle
          .drizzleInstance
          .contracts['ItemManager']
          .methods['triggerPayment']
          .cacheSend(this.itemIndex, txObj)
      console.log(stackId)
    }
  },
}
</script>

<style scoped>
</style>