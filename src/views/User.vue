<script setup>
import {Field, ErrorMessage, Form} from "vee-validate";
import {formToJSON} from "axios";
</script>
<template>
    <div class="container px-4 mx-auto md:w-full">
        <div class="flex flex-col items-center">
            <h1 class="text-3xl font-bold mb-4">User Information</h1>
            <div class="bg-white shadow overflow-hidden sm:rounded-lg w-full sm:w-2/3">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-bold text-gray-900">User Details</h3>
                    <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div class="col-span-1">
                            <p class="text-md font-bold text-gray-600">First Name:</p>
                            <p class="text-lg text-gray-900">{{ this.userr.first_name }}</p>
                        </div>
                        <div class="col-span-1">
                            <p class="text-md font-bold text-gray-600">Last Name:</p>
                            <p class="text-lg text-gray-900">{{ this.userr.last_name }}</p>
                        </div>
                        <div class="col-span-1">
                            <p class="text-md font-bold text-gray-600">Email:</p>
                            <a href="mailto:{{ this.userr.email }}"
                               class="text-lg text-gray-900 hover:underline">{{ this.userr.email }}</a>
                        </div>
                    </div>
                    <router-link to="/upd"
                                 class="px-4 py-2 bg-purple-400 text-white rounded hover:bg-purple-700 block ml">
                        Update User
                    </router-link>
                    <button
                            class="px-4 py-2 bg-purple-400 text-white rounded hover:bg-purple-700 block ml"
                            @click="this.is_open_change_password_modal=true"
                    >
                        Change password
                    </button>
                </div>
                <Address :addresses="delivery_addr"/>
                <OrderListed :orders="this.orders"/>

            </div>
            <pagination
                    class="mt-2.5"
                    :total-items="this.total_orders"
                    :items-per-page="this.orders_per_page"
                    :current-page="this.orders_page"
                    @pageChanged="this.handle_page"
            />
        </div>
    </div>
    <modal
            :is-open="this.is_open_change_password_modal"
            header="Password change"
            backdrop
            @close-modal="this.is_open_change_password_modal = false;"
    >
        <Form @submit="this.changePassword" class="flex flex-col" :validation-schema="schema">
            <div class="flex flex-col space-y-2">
                <label for="new-password" class="text-gray-800 font-medium">Old Password</label>
                <Field name="oldpassword" v-model="olpass" label="Old password" class="border-gray-300 rounded-md p-2 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-300 transition duration-150 ease-in-out"/>
                <ErrorMessage class="text-sm text-red-500" name="oldpassword"/>
            </div>
            <div class="flex flex-col space-y-2">
                <label for="new-password" class="text-gray-800 font-medium">New Password</label>
                <Field name="newpass1" v-model="newpass1" label="New password" class="border-gray-300 rounded-md p-2 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-300 transition duration-150 ease-in-out"/>
                <ErrorMessage class="text-sm text-red-500" name="newpass1"/>
            </div>
            <div class="flex flex-col space-y-2">
                <label for="new-password" class="text-gray-800 font-medium">Confirm new password</label>
                <Field name="newpass2" v-model="newpass2" label="Confirm new password" class="border-gray-300 rounded-md p-2 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-300 transition duration-150 ease-in-out"/>
                <ErrorMessage class="text-sm text-red-500" name="newpass2"/>
            </div>
            <button type="submit" class="mt-2 bg-purple-500 text-white rounded-md font-medium py-2 px-4 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 transition duration-150 ease-in-out">Submit</button>
        </Form>
    </modal>
</template>

<script>
import store from "../store";
import axios from "axios";
import OrderListed from "../components/OrderListed.vue";
import Address from "../components/Address.vue";
import {mapGetters} from "vuex";
import UserService from "../service/user.service.js";
import Pagination from "../components/UI/Paginator.vue";
import Modal from "../components/UI/Modal.vue";
import * as yup from "yup";

const schema = yup.object({
    newpass1: yup.string().required().min(8),
    newpass2: yup.string().required().min(8).test('match_pswd', 'Passwords doesnt match', function(value) {
        return value === this.parent.newpass1
    })
})
export default {
    name: 'Profile',
    components: {Modal, Pagination, Address, OrderListed},
    watch: {
        'getUserInf'(newValue, oldValue) {
            this.userr = newValue;
        },
        'getUserInf.delivery_address'(newValue, oldValue) {
            this.delivery_addr = newValue;
        },
    },
    computed: {
        store() {
            return store
        },
        ...mapGetters('auth', ['getUserInf']),
    },
    data() {
        return {
            userr: {},
            orders: null,
            delivery_addr: null,
            orders_page: 1,
            total_orders: 0,
            orders_per_page: 10,
            is_open_change_password_modal: false,
            olpass: '',
            newpass1: '',
            newpass2: ''
        }
    },
    created() {
        store.dispatch('auth/initialize')
        this.userr = store.getters["auth/getUserInf"];
        console.log(this.userr)
        if (this.userr == null && store.state.auth.user_id) {
            UserService.getPersonalInfo(store.state.auth.user_id)
        }
    },
    mounted() {
        this.userr = store.getters["auth/getUserInf"];
        console.log(this.userr);
        this.handle_page(1);
        this.delivery_addr = store.getters["auth/getUserInf"].delivery_address
    },
    methods: {
        handle_page(page_n) {
            this.orders_page = page_n;
            axios.get(`http://127.0.0.1:8000/shop/orders/user`, {
                params: {
                    page: this.orders_page,
                    page_size: this.orders_per_page
                }
            }).then(value => {
                this.orders = value.data.results;
                this.total_orders = value.data.count;
            })
        },
        async changePassword() {
            try {
                let ans = await UserService.changePassword({
                    oldpass: this.olpass,
                    newpass1: this.newpass1,
                    newpass2: this.newpass2
                });
                this.$notify({
                    text:ans.data.detail,
                    title:'Success'
                })
            } catch (e){
                this.$notify({
                    text:e.data.detail,
                    type:'error',
                    title:'Error'
                })
            }
            this.is_open_change_password_modal=false
        }
    }
};
</script>

<style>
@media screen and (max-width: 1290px) {
    .container div {
        width: 100%;
    }

}

.ml {
    margin-top: 10px;
    width: fit-content;
}

</style>