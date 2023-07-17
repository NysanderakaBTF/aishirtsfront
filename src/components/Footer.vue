<template>
  <footer class="bg-purple-700 py-10 foot">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white">
        <span class="font-bold text-lg">MindFashion</span>
        <br>
        <span class="text-sm">A great site for everyone.</span>
      </div>
      <div class="text-white">
        <span class="font-bold text-lg">Contact Us</span>
        <br>
        <span class="text-sm">123 Main Street</span>
        <br>
        <span class="text-sm">Anytown, USA 12345</span>
      </div>
      <div class="text-white">
        <span class="font-bold text-lg">Follow Us</span>
        <br>
        <span class="text-sm">Facebook</span>
        <br>
        <span class="text-sm">Twitter</span>
      </div>
    </div>
    <div class="container mx-auto text-center mt-4">
      <span class="text-white text-sm">&copy; 2023 MindFashion. All rights reserved.</span>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
}
</script>
<style scoped>
.foot{
  left: 0;
  bottom: 0;
  text-align: center;
}
</style>