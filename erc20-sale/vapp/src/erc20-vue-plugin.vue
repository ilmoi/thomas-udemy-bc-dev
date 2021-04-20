<template>
  <div v-if="isDrizzleInitialized">
    <drizzle-contract
      contractName="MyErc20"
      method="totalSupply"
      label="Total"
    />
    <drizzle-contract
      contractName="MyErc20"
      method="symbol"
      label="Symbol"
    />

    <input type="text" v-model="contractAddress"/>
    <drizzle-contract
      contractName="MyErc20"
      method="balanceOf"
      label="Your Balance"
      :methodArgs="[contractAddress]"
    />

    <drizzle-contract-form
      contractName="MyErc20"
      method="transfer"
      :placeholders="placeholders"
    />
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      contractAddress: null,
    }
  },
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
    ...mapGetters('drizzle', ['isDrizzleInitialized']),

    accounts() {
      return [this.activeAccount]
    },

    placeholders() {
      return ['To Address', 'Amount to Send']
    }
  },
  created() {
    this.contractAddress = this.activeAccount
  }
}
</script>

<style></style>
