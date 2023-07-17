<script>
import store from "../store";
import axios, {formToJSON} from "axios";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import proompter from "./Proompter.vue";
import RollerLoader from "../components/UI/Spinner.vue";
import {ref} from "@vue/reactivity";
import lib from "vue-slider-component/lib";
import Proompter from "./Proompter.vue";
import Modal from "../components/UI/Modal.vue";
import ImageGridModal from "../components/ImageGridModal.vue";
import authHeader from "../service/auth-header.js";

export default {
    name: "ProductPage",
    computed: {
        store() {
            return store
        }
    },
    components: {ImageGridModal, Modal, RollerLoader, FontAwesomeIcon},
    props: {
        id: null,
    },
    data() {
        return {
            product: null,
            cart_prod: {
                quantity: 0,
                product: this.product,
                total: 0
            },
            isLoaded: false,
            selectedColor: null,
            selectedSize: null,
            selectedItemWithSize: null,
            availableColors: null,
            availableSizes: [],
            selectedImage: null,
            is_open_modal: false,
            imgLoaded: false,
            images: [],
        }
    },
    beforeMount() {
        axios.get(`http://localhost:8000/shop/items/${this.id}/`).then(
            value => {
                console.log(value.data)
                this.product = value.data;
                this.cart_prod.product = this.product;
                this.isLoaded = true;
                console.log('Loaded');
            }
        )

    },
    mounted() {
        console.log(this.product)

        this.cart_prod = {
            quantity: 1,
            product: this.product,
            total: 0
        }
    },
    methods: {
        formToJSON,
        fetchImages() {
            this.is_open_modal = false;
            this.imgLoaded = false;
            store.dispatch('fetchImages');
            this.imgLoaded = true;
            this.is_open_modal = true;
            this.images = store.getters.getImages
        },
        selectSize(size) {
            this.selectedSize = size;
            this.availableColors = [];
            for (const itemWithColorElement of this.product.item_with_color) {
                if (itemWithColorElement.size.id === this.selectedSize.id) {
                    this.availableColors.push(itemWithColorElement)
                }
            }
        },
        change_img(id) {
            let f = document.getElementById('current');
            f.src = 'http://localhost:8000' + this.product.image[id].image;
        },
        updateTotal() {
            this.cart_prod.total = this.cart_prod.quantity * this.cart_prod.product["price"];
        },
        addToCart() {
            if (this.selectedItemWithSize === null) {
                this.$notify({
                    title: "Select size and color",
                    text: "To add item to cart select size and color",
                    type: "warn"
                })
            }
            if (this.selectedImage === null) {
                this.$notify({
                    title: "Add image",
                    text: "To add item to cart select generated image by clicking 'Select image' button",
                    type: "warn"
                })
            }
            if (this.selectedItemWithSize !== null && this.selectedImage !== null) {
                axios.post(`http://127.0.0.1:8000/shop/items-with-color/${this.selectedItemWithSize.id}/to_bucket/`, {
                    "gimage": this.selectedImage.id,
                    "prompt": this.selectedImage.prompt.id,
                    "quantity": this.cart_prod.quantity,
                    "color": this.selectedItemWithSize.color.id,
                    "size": this.selectedItemWithSize.size.id
                }, {
                    headers: authHeader()
                }).then(value => {
                    store.commit('cart/setProducts', {products: value.data.items, total: value.data.total})
                    console.log(value.data.total)
                    this.$notify({
                        text: "Item added to cart, you can change quantity on card page",
                        title: "Success"
                    })
                })
            }
            this.selectedImage = null;
            this.selectedSize = null;
            this.selectedColor = null;
            this.availableColors = [];
        },
        incQuantity() {
            this.updateTotal();
            store.commit("cart/updateQuantityById", {payload: this.cart_prod, increase: true})
            this.msg = this.cart_prod.quantity;
        },
        decQuantity() {
            this.updateTotal();
            if (this.cart_prod.quantity === 1) {
                this.cart_prod.quantity = 0;
                store.commit("cart/removeProductById", this.product["id"]);
            } else {
                store.commit("cart/updateQuantityById", {payload: this.cart_prod, increase: false})
            }
        },
        onImageSelected(selectedImage) {
            console.log("Selected Image:", selectedImage);
            this.selectedImage = selectedImage;
            this.openModal = false;
        },
    }
}

</script>

<template>
    <div style="min-height: 78vh">
        <div class="flex mt-8 flex-wrap sm:flex-col md:flex-row justify-around" v-if="this.isLoaded">
            <div class="sm:max-w-full lg:max-w-md sm:align-middle">
                <div class="active_img overflow-hidden iimmg">
                    <img id='current' :src="'http://localhost:8000'+this.product.image[0].image" alt="..."
                         v-if="this.product.image.length !== 0"
                         class="w-full rounded-lg items-stretch  iiiiiiimg">
                    <img v-else src="https://placehold.co/600x400" alt="product-image" class="w-full rounded-lg">
                </div>
                <div v-if="this.product.image.length > 1" class="flex flex-row">
                    <img @click="change_img(index)"
                         class="w-25 h-20 mt-1.5 mb-1.5 ml-1.5 rounded border-slate-500 border-3"
                         :src="'http://localhost:8000'+image.image" v-for="(image, index) in this.product.image"
                         :key="index"
                         :id="index"
                         alt="...">
                </div>
            </div>
            <div class="lg:ml-10 flex w-fit flex-col ml-5">
                <h2 style="font-weight: bold; font-size: larger">{{ product.name }}</h2>
                <ul>
                    <li class="inline-block mr-2" v-for="(category, index) in product.category" :key="index">
                        <a href="#" class="bg-purple-300 hover:bg-purple-600 text-white px-1 py-0 text-sm rounded">{{
								category.name
                            }}</a>
                    </li>
                </ul>
                <p class="mt-2.5">
                    {{ product.description }}
                </p>

                <h3 class="text-lg font-bold mb-1">Sizes:</h3>
                <div class="flex flex-row">
                    <p style="font-weight: bolder; padding-left: 4px; padding-right: 4px;"
                       class="mt-1 ml-1 text-sm text-gray-700 bg-purple-200 rounded"
                       v-for="size in this.product.size"
                       :key="size.id"
                       @click="this.selectSize(size);"
                       :class="this.selectedSize !== null ? (this.selectedSize.id === size.id ? 'bg-purple-400' : 'bg-purple-200') : 'bg-purple-200' "
                    >
                        {{ size.name }}
                    </p>
                </div>
                <div v-if="this.selectedSize !== null">
                    <p> Chest size - {{ this.selectedSize.chest_size }} </p>
                    <p> Waist size - {{ this.selectedSize.waist_size }} </p>
                    <p v-if="this.selectedSize.hip_size !== 0"> Hip size - {{ this.selectedSize.hip_size }} </p>
                    <p> Lenght - {{ this.selectedSize.dress_length }} </p>
                </div>
                <h3 class="text-lg font-bold mb-1">Available colors:</h3>
                <div class="flex p-1 mt-1 space-x-1">
                    <div v-if="this.availableColors" v-for="(item, index) in this.availableColors"
                         :key="`color-${item.id}`"
                         class="p-1 border-2 rounded-full cursor-pointer "
                         :class="this.selectedItemWithSize !== null ? (this.selectedItemWithSize.id === item.id ? 'border-blue-500' : 'border-purple-950') : 'border-blue-500' "
                         :style="{ backgroundColor: item.color.hex_code }"
                         @click="this.selectedItemWithSize = item"
                    >
                        <span class="block w-3 h-3"/>
                    </div>
                    <div v-else class="-mt-2">
                        <span>Select size first</span>
                    </div>
                </div>
                <button @click="this.fetchImages" style="min-width: 200px; max-width: 200px"
                        class="bg-purple-500 rounded-md text-white font-bold p-1 mb-2">
                    Select Image
                </button>
                <div v-if="this.selectedImage !== null">
                    <img class="rounded-xl w-52" :src="'http://127.0.0.1:8000/'+this.selectedImage.image_path"
                         alt="selected image"/>
                </div>
                <image-grid-modal
                        backdrop
                        v-if="this.imgLoaded"
                        :isOpen="this.is_open_modal"
                        :images="store.getters.getImages"
                        @closeModal="this.is_open_modal = false"
                        @selectImage="onImageSelected"
                />


                <h4 id="price" style="font-size: x-large" v-if="this.selectedItemWithSize!== null">
                    Price: {{ this.selectedItemWithSize.price }} BYR
                </h4>
                <h4 id="price" style="font-size: x-large" v-else> Price: Select size and color </h4>

                <div v-if="this.selectedItemWithSize" class="flex cartb justify-center rounded bg-slate-700 text-gray-100 text-center">
                    <button v-if="this.selectedItemWithSize.available_quantity > 0" class="add_cart" @click="addToCart">
                        <span class="text-lg">Add to cart</span>
                    </button>
                    <div v-else>
                        <span class="text-lg">Sorry, item out of stock</span>
                    </div>
                </div>
                <div v-else class="flex cartb justify-center rounded bg-slate-700 text-gray-100 text-center">
                    <span lass="text-lg">Select size and color</span>
                </div>

            </div>

        </div>
        <div v-else class="w-screen h-screen flex justify-center items-center">
            <RollerLoader class="w-100"/>
        </div>


        <div v-else>
            <div class="w-screen h-screen flex justify-center items-center z-10 fixed">
                <RollerLoader class="w-100"/>
            </div>
        </div>
    </div>
</template>


<style scoped>
.cartb {
    max-width: 150px;
}

.cartb span {
    max-width: fit-content;
}

body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', serif;
    background: #eee;
}

.content {
    width: 420px;
    margin-top: 100px;
}


.product-rating {

    font-size: 50px;
}

.stars i {

    font-size: 18px;
    color: #28a745;
}

.rating-text {
    margin-top: 10px;
}

.iimmg {
    height: 300px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.iiiiiiimg {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>