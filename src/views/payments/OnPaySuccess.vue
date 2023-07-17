<script setup>
import axios from "axios";
</script>
<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div v-if="this.payment_status === 'succeeded'">
            <div class="bg-white p-12 rounded-lg shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                </svg>
                <h1 class="text-3xl font-bold mb-2">Payment Successful</h1>
                <p class="text-lg mb-6 text-gray-500">Thank you for your purchase!</p>
                <button class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                        @click="$router.push('/shop')">Go to Dashboard
                </button>
            </div>
        </div>
        <div v-else>
            <div class="bg-white w-full max-w-lg mx-auto mt-16 rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                    </svg>
                    <h2 class="text-4xl font-bold text-gray-800">Payment Failed</h2>
                </div>
                <p class="text-gray-700 text-lg mb-6">
                    Sorry, your payment did not go through successfully.
                    Please double-check your payment details and try again later.
                </p>
                <button
                    class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
                    @click="this.retryPayment"
                >
<!--                    TODO: test try again-->
                    Try Again
                </button>
                <router-link to="/contact" class="text-purple-600 hover:text-purple-700 font-semibold ml-4">
                    Contact Support
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>


import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import store from "../../store/index.js";

export default {
    components: {FontAwesomeIcon},
    props: {
        oid: {
            required: false
        },
        is_for_prompts:{
            required: false,
            default: () => false
        }
    },
    data() {
        return {
            payment_status: '_'
        }
    },
    mounted() {
        let confirmation_url = !this.is_for_prompts ? `http://127.0.0.1:8000/shop/payment/prompt/${this.oid}/confirm/` : `http://127.0.0.1:8000/shop/payment/${this.oid}/confirm/`;
        console.log(confirmation_url)
        axios.post(confirmation_url)
            .then(value => {
                this.payment_status = value.data;
                store.commit('auth/fetchUserInf');
            })
            .catch(reason => {
                this.$notify({
                    type: "error",
                    text: reason
                })
            })
    },
    methods:{
        retryPayment(){
            axios.post(`http://127.0.0.1:8000/shop/payment/${this.oid}/`).then(value1 => {
                console.log(value1.data);
                window.location.href = value1.data[0][1];
            })
        }
    }
}
</script>
<style>
button {
    transition: all 0.2s ease-in-out;
}

button:hover {
    background-color: #7F3CF7;
}
</style>