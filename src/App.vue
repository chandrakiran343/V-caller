<script setup>
import { RouterLink, RouterView } from "vue-router";
import RootPage from "./components/RootPage.vue";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="wrapper">
    <NavBar v-if="showNav" />
    <RouterView />
  </div>
</template>

<script>
export default {
  computed: {
      showNav() {
        return this.$route.meta.showNav ;
      },
  },
  }
</script>
<style>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* justify-content: center; */
  align-items: center;
}
</style>
