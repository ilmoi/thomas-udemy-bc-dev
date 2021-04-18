<template>
  <div v-if="isDrizzleInitialized">
    <div>
      <drizzle-contract
        contractName="Simple"
        method="count"
        label="Ze count"
      />
      <drizzle-contract-form
        contractName="Simple"
        method="incr"
        :placeholders="[]"
      />
      <drizzle-contract-form
        contractName="Simple"
        method="setCount"
        :placeholders="['new count']"
      />
    </div>
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Simple',

  computed: mapGetters('drizzle', ['isDrizzleInitialized'])
}
</script>

<style></style>
