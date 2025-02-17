<template>
  <div class="details">
    <button class="details__close" @click="$emit('close')">✖</button>
    <img :src="item.src" alt="" class="details__image">
    <div class="details__info">
      <p class="details__title">{{ item.name }}</p>
      <p class="details__description">{{ item.description }}</p>
    </div>
    <button v-if="!showDeleteInput" class="details__delete" @click="showDeleteInput = true">Удалить предмет</button>
    <div v-if="showDeleteInput" class="details__delete-confirm">
      <input type="number" v-model="deleteAmount" min="1" :max="item.quantity" class="details__input">
      <button class="details__cancel" @click="showDeleteInput = false">Отмена</button>
      <button class="details__confirm" @click="confirmDelete">Подтвердить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { useInventoryStore } from '@/stores/inventory';

const props = defineProps<{ item: any }>();
const emit = defineEmits(['close']);
const store = useInventoryStore();

const showDeleteInput = ref(false);
const deleteAmount = ref(1);

const confirmDelete = () => {
  store.removeItem(props.item.id, deleteAmount.value);
  emit('close');
};
</script>

<style lang="scss" scoped>
.details {
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  padding: 0 10px;
  background: #262626;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(0);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border: 1px solid #4D4D4D;

  .details__close {
    align-self: flex-end;
    background: none;
    border: none;
    padding: 10px;
    font-size: 18px;
    color: white;
    cursor: pointer;
  }

  .details__image {
    width: 60%;
    padding: 30px;
    border-radius: 10px;
  }

  .details__info {
    flex-grow: 1;
    border-top: 1px solid #4D4D4D;
    border-bottom: 1px solid #4D4D4D;
    width: 100%;
    display: flex;
    flex-direction: column;

    .details__title {
      font-size: 20px;
      text-align: center;
    }
  
    .details__description {
      font-size: 14px;
      flex-grow: 1;
      text-align: center;
    }
  }

  .details__delete {
    background: #FA7272;
    color: white;
    border: none;
    padding: 10px;
    margin: 20px;
    border-radius: 8px;
    width: 100%;
    cursor: pointer;
  }

  .details__delete-confirm {
    display: grid;
    gap: 10px;
    margin: 10px;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    .details__input {
      padding: 10px;
      margin: 5px 0px;
      border: 1px solid #4D4D4D;
      background-color: #262626;
      border-radius: 5px;
      color: white;
      grid-column-end: span 2;
    }

    .details__cancel,
    .details__confirm {
      border: none;
      cursor: pointer;
      width: 100%;
      padding: 10px;
      border-radius: 8px;
    }

    .details__cancel {
      background: white;
    }

    .details__confirm {
      background: #FA7272;
      color: white;
    }
  }
}

</style>
