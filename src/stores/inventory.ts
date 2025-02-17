import { defineStore } from 'pinia';
import type { InventoryItem } from '@/types';

const mockItems: InventoryItem[] = [
  { id: '1', name: 'Item 1', description: 'Description 1', src: '/src/assets/images/1.png', quantity: 4 },
  { id: '2', name: 'Item 2', description: 'Description 2', src: '/src/assets/images/2.png', quantity: 2 },
  { id: '3', name: 'Item 3', description: 'Description 3', src: '/src/assets/images/3.png', quantity: 1 },
  { id: '4', name: 'Item 4', description: 'Description 4', src: '/src/assets/images/2.png', quantity: 3 },
  { id: '5', name: 'Item 5', description: 'Description 5', src: '/src/assets/images/3.png', quantity: 2 },
  { id: '6', name: 'Item 6', description: 'Description 6', src: '/src/assets/images/1.png', quantity: 2 },
  { id: '7', name: 'Item 7', description: 'Description 7', src: '/src/assets/images/2.png', quantity: 1 },
  { id: '8', name: 'Item 8', description: 'Description 8', src: '/src/assets/images/3.png', quantity: 3 },
  { id: '9', name: 'Item 9', description: 'Description 9', src: '/src/assets/images/1.png', quantity: 2 },
  { id: '10', name: 'Item 10', description: 'Description 10', src: '/src/assets/images/2.png', quantity: 1 },
];

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('inventory')) || [...mockItems, ...Array(25 - mockItems.length).fill(null)]
  }),
  actions: {
    updateInventory(slots: (InventoryItem | null)[]) {
      this.items = slots.slice(0, 25);
      localStorage.setItem('inventory', JSON.stringify(this.items));
    },
    removeItem(id: string, quantity: number): void {
      const itemIndex = this.items.findIndex(item => item?.id === id);
      if (itemIndex !== -1) {
        if (this.items[itemIndex]!.quantity > quantity) {
          this.items[itemIndex]!.quantity -= quantity;
        } else {
          this.items[itemIndex] = null; // Очищаем слот, но не сдвигаем
        }
        localStorage.setItem('inventory', JSON.stringify(this.items));
      }

      if (this.items.filter(item => item !== null).length === 0) {
        localStorage.removeItem('inventory');
      }
    }
  }
});
