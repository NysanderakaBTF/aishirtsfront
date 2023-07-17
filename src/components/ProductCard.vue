<template>
  <!--    <div class=" catdddd p-3 mb-3 mr-3 rounded shadow-lg sh1adow-slate-400 card" style="height: 360px; cursor: pointer"-->
  <!--         @click="this.$router.push(`/product/${this.product.id}`)">-->
  <!--        <div class="card-body">-->
  <!--            <h5 class="text-lg text-center card-title text-slate-900 decoration-from-font hover:text-teal-800">-->
  <!--                <router-link :to="{ name: 'product', params: { id: product.id } }"> {{ name }}-->
  <!--                </router-link>-->
  <!--            </h5>-->
  <!--            <div class="product-images">-->
  <!--                <div class="overflow-hidden image-slider">-->
  <!--                    <div class="overflow-hidden image-slider">-->
  <!--                        <div v-if="images.length > 0">-->
  <!--                            <div v-for="(image, index) in images">-->
  <!--                                <div v-if="isActive(index)">-->
  <!--                                    <img alt="product_img" :key="index" :src="'http://127.0.0.1:8000/' + image.image"-->
  <!--                                         class="ml-0 overflow-hidden product-image rounded-xl"/>-->
  <!--                                </div>-->
  <!--                                <div v-else>-->
  <!--                                    <img alt="product_img" :key="index" :src="'http://127.0.0.1:8000/' + image.image"-->
  <!--                                         class="ml-0 overflow-hidden product-image" style="display:none;"/>-->
  <!--                                </div>-->
  <!--                            </div>-->
  <!--                        </div>-->
  <!--                        <div v-else>-->
  <!--                            <img src="https://placehold.co/600x400" alt="ml-0 product-image"-->
  <!--                                 class="w-full rounded-lg sm:w-40">-->
  <!--                        </div>-->
  <!--                    </div>-->
  <!--                </div>-->
  <!--                <div class="slider-controls">-->
  <!--                    <button @click.stop="prevSlide">❮</button>-->
  <!--                    <button @click.stop="nextSlide">❯</button>-->
  <!--                </div>-->
  <!--            </div>-->


  <!--        </div>-->
  <!--        <div>-->
  <!--            <div class="flex flex-row">-->
  <!--                <p style="font-weight: bolder; padding-left: 3px; padding-right: 3px;"-->
  <!--                   class="mt-1 ml-1 text-sm text-gray-700 bg-purple-200 rounded"-->
  <!--                   v-for="size in this.sizes"-->
  <!--                   :key="size.id"-->
  <!--                >-->
  <!--                    {{ size.name }}-->
  <!--                </p>-->
  <!--            </div>-->
  <!--            <div class="flex p-1 mt-1 space-x-1">-->
  <!--                <div v-for="(color, index) in product.colors" :key="`color-${index}`"-->
  <!--                     class="p-1 border-2 rounded-full cursor-pointer "-->
  <!--                     :class="color.id == this.selectedColor.id ? 'border-blue-500' : 'border-purple-950'"-->
  <!--                     :style="{ backgroundColor: color.hex_code }"-->
  <!--                     @click="this.selectedColor = color"-->
  <!--                >-->
  <!--                    <span class="block w-3 h-3"/>-->
  <!--                </div>-->
  <!--            </div>-->

  <!--            <p class="card-text">Price: {{ price[0].price }}</p>-->
  <!--        </div>-->
  <!--    </div>-->


    <div class="container prod-card mb-5">
        <div class="w-full bg-white shadow-lg rounded-xl p-6">
            <div class="flex flex-col">
                <div class="">
                    <div class="relative h-62 w-full mb-3">
                        <div class="overflow-hidden image-slider">
                            <div v-if="images.length > 0">
                                <div v-for="(image, index) in images">
                                    <div v-if="isActive(index)">
                                        <img alt="product_img" :key="index"
                                             :src="'http://127.0.0.1:8000/' + image.image"
                                             class="ml-0 overflow-hidden product-image rounded-xl"/>
                                    </div>
                                    <div v-else>
                                        <img alt="product_img" :key="index"
                                             :src="'http://127.0.0.1:8000/' + image.image"
                                             class="ml-0 overflow-hidden product-image" style="display:none;"/>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <img src="https://placehold.co/600x400" alt="ml-0 product-image"
                                     class="w-full sm:w-40 object-fill  rounded-2xl">
                            </div>
                            <div class="slider-controls">
                                <button class="ml-3" @click.stop="prevSlide">❮</button>
                                <button class="mr-3" @click.stop="nextSlide">❯</button>
                            </div>
                        </div>
                    </div>
                    <div class="flex-auto justify-evenly">
                        <div class="flex flex-wrap ">
<!--                            <div class="w-full flex-none text-sm flex items-center text-gray-600">-->
<!--                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500 mr-1"-->
<!--                                     viewBox="0 0 20 20" fill="currentColor">-->
<!--                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>-->
<!--                                </svg>-->
<!--                                <span class="text-gray-400 whitespace-nowrap mr-3">4.60</span><span-->
<!--                                    class="mr-2 text-gray-400">India</span>-->
<!--                            </div>-->
                            <div class="flex items-center w-full justify-between min-w-0 ">
                                <h2  @click="this.$router.push(`/product/${this.product.id}`)" class="text-lg mr-auto cursor-pointer text-gray-800 hover:text-purple-500 truncate ">
                                    {{ this.product.name }}</h2>
                                <div v-if="this.in_stock" style="max-width: fit-content"
                                     class="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                                    INSTOCK
                                </div>
                                <div v-else
                                     class="flex items-center bg-red-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                                    OUT OF STOCK
                                </div>
                            </div>
                        </div>
                        <div class="text-xl text-purple-950 font-semibold mt-1">{{ price[0].price }} BYN</div>
                        <div class="lg:flex  py-4  text-sm text-gray-600">
                            <div class="flex-1 inline-flex items-center  mb-3">
                                <div class="w-full flex-none text-sm flex items-center text-gray-600">
                                    <ul class="flex flex-row justify-center items-center space-x-2">
                                        <li class="" v-for="(color, index) in product.colors" :key="`color-${index}`">
                                            <span class="block p-1 border-2 border-gray-900 rounded-full transition ease-in duration-300"
                                            >
                                              <p class="block w-3 h-3 rounded-full"
                                                 :style="{ backgroundColor: color.hex_code }"
                                                 @click="this.selectedColor = color"></p>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="flex-1 inline-flex items-center mb-3">
                                <span class="text-secondary whitespace-nowrap mr-3">Size</span>
                                <div class="cursor-pointer text-gray-400 ">
                                    <span class="hover:text-purple-500 p-1 py-0" v-for="size in this.sizes"

                                          :key="size.id">{{ size.name }}</span>
                                    <!--                                    <span class="hover:text-purple-500 p-1 py-0">M</span>-->
                                    <!--                                    <span class="hover:text-purple-500 p-1 py-0">L</span>-->
                                    <!--                                    <span class="hover:text-purple-500 p-1 py-0">XL</span>-->

                                </div>
                            </div>
                        </div>
                        <div class="flex space-x-2 text-sm font-medium justify-center">
                            <button class="transition ease-in duration-300 w-1/2 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 "
                                    @click="this.$router.push(`/product/${this.product.id}`)"
                            >
                                <span class="w-full text-center">More</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>


<script>
import store from "../store";
import {ref} from "@vue/reactivity";

export default {
    name: "ProductCard",
    watch: {
        currentSlide(newVal) {
            const buttons = document.querySelectorAll('.slider-controls button');
            buttons.forEach((button, index) => {
                if (index === newVal) {
                    button.disabled = true;
                } else {
                    button.disabled = false;
                }
            });
        },
    },
    computed: {
        in_stock() {
            let sum = 0;
            for (const item of this.product.item_with_color) {
                sum += item.available_quantity;
            }
            return sum > 0
        },
        hoverBorder() {
            return {
                ":hover": {
                    borderColor: this.color.hex_code,
                },
            };
        },
    },
    props: {
        product: {
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        price: {
            required: true
        }
    },
    data() {
        return {
            currentSlide: 0,
            activeIndex: 0,
            quantity: 0,
            msg: "Add to cart",
            cart_prod: {
                quantity: 0,
                product: this.product,
                total: 0
            },
            selectedColor: null,
            sizes: []
        };
    },
    beforeMount() {
        let sssss = this.product.size.reduce((accumulator, currentValue) => {
            if (!accumulator.find(obj => obj.id === currentValue.id)) {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, []);
        this.sizes = sssss;
        this.selectedColor = this.product.colors[0]
    },
    methods: {
        updateTotal() {
            this.cart_prod.total = this.cart_prod.quantity * this.cart_prod.product["price"];
        },
        addToCart() {
            this.msg = this.quantity;
            this.updateTotal();
            store.commit('cart/addProduct', this.cart_prod);
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
        isActive(index) {
            return index === this.currentSlide;
        },
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.images.length;
        },
        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
        },
    },
};
</script>

<style scoped>
.prod-card {
    max-width: 300px;
}

.slider-controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.slider-controls button {
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
}

.product-image {
    display: block;
    margin: 0 auto;
    max-height: 300px;
    width: auto;
    max-width: 100%;
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
    min-width: 150px;
    width: 32%;
    justify-content: space-between;
}

@media screen and (max-width: 1145px) {
    .card {
        width: 30%;
    }
}

@media screen and (max-width: 700px) {
    .card {
        width: 45%;
    }
}


.add_cart {
    color: white;
    border: none;
    padding: 6px 12px;
    text-align: center;
    text-decoration: none;
    font-size: 14px;
    margin-bottom: 0;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 4px;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: pointer;
    margin-right: 5px;
    display: flex;
    justify-content: space-evenly;

}

.card-text {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    align-items: center;
}


.product-images {
    display: flex;
    position: relative;
    flex-direction: column;
    background: white;
    border-radius: 15px;
    max-width: 300px;
    justify-content: center;
    place-content: center;
    place-items: center;
    overflow: hidden;
    transition: 0.5s;
    max-height: 175px;
}
</style>