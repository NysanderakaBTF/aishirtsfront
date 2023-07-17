html
<template>
    <div class="bg-purple-500 py-16">
        <div class="container mx-auto">
            <h2 class="text-4xl text-white font-semibold text-center mb-8">Contact Support</h2>
            <div class="max-w-md mx-auto bg-white rounded-md shadow-md p-8">
                <form @submit.prevent="submitForm">
                    <div class="mb-4">
                        <label for="name" class="block text-gray-700 font-semibold mb-2">Name</label>
                        <input type="text" id="name" v-model="name" class="w-full px-4 py-2 rounded-md border-gray-400 focus:border-purple-500 focus:outline-none">
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" id="email" v-model="email" class="w-full px-4 py-2 rounded-md border-gray-400 focus:border-purple-500 focus:outline-none">
                    </div>
                    <div class="mb-4">
                        <label for="message" class="block text-gray-700 font-semibold mb-2">Message</label>
                        <textarea id="message" v-model="message" class="w-full px-4 py-2 rounded-md border-gray-400 focus:border-purple-500 focus:outline-none"></textarea>
                    </div>
                    <button type="submit" class="bg-white text-purple-500 py-2 px-4 rounded-md">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            name: '',
            email: '',
            message: ''
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/users/contact/', {
                    name: this.name,
                    email: this.email,
                    message: this.message
                });
                console.log(response.data);
                // Handle success response
            } catch(error) {
                console.error(error.response.data);
                // Handle error response
            }
        }
    }
}
</script>