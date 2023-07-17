<template>
    <div class="bg-white rounded-lg overflow-hidden shadow-md relative wwww">
        <img v-if="this.image != null" :src="'http://127.0.0.1:8000/'+image.image" alt="Card image" class="h-48 w-full m-0 p-0" style="min-width: 125px; height: 125px;">
        <img v-else src="https://placehold.co/125x125" alt="Img placeholder" class="h-48 object-cover">
        <div class=" qqqq absolute left-0 w-full h-10 flex flex-col justify-center items-center text-center">
            <h3 class="text-lg font-semibold mb-2 text-white">{{ title }}</h3>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        image: {
            type: String || Object,
            default: null
        },
        title: {
            type: String,
            required: true
        }
    }
};
</script>
<style scoped>
.wwww{
    width: 125px; /* set the width */
    height: 125px; /* set the height */
    margin: 4px;
    box-sizing: border-box;
    padding: 0;
}
.qqqq{
    background: #250F3A5A;
    bottom: 0;
}
/* Customize with your own styles */
</style>