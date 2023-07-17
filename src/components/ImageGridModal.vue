<script setup>
import VLazyImage from "v-lazy-image";
import {onMounted, ref} from 'vue'
import {useInfiniteScroll} from "@vueuse/core";
import axios from "axios";

const el = ref(null)
const images = ref([])
const nextPageUrl = ref('');
const page_num = ref(0);
const is_fav = ref(false);



function loadMoreImages() {
    console.log("!!!!!!!!!!!!!!!!LNONJKNBJKN")
    const urlParams = new URLSearchParams(nextPageUrl.value.split('?')[1]);
    const pageValue = urlParams.get('page');

    if(pageValue > page_num.value){
        page_num.value ++;
        axios.get(nextPageUrl.value).then(response => {
            images.value = [...images.value, ...response.data.results];
            nextPageUrl.value = response.data.next;
        });
    }
}

const change_filter = () => {
    images.value = [];
    let url = is_fav.value
        ? "http://127.0.0.1:8000/ai/prompt/i/?page=1&page_size=10&is_fav=true"
        : "http://127.0.0.1:8000/ai/prompt/i/?page=1&page_size=10";
    axios
        .get(url)
        .then((response) => {
            images.value = [...response.data.results];
            nextPageUrl.value = response.data.next;
            page_num.value = 1;
        })
        .catch((reason) => {
            this.$notify({
                text: reason.data,
            });
        });
}

useInfiniteScroll(
    el,
    () => {
        loadMoreImages();
    }
);

onMounted(()=>{
    axios.get('http://127.0.0.1:8000/ai/prompt/i/?page=1&page_size=10')
        .then(response => {
            images.value = [...response.data.results];
            nextPageUrl.value = response.data.next;
            page_num.value=1;
        })
        .catch(reason => {
            this.$notify({
                text: reason.data
            })
        });
})

//
// defineExpose({
//     getImages() {
//         return images.value
//     },
//     getnextPageUrl(){
//         return nextPageUrl.value
//     },
//     getpageNum(){
//         return page_num.value
//     },
//     getIs_fav(){
//         return is_fav.value
//     }
// })
//     return {
//         images,
//         nextPageUrl,
//         page_num,
//         is_fav,
//         change_filter
//     }
</script>
<template>
    <modal
            :isOpen="isOpen"
            @closeModal="onCloseModal"
            :header="'Image Grid'"
            class="sm:w-full"
    >
        <div class="space-y-4 h-96">
            <div class="flex flex-row justify-between">
                <button
                        :class="{ 'bg-blue-500': showAllImages, 'bg-blue-200': !showAllImages }"
                        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 focus:outline-none w-1/2"
                        @click="showAllImages = true; is_fav=false; change_filter();"
                >
                    All Images
                </button>
                <button
                        :class="{ 'bg-blue-500': !showAllImages, 'bg-blue-200': showAllImages }"
                        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-200 focus:outline-none w-1/2"
                        @click="showAllImages = false; is_fav=true; change_filter();"
                >
                    Favorite Images
                </button>
            </div>
            <div class="overflow-y-scroll h-80" ref="el">
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div
                            v-for="(image, index) in images"
                            :key="image.id"
                            @click="selectImage(image)"

                    >
                        <v-lazy-image
                                :src="'http://127.0.0.1:8000/'+image.image_path"
                                alt="Image"
                                class="w-full cursor-pointer"
                        />
                    </div>
                </div>
            </div>

        </div>
        <template #head_control>
            <div>
                <button
                        class="text-gray-500 hover:text-gray-700 focus:outline-none"
                        @click="onCloseModal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </template>
    </modal>
</template>

<script>
import Modal from "../components/UI/Modal.vue";

const setup = () => {
    return {
        images,
        nextPageUrl,
        page_num,
        is_fav,
    };
};

export default {
    components: {
        Modal,
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showAllImages: true
        };
    },
    // computed:{
    //     images(){
    //         return this.$refs.component.getImages();
    //     },
    //     nextPageUrl(){
    //         return this.$refs.component.getnextPageUrl()
    //     },
    //     page_num(){
    //         return this.$refs.component.getpageNum()
    //     },
    //     is_fav(){
    //         return this.$refs.component.getIs_fav()
    //     }
    // },
    methods: {
        selectImage(image) {
            this.$emit("selectImage", image);
            // this.isOpen = false;
            this.$emit("closeModal")
        },
        onCloseModal() {
            this.$emit("closeModal");
        },
        // change_filter(){
        //     this.images.value = []
        //     let url = this.is_fav.value ? 'http://127.0.0.1:8000/ai/prompt/i/?page=1&page_size=10&is_fav=true' : 'http://127.0.0.1:8000/ai/prompt/i/?page=1&page_size=10';
        //     axios.get(url)
        //         .then(response => {
        //             this.images.value = [...response.data.results];
        //             this.nextPageUrl.value = response.data.next;
        //             this.page_num.value=1;
        //         })
        //         .catch(reason => {
        //             this.$notify({
        //                 text: reason.data
        //             })
        //         });
        // }
    },
};
</script>