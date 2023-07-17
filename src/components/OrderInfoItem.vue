<template>
    <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start orrrr">
        <div class="w-full">
            <div class="flex flex-row space-between items-baseline">
                <span><h2 class="text-lg font-bold text-gray-900 mb-3">{{ this.product.item.item.name }}</h2></span>
                <span class="ml-0.5 mr-0.5 font-bold">{{this.product.item.size.name}}</span>
                <div class="ml-1 mr-1 w-3 h-3 rounded colore" :style="{backgroundColor: this.product.item.color.hex_code}"></div>
                <span><h2 class="text-lg font-bold text-gray-900 mb-3 ml-1">{{this.product.quantity}}x{{ this.product.item.price }} BYN</h2></span>
			</div>

            <div class="flex justify-between items-center ">
                <div class="flex items-center flex-wrap">
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
                    <img    v-if="this.product.gimage!==null"
                            :src="'http://127.0.0.1:8000/' + this.product.gimage.image_path"
                            alt="promptImage"
                            class="w-40 rounded-lg"
                    />
                    <img    v-else
                            src="https://placehold.co/500x500"
                            alt="promptImage"
                            class="w-40 rounded-lg"
                    />
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
    name: "OrderInfoItem",
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
.space-between{
    justify-content: space-between;
}
@media screen and (max-width: 557px)  {
    h2{
		margin-left: 0;
	}

}

.btntoggle {
    display: none;

}
.orrrr{
    max-width: fit-content;
}

.cross{
	max-width: 10px;
}
.colore{
	max-width: 11px;
	border-width: 2px;
	border-color: #35495e;
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



</style>