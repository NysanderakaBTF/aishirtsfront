<template>
    <div class="products-catalog__filter">
        <div class="filter__category">

            <form @submit.prevent="performSearch">
                <label for="categories" class="text-left w-full">Categories:</label>
                <VueMultiselectEsm
                        id="categories"
                        v-model="selectedCats"
                        :options="getCat"
                        :multiple="true"
                        :taggable="true"
                        :close-on-select="false"
                        @tag="addTag"
                        label="name"
                        track-by="id"
                >
                </VueMultiselectEsm>

                <div class="inline-flex flex-wrap text-left w-full">
                    <label for="sizes" class="text-left w-full">Sizes:</label>
                    <VueMultiselectEsm
                        id="sizes"
                        v-model="selectedSizes"
                        :options="sizeOptions"
                        :multiple="true"
                        :close-on-select="false"
                        placeholder="Select sizes"
                        label="name"
                        track-by="id"
                    ></VueMultiselectEsm>
                </div>


                <div>
                    <div class="relative mt-4">
                        <input
                            class="bg-white rounded w-full px-4 py-2 pl-12 border border-gray-300 focus:outline-none focus:shadow-outline-purple focus:border-purple-500 text-base"
                            type="text"
                            placeholder="Search"
                            v-model="searchTitle"
                        >
                        <div class="absolute inset-y-0 left-0 flex items-center pl-4">
                            <svg
                                class="h-6 w-6 text-gray-400"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21 21l-4.35-4.35"></path>
                                <path d="M15.5 11a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z"></path>
                            </svg>
                        </div>
                    </div>
                </div>

            <button class="rounded bg-purple-700 w-full mt-2 text-white p-1" @click="handleSearch">
                Search
            </button>
            </form>
        </div>

        <!--        <div class="sort" style="border-top: 1px solid grey;">-->
        <!--            <h4>Сортировать по:</h4>-->
        <!--            <ul>-->
        <!--                <li>-->
        <!--                    <input type="radio" id="sortPrice" name="contact" value="1" v-model="sortOption" v-on:change="sort">-->
        <!--                    <label for="saleChoice1">Цене</label>-->
        <!--                </li>-->
        <!--                <li>-->
        <!--                    <input type="radio" id="sortRate" name="contact" value="2" v-model="sortOption" v-on:change="sort">-->
        <!--                    <label for="saleChoice2">Отзывам</label>-->
        <!--                </li>-->
        <!--            </ul>-->
        <!--        </div>-->
        <!--        <div class="cart" style="border-top: 1px solid grey;">-->
        <!--            <button class="cart_b">-->
        <!--                <router-link class="link" to="/cart">Перейти к заказу</router-link>-->
        <!--            </button>-->
        <!--        </div>-->
        <!--        <router-link to="/categories">-->
        <!--            <button v-if="store.state.auth.user != null && store.state.auth.userInfo.role === 'ADMIN'"-->
        <!--                    class="bg-gray-800 py-1 px-4 text-white rounded mt-3"-->
        <!--            >-->
        <!--                Add category-->

        <!--            </button>-->
        <!--        </router-link>-->
        <!--        <br>-->
        <!--        <router-link to="/product/add"-->
        <!--                     v-if="store.state.auth.user != null && store.state.auth.userInfo.role === 'ADMIN'">-->
        <!--            <button-->
        <!--                    class="bg-gray-800 py-1 px-4 text-white rounded mt-3"-->
        <!--            >Add product-->
        <!--            </button>-->
        <!--        </router-link>-->
    </div>
</template>

<script>
import store from "../store/index.js";
import axios from "axios";
import VueMultiselectEsm from "vue-multiselect";

export default {
    name: "StoreFilter",
    components: {VueMultiselectEsm},
    data() {
        return {
            sortOption: 0,
            categories: [],
            products: [],
            selectedCats: [],
            searchTitle: '',
            selectedSizes: [],
            sizeOptions: [
                { id: 'xs', name: 'XS' },
                { id: 's', name: 'S' },
                { id: 'm', name: 'M' },
                { id: 'l', name: 'L' },
                { id: 'xl', name: 'XL' },
                { id: 'xxl', name: 'XXL' },
            ],
        }
    },
    computed: {
        store() {
            return store
        },

        getCat() {
            return store.getters["category/getCats"];
        }
    },
    methods: {
        handleSearch(){
            this.$emit('data-updated', {
                selectedCats: this.selectedCats,
                searchTitle: this.searchTitle,
                selectedSizes: this.selectedSizes
            })
        },
        sort() {
            if (this.sortOption == 1) {
                this.products = this.products.sort((a, b) => a.price - b.price);
            }
            if (this.sortOption == 2) {
                this.products = this.products.sort((a, b) => a.rating - b.rating);
            }
        },
        addTag(newTag) {
            console.log(newTag)
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.taggingOptions.push(tag)
            this.taggingSelected.push(tag)
        },
        performSearch() {
            console.log(this.selectedCats)
        }
    },
    mounted() {
        store.dispatch("category/getCategores");
    }

}
</script>

<style src="../assets/multiselect.css">

</style>