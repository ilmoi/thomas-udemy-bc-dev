<!--here we're creating our own component in place of vue-plugin's "drizzle-acount"-->

<template>
  <div>
    <div>{{activeAccount}}</div>
    <div>{{activeBalance}} wei</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AccountMANUAL',
  computed: {
    //note: using the spread operator
    ...mapGetters('accounts', ['activeAccount', 'activeBalance'])
  }
}
</script>

<style scoped>

</style>