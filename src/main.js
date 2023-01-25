import { createApp } from "vue";
import {auth} from "./firebase";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
export async function getCurrentUser(){
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            // unsubscribe();
            resolve(user);
        }, reject);
    });
}