<script setup>
import { Call } from "@vicons/ionicons5";
import { ManageAccountsOutlined, HomeOutlined, LogOutOutlined } from "@vicons/material";
import { NIcon } from 'naive-ui' 
import { RouterLink } from "vue-router";
import { auth } from "../firebase";
import { userRipoff } from "../queries/CreateUser";
</script>


<template>
    <div id="navbar" class="navbar"><legend>V-Caller</legend>
        <div class="time">
            <span>{{date}}</span> 
            <span>{{time}}</span>
        </div>
        <div class="iconholder">
            <n-icon size="40">
                <router-link to="/home"><HomeOutlined /></router-link>
            </n-icon>
            <n-icon size="40">
                <ManageAccountsOutlined />
            </n-icon>
            <n-icon size="40">
               <router-link to="/users"><Call /></router-link> 
            </n-icon>
            <n-icon size="40">
                <router-link @click="signout" to="/"><LogOutOutlined /></router-link>
            </n-icon>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            date: new Date().toLocaleDateString("en-gb"),
            time: new Date().toLocaleTimeString("en-gb",{hour12: true}),
            setTime: setInterval(() => {
                this.time = new Date().toLocaleTimeString("en-gb", {
                    hour12: true,
                });
            }, 1000)
        }               
    },
    methods: {
        async signout() {
            console.log("hello")
            await Promise.all([userRipoff() , auth.signOut()]);
        }
    },
    
}
    
</script>
<style>
legend{
    font-size: 1.5rem;
    font-weight: 600;
    margin-left: 1rem;
}
.time{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 1em;
}
.navbar {
    background-color: rgb(175, 0, 0);
    /* color: orange;   */
    padding: 1.1rem 0 1.1rem 0;
    display: flex;
    width: 100%;
    /* height: auto; */
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 600;
}

.iconholder {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-right: 1rem;
}

@media screen and (max-width: 600px) {
    .navbar {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
    }
    .iconholder {
        /* flex-direction: column; */
        margin: 0;
        gap: 1rem;
    }
}
</style>