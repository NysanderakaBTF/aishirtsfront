<template>
    <div class="flex flex-col justify-center items-center space-y-4">
        <h2 class="text-xl font-bold text-gray-900">Buy More Generations</h2>
        <div class="w-full h-1 bg-gray-200 rounded-full">
            <div :style="{ width: `${sliderValue}%` }" class="h-1 bg-blue-500 rounded-full"></div>
        </div>
        <div class="flex justify-between w-full text-gray-600">
            <span>10</span>
            <span>150</span>
        </div>
        <div class="relative">
            <input type="range" v-model="sliderValue" class="w-full" min="10" max="150" step="1">
            <div class="absolute bottom-0 left-0 -mb-6 text-blue-500">{{ sliderValue }}</div>
        </div>
        <div class="flex flex-col justify-center items-center space-y-2">
            <p class="text-gray-600">Number of Generations: {{ sliderValue }}</p>
            <button @click="buyGenerations"
                    class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 duration-300 transform hover:-translate-y-px">
                Buy {{ totalPrice }} Credits
            </button>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    mounted() {
        axios.get('http://127.0.0.1:8000/shop/payment/prompt/types/').then(value => {
                this.price = value.data[0].price
                this.order_type = value.data[0].id
            }
        )
    },
    data() {
        return {
            price: 10, // price for each generation
            sliderValue: 10, // number of generations to buy
            order_type: 0
        };
    },
    computed: {
        totalPrice() {
            return this.price * this.sliderValue;
        },
    },
    methods: {
        buyGenerations() {
            const totalCredits = this.price * this.sliderValue;
            axios.post('http://127.0.0.1:8000/shop/payment/prompt/', {
                prompt_type: this.order_type,
                quantity: this.sliderValue,
                total_price: this.totalPrice
            }).then(value => window.location.href = value.data[0][1])
        },
    },
};
</script>
<style>
input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 2px solid #bbb;
    border-radius: 50%;
    cursor: pointer;
}

input[type='range']::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 2px solid #bbb;
    border-radius: 50%;
    cursor: pointer;
}
</style>