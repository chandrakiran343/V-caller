<script setup>
import { RouterLink, RouterView } from "vue-router";
import { auth } from "../firebase";
import { NInput, NButton } from "naive-ui";
import {createUser, userAccess} from "../queries/CreateUser"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
</script>

<template>
    <div class="mainwrapper">
            <div class="authwrapper">
                    <h1>Sign Up</h1>
                        <div class="inputfield">
                            <label for="email">Email</label>
                            <input name="email"  type="email" id="email" v-model="signemail" placeholder="Enter your email">
                            <label for="username">User Name</label>
                            <input name="username" type="name" id="username" v-model="username" placeholder="Enter your username">
                            <label from="password">Password</label>
                            <input name="password"  type="password" id="password" v-model="signpassword" placeholder="Enter your password">
                            <n-button type="primary" @click="signup">Sign Up</n-button>
                        </div>
            </div>
        <hr />
        <div class="authwrapper">
            <h1>Log In</h1>
                <div class="inputfield">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" placeholder="Enter your email">
                    <label from="password">Password</label>
                    <input type="password" id="password" v-model="password" placeholder="Enter your password">
                    <n-button type="primary" @click="login">Log In</n-button>
                </div>
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
                logemail: "",
            logpassword: "",
            signemail: "",
            signpassword: "",
                username: ""
        };
    },
    methods: {
        login() {
            console.log(auth, this.email, this.password);
            signInWithEmailAndPassword(auth,this.email, this.password).then( async (user) => {
                console.log(user)
                await userAccess();
                this.$router.push("/home")
            }).catch((error) => {
                alert(error.message);
            });
        },
        signup() {
            createUserWithEmailAndPassword(auth, this.signemail, this.signpassword).then(async (user) => {
                await createUser(this.username)
                console.log(user)
                this.$router.push("/home")
            }).catch((error) => {
                alert(error.message);
            });
        }
    }
}
</script>

<style scoped>
.mainwrapper{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    align-items: center;
    gap: 1rem;
}
hr{
    display: block;
    width: 5px;
    height: 200%;
    border: 1px solid black;
    border-radius: 10px;
    background-color: white;
}
.authwrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}
.inputfield{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 60%;
}
h1{
    padding: 0.7em 1.1em 0.7em 1.1em;
    border: 2px solid white;
    border-radius: 10px;
    background-color: #1e1e1e;
    font-weight: bolder;
}

@media screen and (max-width: 600px) {
    .mainwrapper{
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    hr{
        /* display: none; */
        height: 2px;
        width: 70%;
    }
    h1{
        padding: 0.5em;
    }
}
</style>