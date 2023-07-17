<script setup>

import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Navbar/>
  <router-view></router-view>
  <Footer/>
  <notifications></notifications>
</template>

<script>
import store from "./store/index.js";
import UserService from "./service/user.service.js";
import axios from "axios";
import authHeader from "./service/auth-header.js";

export default {
    beforeCreate() {
        store.dispatch('auth/initialize');
        console.log('!!!!!!!!!!!!!!!!!!!')
        if(store.state.auth.user_id != null){
            let us = UserService.getPersonalInfo(store.state.auth.user_id);
            console.log(us);
            store.state.auth.status.loggedIn = true;
            let bucket_info = axios.get("http://127.0.0.1:8000/shop/bucket/", {
                headers:authHeader()
            }).then(value => {
                store.commit('cart/setProducts', {products: value.data.items, total: value.data.total})
            })
        }

    }
}
</script>

<style>
/* CSS */

</style>
