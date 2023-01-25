<script setup>
import GetWeather from "./GetWeather.vue";
import { NButton, NSpace, NInput } from 'naive-ui'
import { RouterLink } from "vue-router";
</script>

<template>
     <div class="componentwrap">
      <GetWeather />
      <!-- <div class="userinput">
            <input id="user" placeholder="enter username">
            <n-button id="submit" type="success">Submit</n-button>
      </div> -->
      
     </div>
</template>

<style>
.componentwrap{
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      gap: 1rem;
}
.userinput{
      display: flex;
      align-items: center;
      max-width: 30%;
      flex-direction: row;
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
}

</style>