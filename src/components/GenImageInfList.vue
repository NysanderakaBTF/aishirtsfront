<script setup>
import {ref, onMounted} from "vue";
import axios, {formToJSON} from "axios";
import {useInfiniteScroll, watchDeep} from "@vueuse/core";
import authHeader from "../service/auth-header.js";

const container = ref(null);
const images = ref(null);
const nextPageUrl = ref('');
const page_num = ref(0);

function loadMoreImages() {
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



useInfiniteScroll(container,
    ()=>{loadMoreImages();}, {
    distance:0
    });
</script>

<script>
import FavButton from "./UI/FavButton.vue";
import VLazyImage from "v-lazy-image";
import Modal from "./UI/Modal.vue";
import {images} from "../store/image.module.js";
import store from "../store/index.js";



export default {
    imgs: images,
    name: 'InfiniteScrollComponent',
    components: {Modal, VLazyImage, FavButton},
    computed: {
        promptImages() {
            return store.state.prompt_images;
        }
    },
    props:{
      imagea:{
          type: Array
      }
    },
    watch: {
        imagea: {
            handler() {
                this.fetchImages();
            },
            deep: true,
        },
    },
    data() {
        return {
            imagetoWatch: '',
            isModalOpen: false,
            modalButtons: [
                {
                    text: "Delete",
                    class: "bg-red-400 hover:bg-purple-500",
                    action: this.deleteImage,
                },
                {
                    text: "Close",
                    class: "bg-gray-400 hover:bg-gray-500",
                    action: this.closeModal,
                }

            ],
        };
    },
    methods: {
        addToFav(dispImg) {
            dispImg.is_favorite = !dispImg.is_favorite
            axios.put(`http://127.0.0.1:8000/ai/prompt/i/${dispImg.id}/`, {
                'is_favorite': dispImg.is_favorite
            })
        },
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        fetchImages(initialLoad = true) {
            const url = initialLoad
                ? "http://127.0.0.1:8000/ai/prompt/i/?page=1&page_size=10"
                : nextPageUrl;

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
        },
        deleteImage() {
            let idd = this.imagetoWatch.id;
            axios.delete(`http://127.0.0.1:8000/ai/prompt/i/${this.imagetoWatch.id}`).then(value => {
                this.closeModal();
                // this.prompt_images = this.prompt_images.filter(value1 => value1.id !== idd);
                store.commit('setImages',  this.prompt_images.filter(value1 => value1.id !== idd));
            })
            window.location.reload();
        }
    }

};


</script>


<template>
    <div ref="container" class="flex flex-row flex-wrap justify-center ml-2 overflow-auto generated align-center"
         style="max-height: 60vh;">
        <v-lazy-image
                class="w-32 h-32 mt-2 ml-2 rounded"
                v-for="(image, index) in images"
                :src="'http://127.0.0.1:8000/'+image.image_path"
                src-placeholder='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png'
                @click="this.imagetoWatch = image; this.isModalOpen = true"
                :key="image.id"
        />
        <modal
                :is-open="this.isModalOpen"
                backdrop
                header="Your image"
                :buttons="modalButtons"
                @close-modal="imagetoWatch = null; this.isModalOpen = false;"
        >
            <template #head_control style="width: 22px">
                <FavButton
                        style="width: 22px"
                        :is-added="imagetoWatch.is_favorite"
                        @update:isAdded="addToFav(imagetoWatch)"
                />
            </template>

            <div v-if="imagetoWatch" class="text-center">
                <img :src=" 'http://127.0.0.1:8000/'+ imagetoWatch.image_path" class="mx-auto max-h-screen rounded-lg"
                     alt="selected image"/>
            </div>
        </modal>
    </div>
</template>