<template>
<img class="bg-cover bg-center bg-no-repeat h-screen" src="/src/assets/abstract-artwork-artistic-art-tg.jpg"/>
<div class="w-full bg-transparent ml-2 mr-2 flex flex-col justify-center items-center" style="height: 100vh">
  <h1 class="text-5xl text-white font-bold mb-8">Custom AI Shirts</h1>
  <p class="text-2xl text-gray-400 mb-12">Create your own personalized AI-designed shirts</p>
  <div class="max-w-7xl w-full mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-purple-800 overflow-hidden shadow-sm rounded-lg flex flex-col items-center justify-center p-6">
        <h2 class="text-2xl font-bold mb-2 text-white">Shirt Generator</h2>
        <p class="text-gray-400 text-lg mb-6">Use our AI-powered generator to create your own unique shirts in seconds!</p>
        <router-link to="/generator" class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full">Go to Generator</router-link>
      </div>
      <div class="bg-purple-800 overflow-hidden shadow-sm rounded-lg flex flex-col items-center justify-center p-6">
        <h2 class="text-2xl font-bold mb-2 text-white">Shirt Shop</h2>
        <p class="text-gray-400 text-lg mb-6">Browse our collection of custom shirts that you can purchase today!</p>
        <router-link to="/shop" class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full">Go to Shop</router-link>
      </div>
    </div>
  </div>
</div>

</template>
<script>
export default {
}
</script>
<style>
.bg-cover {
  z-index: -1;
  top:0;
  height: 100vh;
  filter: blur(2px) brightness(0.7);
  position: fixed;
  width: 100vw;
}
</style>