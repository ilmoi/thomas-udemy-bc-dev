<!--
Reminder:
in drizzle to create a view component we need to:
1. create a hook to drizzle/REGISTER_CONTRACT
2. use getContractData to build a computed property that we'll display
-->

<template>
  <div>
    <p>Contract data: {{ contractData }}</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

// we define the contract & method we care about
const args = {
  contractName: 'SimpleStorage',
  method: 'storedData',
  methodArgs: '' //our fn doesn't take any args
}

export default {
  name: 'SimpleStorageMANUAL',
  computed: {
    // we pull the getContractData method from vuex's drizzle store
    ...mapGetters('contracts', ['getContractData']),

    // we computer a variable called contractData that we'll display in html above
    // we use the getContractData method we just pulled to do that
    contractData() {
      return this.getContractData({
        contract: args.contractName,
        method: args.method,
      })
    }
  },
  created() {
    // we call an "action" called REGISTER_CONTACT from drizzle
    // needed for drizzle to watch our function properly
    this.$store.dispatch('drizzle/REGISTER_CONTRACT', args)
  }

}
</script>

<style scoped>

</style>