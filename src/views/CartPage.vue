<script setup>
import VueMultiselectEsm from "vue-multiselect";
</script>
<template>
    <div class="qq bg-gray-100 pt-20">
        <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div class="rounded-lg md:w-2/3 flex-col">
                <OrderItem  v-for="item in this.items" :product="item"/>
            </div>



            <!-- Sub total -->
            <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <VueMultiselectEsm
                    @click="getAddresses"
                    id="adresses"
                    :options="this.delivery_addr_str"
                    :close-on-select="true"
                    v-model="this.selected_addr"
                    :option-label="optionLabel"
                    label="street_address"
                    track-by="id"
                    :show-labels="false"
                >
                    <template slot="singleLabel">{{ option.street_address }}</template>
                </VueMultiselectEsm>
                <VueMultiselectEsm
                    id="delivery_types"
                    :options="this.delivery_types"
                    :close-on-select="true"
                    v-model="this.selected_delivery"
                    label="name"
                    :custom-label="nameWithPrice"
                    track-by="id"
                    :show-labels="false"
                >
                    <template slot="singleLabel">{{ option.street_address }}</template>
                </VueMultiselectEsm>
                <div class="flex justify-between mt-5">
                    <p class="text-lg font-bold">Total</p>
                    <div class="">
                        <p class="mb-1 text-lg font-bold" v-if="this.selected_delivery != null">{{Number(store.getters["cart/getTotal"])  +  Number(this.selected_delivery.price)}} BYR</p>
                        <p class="mb-1 text-lg font-bold" v-else>{{store.getters["cart/getTotal"]}} BYR</p>
                        <p class="text-sm text-gray-700" v-if="this.selected_delivery!=null">delivery: {{this.selected_delivery.price}}</p>
                    </div>
                </div>
                <div v-if="store.state.auth.user!==null">
                    <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" @click="postOrder">Check out</button>
                </div>
                <router-link v-else to="/login">
                    <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Login</button>
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>
import store from "../store";
import OrderItem from "../components/OrderItem.vue";
import axios from "axios";
import {resolveTransitionHooks} from "vue";

export default {
    name: "CartPage",
    components: {OrderItem},
    watch:{
        'store.state.cart.products'(newProducts){
            this.items = newProducts;
        }
    },
    computed: {
        store() {
            return store
        },
        optionLabel () {
            return (option) => option.street_address
        }
    },
    data() {
        return {
            items: [],
            delivery_addr_str:[],
            selected_addr:'',
            delivery_types:[],
            selected_delivery:null,
            full_total:0
        }
    },
    mounted() {
        this.items = store.getters["cart/getAllProducts"];
        axios.get('http://127.0.0.1:8000/shop/delivery-types/').then(value => {
            this.delivery_types = value.data
        });

    },
    methods:{
        nameWithPrice({name, price}){
          return `${name} - ${price} `
        },
        getAddresses(){
            this.delivery_addr_str = store.getters["auth/getUserInf"].delivery_address;
        },
        postOrder(){
            let items_ids = this.items.map(value => value.id);
            this.full_total = Number(store.getters["cart/getTotal"]) + Number(this.selected_delivery.price)
            axios.post('http://127.0.0.1:8000/shop/orders/',{
                "total_price":this.full_total,
                "shipped":{
                    "id": 1,
                    "status": "Pending",
                    "description": "Заказ создан, скроро он поступит на обработку и выполенние"
                },
                "shipping_address": this.selected_addr.id,
                "items": items_ids,
                "shipping_method": this.selected_delivery.id
            }).then(value => {
                axios.post(`http://127.0.0.1:8000/shop/payment/${value.data.id}/`).then(value1 => {
                    console.log(value1.data);
                    window.location.href = value1.data[0][1];
                })
            }).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // this.$notify({
                    //     title: "Error" + error.response.status,
                    //     text: error.response.data,
                    //     type: "error"
                    // })
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser
                    // and an instance of http.ClientRequest in node.js
                    console.log(error.request);
                    // this.$notify({
                    //     title: "Error",
                    //     text: error.request,
                    //     type: "error"
                    // })
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    // this.$notify({
                    //     title: "Error",
                    //     text: error.message,
                    //     type: "error"
                    // })
                }

            })
        },

    }
}
</script>

<style scoped>
.qq{
    display: block;
}
</style>