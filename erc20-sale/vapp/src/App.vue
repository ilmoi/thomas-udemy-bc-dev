<template>
  <div v-if="isDrizzleInitialized" id="app">
    <img alt="Vue logo" src="./assets/logo.png"/>

  <Erc20web3/>

  </div>

  <div v-else>Loading...</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Erc20web3 from "@/erc20-web3";

export default {
  components: {
    Erc20web3,
  },
  computed: mapGetters('drizzle', ['isDrizzleInitialized'])
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
