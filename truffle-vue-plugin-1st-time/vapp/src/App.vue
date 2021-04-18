<template>
  <div v-if="isDrizzleInitialized" id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <div class="section">
      <h2>Show the Accounts</h2>
      <drizzle-account units="Ether" :precision="2" />
    </div>

    <div class="section">
      <h2>Simple Storage</h2>
      <SimpleStorage />
    </div>

    <div class="section">
      <h2>Simple</h2>
      <Simple />
    </div>

    <!--MANUAL - ie we can replace the vue-plugin components with our own custom versions-->
    <div>
      <AccountMANUAL/>
      <SimpleStorageMANUAL/>
      <SimpleStorageFormMANUAL/>
    </div>

    <!--<div class="section">-->
    <!--  <h2>Tutorial Token</h2>-->
    <!--  <TutorialToken />-->
    <!--</div>-->

    <!--<div class="section">-->
    <!--  <h2>Complex Storage</h2>-->
    <!--  <ComplexStorage />-->
    <!--</div>-->
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import SimpleStorage from './SimpleStorage'
// import TutorialToken from './TutorialToken'
// import ComplexStorage from './ComplexStorage'
import { mapGetters } from 'vuex'
import Simple from "./Simple";
import AccountMANUAL from "@/Account_MANUAL";
import SimpleStorageMANUAL from "@/SimpleStorage_MANUAL";
import SimpleStorageFormMANUAL from "@/SimpleStorageForm_MANUAL";

export default {
  name: 'app',
  components: {
    AccountMANUAL,
    SimpleStorageFormMANUAL,
    SimpleStorageMANUAL,
    Simple,
    // ComplexStorage,
    // TutorialToken,
    SimpleStorage
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
