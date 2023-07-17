<template>
    <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <div class="w-full">
            <div class="flex flex-row items-baseline">
                <span><h2 class="text-lg font-bold text-gray-900 mb-3">{{ this.product.item.item.name }}</h2></span>
                <span class="ml-4 font-bold">{{this.product.item.size.name}}</span>
                <div class=" ml-4 w-3 h-3 rounded" :style="{backgroundColor: this.product.item.color.hex_code}"></div>
            </div>
            <div class="flex justify-between items-center ">
                <div class="flex items-center">
                    <img
                            v-if="this.product.item.image.length > 0"
                            :src="'http://127.0.0.1:8000' + this.product.item.image[0].image"
                            alt="product-image"
                            class="w-40 rounded-lg"
                    />
                    <img
                            v-else
                            src="https://placehold.co/600x400"
                            alt="product-image"
                            class="w-30 rounded-lg"
                    />
                    <div class="w-5 h-5 ml-2 mr-2" style="display: block;">
                        <svg viewBox="0 0 100 100">
                            <rect x="35" y="0" width="30" height="100" rx="15" fill="#000"/>
                            <rect x="0" y="35" width="100" height="30" ry="15" fill="#000"/>
                        </svg>
                    </div>
                    <img
                            :src="'http://127.0.0.1:8000/' + this.product.gimage.image_path"
                            alt="promptImage"
                            class="w-40 rounded-lg"
                    />
                </div>

                <div class="">
                    <div class="mt-4 block im sm:space-y-6 sm:mt-0 sm:space-x-6">
                        <div class="flex items-center border-gray-100">
                        <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                              @click="decQuantity"> - </span>
                            <input class="h-8 w-8 border bg-white text-center text-xs outline-none p-0"
                                   style="min-width: 30px" type="number" v-model="this.product.quantity" min="1"/>
                            <span class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                  @click="incQuantity"> + </span>
                        </div>
                        <div class="flex items-center space-x-4">
                            <p class="text-sm">{{ this.product.item.price * this.product.quantity }} BYR</p>
                            <svg
                                    @click="removeItem"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import store from "../store";
import axios from "axios";
import authHeader from "../service/auth-header.js";

export default {
    name: "OrderItem",
    props: {
        product: {
            required: true,
        }
    },
    data() {
        return {
            imagesURLS: []
        };
    },
    mounted() {
        console.log(this.product);
    },
    methods: {
        removeItem() {
            axios.delete(`http://127.0.0.1:8000/shop/bucket/${this.product.id}`).then(value => {
                    store.commit("cart/setProducts", {products: value.data.items, total: value.data.total})
                }
            )
        },
        addToCart() {
            this.msg = this.quantity;
            store.commit('cart/addProduct', this.product);
        },
        incQuantity() {
            store.commit("cart/updateQuantityById", {payload: this.product, increase: true})
        },
        decQuantity() {
            if (this.product.quantity === 1) {
                this.removeItem();
            } else {
                store.commit("cart/updateQuantityById", {payload: this.product, increase: false})
            }
        },
        isActive(image) {
            return image === this.images[this.activeIndex];
        },
        slide(direction) {
            this.activeIndex += direction;
            if (this.activeIndex < 0) {
                this.activeIndex = this.images.length - 1;
            } else if (this.activeIndex >= this.images.length) {
                this.activeIndex = 0;
            }
        },
    },
};
</script>

<style scoped>


.btntoggle {
    display: none;

}

.image-slider {
    position: relative;
}

.image-slider .active {
    display: block;
}

.slider-controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
}

.slider-controls button {
    background-color: transparent;
    border: none;
    color: #aaa;
    font-size: 20px;
    cursor: pointer;
    padding: 0 10px;
}

.slider-controls button:hover {
    color: #333;
}

.card {
    display: flex;
    flex-direction: column;
    width: 25%;
}

.add_cart {
    background-color: #2c3e50;
    color: antiquewhite;
    font-weight: bold;
    border-radius: 5px;
}

.card-text {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    align-items: center;
}


.product-images {
    margin: 10px;
    display: flex;
    position: relative;
    flex-direction: column;
    background: white;
    border-radius: 15px;
    max-width: 300px;
    min-width: 300px;
    justify-content: center;
    place-content: center;
    place-items: center;
    overflow: hidden;
    padding: 10px;
    transition: 0.5s;
}

</style>