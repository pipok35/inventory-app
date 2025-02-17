<template>
  <div class="item" :class="{ selected: selected }" @click="emit('selectItem', item)"
    @dragstart="emit('dragstart', item)" @dragend="emit('dragend')">
    <img :src="item.src" alt="" />
    <div class="quantity">{{ item.quantity }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ item: any; selected?: boolean }>();
const emit = defineEmits<{
  (event: 'selectItem', item: any): void;
  (event: 'dragstart', item: any): void;
  (event: 'dragend'): void;
}>();
</script>

<style lang="scss" scoped>
.item {
  min-width: 100px;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  .quantity {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #4D4D4D;
    padding: 4px;
    border-left: 1px solid #4D4D4D;
    border-top: 1px solid #4D4D4D;
    border-top-left-radius: 10px;
  }

  &.selected {
    box-shadow: 0 0 10px white;
  }
}
</style>
