<template>
  <div>
    <h1>Item Manager built with Drizzle</h1>

    Result of last call:

    <p>Create the item:</p>
    <DrizzleCreateItem/>

    <p>Display the item:</p>
    <DrizzleDisplayItem/>

    <p>Pay for the item:</p>
    <DrizzlePayForItem/>

    <p>Ship the item::</p>
    <DrizzleShip/>

  </div>
</template>

<script>
import DrizzleDisplayItem from "@/DrizzleDisplayItem";
import DrizzleCreateItem from './DrizzleCreateItem'
import DrizzlePayForItem from './DrizzlePayForItem'
import DrizzleShip from './DrizzleShip'
export default {
  components: {
    DrizzleDisplayItem,
    DrizzleCreateItem,
    DrizzlePayForItem,
    DrizzleShip,
  },
}
</script>

<style scoped>
</style>