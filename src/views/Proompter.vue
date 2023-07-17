<script setup>
import VueSlider from "vue-slider-component";
import 'vue-slider-component/theme/default.css'
import TemplateCard from "../components/TemplateCard.vue";
import VLazyImage from "v-lazy-image";
import store from "../store/index.js";
import RollerLoader from "../components/UI/Spinner.vue";
import Modal from "../components/UI/Modal.vue";
import FavButton from "../components/UI/FavButton.vue";
import Checkout from "./payments/Checkout.vue";
import GenImageInfList from "../components/GenImageInfList.vue";
</script>
<template>
	<!--    <div class="flex flex-col flex-wrap min-h-screen text-gray-800 bg-slate-50">-->
	<!-- Prompt templates dropdown -->
    <div class="mt-5 cont">
        <div class="flex flex-col flex-wrap w-full style">
            <h3 class="block mb-1 font-semibold">Select prompt template:</h3>
            <div class="template flex flex-row flex-wrap w-full px-4 py-2 m-0 mb-4 border-b-2">

                <div v-for="(template, index) in promptTemplates" :value="index" :key="template.id">
                    <TemplateCard
                            @click="selectStyle(index)"
                            v-bind:class="{active: index == selectedStyle}"
                            :image='template.images.length != 0 ? template.images[0] : null'
                            :title="truncateTemplateText(template.prompt)"
                    />
                </div>
            </div>
        </div>

        <!-- Image space -->
        <div class="flex flex-row items-center justify-center flex-wrap image mr-5">
            <v-lazy-image class="flex ml-2 mt-2"
                          style="max-width: 45%; min-width: 255px; min-height: 255px; max-height: 45%"
                          v-for="image in generatedImages"
                          :src="'http://127.0.0.1:8000/'+image.image_path" :key="image.id"/>
            <RollerLoader v-if="this.is_loading"/>
            <div v-if="generatedImages.length < 1 && !this.is_loading">
                <p>Your images will appear here</p>
            </div>
        </div>

        <div class="flex flex-row items-center w-full prompt">
            <div class="flex flex-col flex-grow">
                <label class="block mb-1 font-semibold">Prompt text:</label>
                <textarea v-model="promptText" class="block w-full px-3 py-2 mb-2 border-gray-300 rounded-lg shadow-sm"
                          rows="3" style="border-width: 1px;"></textarea>
            </div>
            <button class="w-1/6 h-10 ml-2 text-white rounded" style="
            background: rgb(60,122,149);
            background: linear-gradient(276deg, rgba(37,15,58) 0%, rgb(97,73,175) 100%, rgb(97,73,175) 100%, rgba(100,34,68) 100%);
            "
                    @click="generate">
                Generate
            </button>
        </div>
        <!-- Prompt area and slider -->
        <div class="config">
            <div v-if="store.state.auth.user !== null"
                 class="bg-gradient-to-br from-purple-800 to-red-600 rounded-md p-1 mb-2">
                <router-link to="/generator/buy">
                    <p class="text-white text-center">Balance: {{ store.getters["auth/getLeftPromps"] }}</p>
                </router-link>
            </div>
            <p class="font-bold">Settings:</p>
            <div class="flex flex-col w-4/5">
                <label class="block mb-1 font-semibold">Number of generated images:</label>
                <span class="text-lg font-medium">{{ numGenerated }}</span>
                <vue-slider v-model="numGenerated" :adsorb="true" :max="4" :min="1" :data="[1, 4]"></vue-slider>
            </div>
            <!--            <label class="block mt-2 mb-1 font-semibold">Prompt strength:</label>-->
            <div class="flex flex-col w-4/5">
                <label class="block mt-2 mb-1 font-semibold">Prompt strength:</label>
                <span class="text-lg font-medium">{{ promptStrength }}</span>
                <vue-slider v-model="promptStrength" :min="1" :max="20" :interval="0.01"></vue-slider>
            </div>
        </div>


        <!--       all generated images list-->
        <div class="flex flex-row min-w-fit overscroll-x-contain flex-wrap justify-center ml-2 overflow-auto generated align-center"
             style="max-height: 60vh;" :key="componentKey">
            <GenImageInfList :key="'aaa-'+componentKey" :imagea="generatedImages" :modal-buttons="this.modalButtons"/>
        </div>

    </div>
</template>
<script>
import axios, {formToJSON} from "axios";
import authHeader from "../service/auth-header.js";
import {reactive} from "vue";

export default {
    components: {GenImageInfList},
    data() {
        return {
            imagetoWatch: '',
            promptTemplates: [],
            selectedTemplate: null,
            promptText: '',
            numGenerated: 1,
            promptStrength: 7,
            generatedImages: reactive([]),
            selectedStyle: null,
            prompt_images: [],
            is_loading: false,
            isModalOpen: false,
            error: false,
            componentKey: 0
        }
    },
    computed: {
        selectedImage() {
            return []
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/ai/prompt/template/', {
            headers: authHeader()
        }).then(value => this.promptTemplates = value.data).catch(reason => alert(reason))
        axios.get('http://127.0.0.1:8000/ai/prompt/i/', {
            headers: authHeader()
        }).then(value => {
            store.commit('setImages', value.data);
            this.prompt_images = value.data;
        })
    },
    methods: {
        addToFav(dispImg) {
            dispImg.is_favorite = !dispImg.is_favorite
            axios.put(`http://127.0.0.1:8000/ai/prompt/i/${dispImg.id}/`, {
                'is_favorite': dispImg.is_favorite
            }, {
                headers: authHeader()
            })
        },
        openModal() {
            this.isModalOpen = true;
        },
        selectStyle(index) {
            if (this.selectedStyle === index) {
                this.selectedStyle = null;
                return;
            }
            console.log(index);
            this.selectedStyle = index;
            this.promptStrength = this.promptTemplates[index].guidance_scale;
        },
        getPrompts() {
            axios.get('http://127.0.0.1:8000/ai/prompt/i/', {
                headers: authHeader()
            }).then(value => {
                store.commit('setImages', value.data);
                this.prompt_images = value.data;
            })
        },


        truncateTemplateText(text) {
            if (text.length <= 15) {
                return text;
            }
            return text.substring(0, 20) + '...';
        },
        generate() {
            this.generatedImages = [];
            this.is_loading = true;
            axios.post('http://127.0.0.1:8000/ai/prompt/executor/', {
                "prompt": this.selectedStyle ? this.promptText + ' ' + this.promptTemplates[this.selectedStyle]['prompt'] : this.promptText,
                "width": 512,
                "height": 512,
                "ai_model": this.selectedStyle ? this.promptTemplates[this.selectedStyle].ai_model : 1,
                "owner": store.state.auth.userInfo.id,
                "scheduler": 1,
                'guidance_scale': this.promptStrength,
                'num_outputs': this.numGenerated

            }).then(
                value => {
                    this.componentKey += 1;
                    this.generatedImages = value.data.images;
                    store.commit('addImages', l).// store.dispatch('fetchImages');
                        // this.prompt_images = store.getters.getImages;
                        this.is_loading = false;
                    this.error = false;

                }
            ).catch(reason => {
                this.error = true;
                this.is_loading = false;
                this.$notify({text: reason.response.data.detail, type: 'error'})

            })
        },

    }
}
</script>
<style lang="scss">
.favb {
  width: 22px;
  max-height: 20px;
  position: relative;
}

.vue-slider-process {
  background-color: #6149af;
  border-radius: 15px;
}

.vue-slider-dot-tooltip-inner {
  border-color: #6149af;
  background-color: #6149af;
}

.cont {
  display: grid;
  grid-template-columns: 0.7fr 1.7fr 0.6fr;
  grid-template-rows: 1fr 1.6fr 0.4fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "style image config"
    "style image generated"
    "style prompt generated";
}

.style {
  grid-area: style;
}

.config {
  grid-area: config;
}

.prompt {
  grid-area: prompt;
}

.image {
  grid-area: image;
}

.generated {
  grid-area: generated;
  min-width: 8rem;
}

.active {
  border-width: 4px;
  border-color: #af43ff;
  -webkit-border-radius: 1px;
  -moz-border-radius: 1px;
  border-radius: 1px;
  padding: 0;
  margin: 0;
}

@media screen and (max-width: 895px) and (min-width: 641px) {
  .style {
    max-width: min-content;

    > h3 {
      align-self: center;
      text-align: center;
      max-width: min-content;
    }
  }
  .cont {
    display: grid;
    grid-template-columns: 0.7fr 1.7fr 0.6fr;
    grid-template-rows: auto auto auto;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
        "style image config"
        "prompt prompt prompt"
        "generated generated generated  ";
  }
  .prompt {
    max-height: min-content;
    justify-content: space-evenly;

    div {
      flex-grow: 0;
      width: 70%;
    }
  }
}

@media screen and (max-width: 640px) {
  .cont {
    display: grid;
    grid-template-columns: 1.4fr auto 0.6fr;
    grid-template-rows: 0.8fr auto auto auto;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
        "style style config"
        "image image image"
        "prompt prompt prompt"
        "generated generated generated";
  }
  .style {
    flex-direction: column;
    flex-wrap: nowrap;
    max-height: 100%;
    min-height: 100%;
    grid-column-start: 1;
    grid-column-end: 3;

    > div {
      min-height: 30%;
      width: 100%;
      overflow: scroll;
      grid-column-start: 1;
      grid-column-end: 3;
    }

    .template {
      flex-direction: row;
      flex-wrap: wrap;
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
  .image {
    min-height: 50px;
  }

}
</style>