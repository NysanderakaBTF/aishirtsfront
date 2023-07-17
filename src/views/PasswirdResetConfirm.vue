<script setup>
import {Form, Field, ErrorMessage} from "vee-validate";
</script>
<template>
    <div class="container mx-auto max-w-lg p-4">
        <h1 class="text-2xl font-bold mb-4">Password Reset</h1>

        <Form @submit="resetPassword" :validation-schema="schema" class="space-y-6">
            <div class="flex flex-col space-y-2">
                <label for="new-password" class="text-gray-800 font-medium">New Password</label>
                <Field id="new-password" v-model="newPassword" type="password" class="border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-300 transition duration-150 ease-in-out" name="new-password"/>
                <ErrorMessage  class="text-sm text-red-500" name="new-password">{{ newPassword.errorMessage }}</ErrorMessage>
            </div>

            <div class="flex flex-col space-y-2">
                <label for="confirm-password" class="text-gray-800 font-medium">Confirm Password</label>
                <Field id="confirm-password" v-model="confirmPassword" type="password" class="border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-300 transition duration-150 ease-in-out" name="confirm-password"/>
                <ErrorMessage class="text-sm text-red-500" name="confirm-password">{{ confirmPassword.errorMessage }}</ErrorMessage>
            </div>

            <button type="submit" class="bg-blue-500 text-white rounded-md font-medium py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-150 ease-in-out">Submit</button>
        </Form>

        <div v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</div>
    </div>
</template>

<script>
import axios from 'axios';
import * as yup from "yup";

const schema = yup.object({
    newPassword: yup.string().required().min(8),
    confirmPassword: yup.string().required().min(8).test('match_pswd', 'Passwords doesnt match', function(value) {
        return value === this.parent.newPassword
    })
})
export default {
    data() {
        return {
            newPassword: '',
            confirmPassword: '',
            successMessage: '',
            errorMessage: '',
        }
    },

    mounted() {
        const searchParams = new URLSearchParams(window.location.search);
        const uid = searchParams.get('uidb64');
        const token = searchParams.get('token');
        this.uid = uid;
        this.token = token;
    },

    methods: {
        resetPassword() {
            const data = {
                new_password1: this.newPassword,
                new_password2: this.confirmPassword,
                uid: this.uid,
                token: this.token,
            };
            axios.post('http://127.0.0.1:8000/users/accounts/password/reset/confirm/', data)
                .then(response => {
                    this.successMessage = response.data.detail;
                    alert( response.data.detail);
                    this.$router.push('/login')
                })
                .catch(error => {

                    this.$notify({
                        type:'error',
                        title: error.message
                    })
                });
            this.newPassword='';
            this.confirmPassword='';
        },
    }
}
</script>
