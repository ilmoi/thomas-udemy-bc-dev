<template>
  <div>
    <p>Item details: {{ itemDetails }}</p>
    <form>
      <input type="text" v-model="itemNr"/>
      <button @click.prevent="onSubmit">Get item details</button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      itemNr: 0,
      itemDetails: null,
    }
  },
  computed: {
    ...mapGetters('contracts', ['getContractData']),
  },
  methods: {
    async onSubmit() {
      await this.prepContract() //SEE THIS IS WHERE WE NEED TO REINSTANTIATE THE CONTRACT, WHICH IS NOT POSSIBLE USING VUE-PLUGIN
      this.itemDetails = await this.getContractData({
        contract: 'ItemManager',
        method: 'items',
      })
    },
    async prepContract() {
      await this.$store.dispatch('drizzle/REGISTER_CONTRACT', {
      contractName: 'ItemManager',
      method: 'items',
      methodArgs: [this.itemNr]})
    }
  },
  async created() {
    await this.prepContract()
  }

}
</script>

<style scoped>
</style>