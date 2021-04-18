<template>
  <div v-if="isDrizzleInitialized">
    <div>
      <drizzle-contract
        contractName="SimpleStorage"
        method="storedData"
        label="Value"
      />
      <drizzle-contract-form
        contractName="SimpleStorage"
        method="set"
        :placeholders="['Value']"
      />
      <Toast/>
    </div>
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Toast from "@/Toast";

export default {
  name: 'SimpleStorage',
  components: {Toast},
  computed: mapGetters('drizzle', ['isDrizzleInitialized'])
}
</script>

<style></style>
