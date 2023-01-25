<script setup>
import { getUsers } from '../queries/CreateUser';
import { reactive, ref, watch } from 'vue';
import {NCard, NTag, NSpace,NAlert,NSwitch} from 'naive-ui'
import {RouterLink} from 'vue-router';
</script>


<template>
    <div class="listofusers">
        <h1>Users</h1>
        <h2>Select a user to call</h2>
        <router-link v-for="user in users" @click="store.user = user" to="/play">
          <div class="cardwrap">
            <n-card size="small" :title="user.username" :key="user.id">
              {{ user.username }} - {{ user.email }} - <n-tag
                :type="user.status==='online'?'success':'error'">{{user.status}}</n-tag>
            </n-card>
            <n-space v-if="(user.roomId!==null)" vertical :size="12">
              <n-alert title="The user currently joined in" type="info" :bordered="bordered">
                {{ user.roomId }}
              </n-alert>
            </n-space>
          </div>
        
      </router-link> 
    </div>
</template>

<script>
export const store = reactive({
    user : null
})
export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    await this.handle();
  },
  watch: {
    users(old, New) {
      this.handle();
    },
    },
    methods: {
      async handle() {
        const data = await getUsers();
        this.users = data;
        }
    }
};
</script>

<style>
.listofusers{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.cardwrap{
    display: flex;
    align-items: center;
    gap: 1rem;
}

a{
    text-decoration: none;
    min-width: 100%;

}
a:hover{
    scale: 1.1;
    border-color: red;
    transition: scale 1000ms cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>