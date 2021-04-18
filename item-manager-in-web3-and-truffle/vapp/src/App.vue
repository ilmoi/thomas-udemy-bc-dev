<template>
  <div v-if="isDrizzleInitialized" id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <!--most manual: web3-->
    <I_M_web3_version/>

    <!--middle of the road: drizzle-->
    <I_M_drizzle_version/>

    <!--most automated: vue plugin-->
    <I_M_drizzle_vue_plugin_version/>

    <!--event logging as per julian - https://www.youtube.com/watch?v=xyoztqeYd6U-->
    <Toast/>

    <!--event logging as per thomas - https://www.udemy.com/course/blockchain-developer/learn/lecture/17656080#overview-->
    <EventListener/>

  </div>

  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from 'vuex'
import I_M_web3_version from "@/I_M_web3_version";
import I_M_drizzle_vue_plugin_version from "@/I_M_drizzle_vue_plugin_version";
import I_M_drizzle_version from "@/I_M_drizzle_version";
import Toast from "@/Toast";
import EventListener from '@/EventListener'

export default {
  name: 'app',
  components: {
    I_M_web3_version,
    I_M_drizzle_vue_plugin_version,
    I_M_drizzle_version,
    Toast,
    EventListener,
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
