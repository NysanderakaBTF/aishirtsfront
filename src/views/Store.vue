<template>
    <div class="flex flex-col ml-3">
        <div class="flex flex-row w-full store">
            <StoreFilter @data-updated="handleSearch" class="md:w-1/4 filter"></StoreFilter>
            <div class="w-full flex flex-wrap mt-5 ml-5">
                <productCard
                        class="carddd"
                        v-for="i in products"
                        :product="i"
                        :key="i.id"
                        :name="i.name"
                        :images="i.image"
                        :price="i.price"
                />
            </div>
        </div>
        <Pagination :current-page="this.current_page"
                    :items-per-page="this.items_per_page"
                    :total-items="this.total_items"
                    @pageChanged="this.changePage"
                    class="self-center"
        />
    </div>
</template>

<script>
import productCard from "../components/ProductCard.vue";
import store from "../store";
import axios from "axios";
import StoreFilter from "../components/StoreFilter.vue";
import authHeader from "../service/auth-header.js";
import Modal from "../components/UI/Modal.vue";
import Pagination from "../components/UI/Paginator.vue";

export default {
    name: "Store",
    components: {Pagination, Modal, StoreFilter, productCard},
    data() {
        return {
            is_openModal: false,
            sortOption: 0,
            categories: [],
            products: [],
            selectedCats: [],
            searchTitle: '',
            selectedSizes: [],
            items_per_page: 20,
            current_page: 1,
            total_items: 0,
            nextPageUrl:'',
            prevPageUrl:'',
        }
    },
    computed: {
        store() {
            return store
        },

        getCat() {
            return store.getters["category/getCats"];
            // return this.categories;
        }
    },
    methods: {
        sort() {
            if (this.sortOption == 1) {
                this.products = this.products.sort((a, b) => a.price - b.price);
            }
            if (this.sortOption == 2) {
                this.products = this.products.sort((a, b) => a.rating - b.rating);
            }
        },
        changePage(pageNumber){
            this.current_page = pageNumber;
            this.handleSearch()

        },
        handleSearch({ searchTitle = '', selectedSizes = [], selectedCats = [] }={}) {
            this.searchTitle = searchTitle;
            this.selectedSizes = selectedSizes;
            this.selectedCats = selectedCats;
            let sizeNames = [];
            for (const selectedSizesKey of this.selectedSizes) {
                sizeNames.push(selectedSizesKey.name)
            }
            let catNames = [];
            for (const selectedCatsKey of this.selectedCats) {
                catNames.push(selectedCatsKey.name)
            }

            console.log(catNames)
            console.log(sizeNames)
            console.log(this.selectedCats)
            console.log(this.selectedSizes)

            let newProducts = axios.get("http://localhost:8000/shop/items",  {
                    headers: authHeader(),
                    params: {
                        name: this.searchTitle,
                        category: catNames,
                        size: sizeNames,
                        page: this.current_page,
                        page_size: this.items_per_page
                    }
                }
            ).then(value => {
                this.products = value.data.results;
                this.total_items = value.data.count;
                this.prevPageUrl = value.data.previous;
                this.nextPageUrl = value.data['next'];
                console.log(value.data);
            })
        }
    },
    mounted() {
        this.categories = store.dispatch("category/getCategores");
        this.handleSearch();
    }

}
</script>

<style lang="scss">

@media screen and (max-width: 640px) {
    .filter{
        min-width: 100%;
    }
    .store{
        flex-direction: column;
    }
}
@media screen and (max-width: 768px) and (min-width: 640px){

    .carddd{
        max-width: 45% !important;
    }
}
</style>