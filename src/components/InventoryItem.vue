<template>
  <div class="item" :class="{ selected: selected }" draggable="true" @dragstart="onDragStart" @dragend="onDragEnd" @dragover.prevent @drop="onDrop" @click="emit('selectItem', item)">
    <img :src="item.src" alt="">
    <div class="quantity">{{ item.quantity }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ item: any; draggedItemId: string | null; selected?: boolean }>();
const emit = defineEmits<{
  (event: 'swapItems', sourceId: string, targetId: string): void;
  (event: 'updateDraggedItem', id: string | null): void;
  (event: 'selectItem', id: string | null): void;
}>();

const onDragStart = () => {
  emit('updateDraggedItem', props.item.id);
};

const onDragEnd = () => {
  emit('updateDraggedItem', null);
};

const onDrop = () => {
  if (props.draggedItemId !== null && props.draggedItemId !== props.item.id) {
    emit('swapItems', props.draggedItemId, props.item.id);
  }
};
</script>

<style lang="scss" scoped>
.item {
  min-width: 100px;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #4D4D4D;
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
    box-shadow: 0 0 10px white
  }
}
</style>
