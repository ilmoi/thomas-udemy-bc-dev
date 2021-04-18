<template>
  <div>
    <form>
      <input v-model="value" type="text" placeholder="Value"/>
      <button @click.prevent="onSubmit">Let's go</button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'SimpleStorageFormMANUAL',
  computed: {
    ...mapGetters('drizzle', ['drizzleInstance'])
  },
  methods: {
    onSubmit() {
      this.drizzleInstance
        .contracts['SimpleStorage']
        .methods['set']
        .cacheSend(this.value)
    }
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style scoped>

</style>