<script setup>
import {Form, Field, ErrorMessage} from "vee-validate";
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen lg:flex-row">
        <img class="bg-center bg-cover lg:w-1/2" src="../assets/registerng.jpg" alt="bg cover"/>
        <div class="flex items-center justify-center px-8 py-12 lg:w-1/2 wff">
            <div class="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg 0">
                <h2 class="mb-4 text-2xl font-semibold">Registration Form</h2>
                <Form @submit.prevent="submitForm" :validation-schema="schema" class="bg-white">
                    <div class="mb-4">
                        <label class="block mb-2 font-medium text-gray-700" for="username">Username:</label>
                        <Field v-model="username"
                               class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                               type="text" name="username" id="username" placeholder="Enter username"/>
                        <ErrorMessage name="username" class="mt-1 text-xs italic text-red-600"/>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 font-medium text-gray-700" for="email">Email:</label>
                        <Field v-model="email"
                               class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                               type="email" name="email" id="email" placeholder="Enter email"/>
                        <ErrorMessage name="email" class="mt-1 text-xs italic text-red-600"/>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 font-medium text-gray-700" for="password1">Password:</label>
                        <Field v-model="password1"
                               class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                               type="password" name="password1" id="password1" placeholder="Enter password"/>
                        <ErrorMessage name="password1" class="mt-1 text-xs italic text-red-600"/>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 font-medium text-gray-700" for="password2">Confirm Password:</label>
                        <Field v-model="password2"
                               class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                               type="password" name="password2" id="password2" placeholder="Confirm password"
                               :rules="checkPasswords"/>
                        <ErrorMessage name="password2" class="mt-1 text-xs italic text-red-600"/>
                    </div>
                    <button class="px-3 py-2 ml-3 font-medium text-white border border-transparent rounded-md bg-gradient-to-r from-purple-600 to-purple-400 hover:bg-purple-700 hover:text-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            type="submit"
                            @click="this.submitForm"
                    >
                        Register
                    </button>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import * as yup from 'yup';

let list_email = [];

const schema = yup.object({
    email: yup.string().required().email().test('email_validation', "Such email is already registered", value => {
        return !list_email.includes(value)
    }),
    username: yup.string().required().min(3),
    password1: yup.string().required().min(8),
    password2: yup.string().required().min(8).test('match_pswd', 'Passwords doesnt match', function(value) {
        return value === this.parent.password1
    })
})
export default {

    data() {
        return {
            username: '',
            email: '',
            password1: '',
            password2: ''
        }
    },
    methods: {
        submitForm(values) {
            console.log(values)
            axios.post('http://127.0.0.1:8000/users/accounts/registration/', {
              username: this.username,
              email: this.email,
              password1: this.password1,
              password2: this.password2
            });
        },
        checkPasswords() {
            if (this.password1 !== this.password2) {
                return 'Passwords doesnt match'
            }
        }

    },
    beforeCreate() {
        axios.get('http://127.0.0.1:8000/users/customers/').then(value1 => {
            for (const value1Element of value1) {
                list_email.push(value1Element.email);
            }
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            console.log(list_email);
        });
    }
}
</script>
<style>
.bg-white-purple {
    background-color: #fff4ff;
}

@media screen and (max-width: 640px) {
    .wff {
        width: 100%;
        padding: 0;
    }

}

@media screen and (max-width: 1080px) and (min-width: 641px) {
    .wff {
        width: 80%;
    }
}
</style>