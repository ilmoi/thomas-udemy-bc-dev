import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

//functions available in drizzle vue-plugin: https://github.com/trufflesuite/drizzle/blob/develop/packages/vue-plugin/README.md
//but we can also define our own: https://www.youtube.com/watch?v=ApJwXfWKl7Q
import drizzleVuePlugin from '@drizzle/vue-plugin'
import drizzleOptions from './drizzleOptions'

//so initially we define the store as empty...
Vue.use(Vuex)
const store = new Vuex.Store({ state: {} })

//but I see we use it for the drizzle plugin so I imagine drizzle populates the store
//yah - so "Drizzle is a Smart Contract Store with a subscription and mutation API that abstracts away the boilerplate for reading and writing smart contract state as well as listening for contract events." - https://www.trufflesuite.com/blog/drizzle-vue-a-truffle-story
//drizzle in detail - https://www.youtube.com/watch?v=QH_yLPYQEs4
Vue.use(drizzleVuePlugin, { store, drizzleOptions })

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
