<template>
  <div class="app">
    <InventoryView />
  </div>
</template>

<script setup lang="ts">
import InventoryView from '@/pages/InventoryView.vue';
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #121212;
}
</style>
