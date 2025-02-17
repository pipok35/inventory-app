<template>
  <div class="container">
    <div class="inventory">
      <InventorySidebar />
      <div class="inventory__content">
        <div class="inventory__grid">
          <InventoryItem v-for="item in store.items" :key="item.id" :item="item" :draggedItemId="draggedItemId"
            @swapItems="swapItems" @updateDraggedItem="updateDraggedItem" @selectItem="selectItem" />
        </div>
        <transition name="slide">
          <ItemDetails v-if="selectedItem" :item="selectedItem" @close="selectedItem = null" />
        </transition>
      </div>
    </div>
    <div class="inventory__footer">
      <button class="inventory__footer__close" @click="$emit('close')">✖</button>
      <div class="inventory__footer__skeleton"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useInventoryStore } from '@/stores/inventory';
import InventoryItem from '@/components/InventoryItem.vue';
import ItemDetails from '@/components/ItemDetails.vue';
import InventorySidebar from '@/components/InventorySidebar.vue';

const store = useInventoryStore();
const selectedItem = ref(null);
const draggedItemId = ref<string | null>(null);

const selectItem = (item: any) => {
  selectedItem.value = item;
};

const updateDraggedItem = (id: string | null) => {
  draggedItemId.value = id;
};

const swapItems = (sourceId: string, targetId: string) => {
  store.swapItems(sourceId, targetId);
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .inventory {
    display: flex;
    gap: 24px;
    position: relative;

    .inventory__content {
      flex-grow: 1;
      position: relative;

      .inventory__grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
        background: #262626;
        border-radius: 20px;
        border: 1px solid #4D4D4D;
        overflow: hidden;
        position: relative;
      }
    }
  }

  .inventory__footer {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #4D4D4D;
    background: #262626;
    flex: 1;
    position: relative;

    .inventory__footer__close {
      background: none;
      border: none;
      font-size: 16px;
      color: white;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
    }

    .inventory__footer__skeleton {
      background: linear-gradient(90deg, #3C3C3C 25%, #444444 50%, #333333 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite linear;
      border-radius: 4px;
      width: 90%;
      height: 30px;
    }

    @keyframes skeleton-loading {
      0% {
        background-position: 100% 0;
      }

      100% {
        background-position: -100% 0;
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
