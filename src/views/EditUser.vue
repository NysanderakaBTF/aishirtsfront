<template>
    <form @submit.prevent="submitForm" class="max-w-md mx-auto mt-10 mb-10">
        <div class="mb-4">
            <label for="first_name" class="block font-semibold text-gray-700">First Name:</label>
            <input type="text" id="first_name" v-model="firstName" required
                   class="mt-1 px-4 py-3 rounded-lg border-gray-300 w-full focus:outline-none focus:border-purple-500" />
        </div>
        <div class="mb-4">
            <label for="last_name" class="block font-semibold text-gray-700">Last Name:</label>
            <input type="text" id="last_name" v-model="lastName" required
                   class="mt-1 px-4 py-3 rounded-lg border-gray-300 w-full focus:outline-none focus:border-purple-500" />
        </div>
        <div class="mb-4">
            <label for="email" class="block font-semibold text-gray-700">Email:</label>
            <input type="email" id="email" v-model="email" required
                   class="mt-1 px-4 py-3 rounded-lg border-gray-300 w-full focus:outline-none focus:border-purple-500" />
        </div>
        <div class="mb-4">
            <label for="phone_number" class="block font-semibold text-gray-700">Phone Number:</label>
            <input type="text" id="phone_number" v-model="phoneNumber" class="mt-1 px-4 py-3 rounded-lg border-gray-300 w-full focus:outline-none focus:border-purple-500" />
        </div>
        <button type="submit" class="bg-purple-500 text-white py-3 rounded-lg w-full hover:bg-purple-600 transition-all duration-200">Update</button>
    </form>
</template>
<script>
import axios from "axios";
import store from "../store/index.js";
export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: ""
        };
    },
    methods: {
        submitForm() {
            const payload = {
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                phone_number: this.phoneNumber
            };
            axios
                .patch(`http://127.0.0.1:8000/users/customers/${store.state.auth.user.id}/`, payload)
                .then((response) => {
                    console.log(response.data);
                    store.commit('auth/setUserInfo', response.data)
                    this.$router.push('/user')
                })
                .catch((error) => {
                    console.log(error);
                    this.$notify({
                        type: 'error',
                        text: error
                    });
                });
        },
    },
};
</script>