<template>
  <div>
    <h1>Item Manager built with Vue plugin</h1>

    <!--
    todo Ok I've tried everything there is but can't make it work.
    Problem is that drizzle-contract registers the contract only during created()
    and when I change the argument, a new contract would have to be registered (the same function in created() needs to run)
    I tried reloading the component below, but no luck
    So the only viable approach is to rebuild it (2nd approach)
    -->

    <p>View an item</p>
    <input type="text" v-model="itemNr"/>
    <DrizzleContract :itemNr="itemNr.toString()"/>

    <p>Create item:</p>
    <drizzle-contract-form
        contract-name="ItemManager"
        method="createItem"
        :placeholders="['id', 'priceWei']"
    />

    <!--
    todo Can't make this one work either.
    I can't pass the value of ether that I'm sending, which is what I need for this to work.
    -->
    <p>Trigger payment:</p>
    <drizzle-contract-form
        contract-name="ItemManager"
        method="triggerPayment"
        :placeholders="['id']"
    />
    <p>Ship the item:</p>
    <drizzle-contract-form
        contract-name="ItemManager"
        method="triggerDelivery"
        :placeholders="['id']"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import DrizzleContract from './DrizzleVuePluginContract'
export default {
  components: {
    DrizzleContract,
  },
  data() {
    return {
      itemNr: 3
    }
  },
  computed: mapGetters('drizzle', ['isDrizzleInitialized']),
}
</script>

<style scoped>
</style>