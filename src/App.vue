<template>
  <div id="app">
    <h-magnifying-glass
    :small-url="small" :big-url="big"></h-magnifying-glass>
  </div>
</template>

<script>
import small from './assets/small.jpg'
import big from './assets/big.jpg'
export default {
  name: "app",
  data(){
    return {
      small,
      big
    }
  }
};
</script>

<style>

</style>
