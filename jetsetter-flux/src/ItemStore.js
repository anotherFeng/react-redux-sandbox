import EventEmitter from 'events';
import { uniqueId } from 'lodash';

import AppDispatcher from './AppDispatcher';

let items = [
  { value: 'Pants', id: uniqueId(), packed: false },
  { value: 'Jacket', id: uniqueId(), packed: false },
  { value: 'iPhone Charger', id: uniqueId(), packed: false },
  { value: 'MacBook', id: uniqueId(), packed: false },
  { value: 'Sleeping Pills', id: uniqueId(), packed: true },
  { value: 'Underwear', id: uniqueId(), packed: false },
  { value: 'Hat', id: uniqueId(), packed: false },
  { value: 'T-Shirts', id: uniqueId(), packed: false },
  { value: 'Belt', id: uniqueId(), packed: false },
  { value: 'Passport', id: uniqueId(), packed: true },
  { value: 'Sandwich', id: uniqueId(), packed: true },
];

class ItemStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      if(action.type === 'ADD_NEW_ITEM') {
        return this.addItem(action.item);
      }

      if(action.type === 'TOGGLE_ITEM') {
        return this.toggleItem(action.item);
      }

      if(action.type === 'REMOVE_ITEM') {
        
        items = items.filter((item) => {
          return item.id !== action.item.id;
        });
        console.log("removed", action.item)
        this.emit('change');
      }
    });
  }

  getItems() {
    return items;
  };

  addItem(item) {
    items = [...items, item];
    this.emit('change');
  }

  toggleItem(updatedItem) {
    items = items.map((item) => {
      return item.id === updatedItem.id ? updatedItem : item;
    });
    this.emit('change');
  }

  removeItem(itemToRemove) {
    items = items.filter((item) => {
      return items.id !== itemToRemove.id;
    });
    this.emit('change');
  }
};

export default new ItemStore();