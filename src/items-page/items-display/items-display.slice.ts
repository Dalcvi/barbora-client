import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { ItemData } from '../item';

const initialState = {} as { [key: number]: ItemData };

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemData>) => {
      return { ...state, [action.payload.id]: action.payload };
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const newState = { ...state };
      delete newState[action.payload];
      return { ...newState };
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = { ...state[action.payload.id] };
      item.quantity = item.quantity - action.payload.quantity;

      return { ...state, [action.payload.id]: item };
    },
    addItems: (state, action: PayloadAction<ItemData[]>) => {
      const newState = { ...state } as { [key: number]: ItemData };
      action.payload.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    },
  },
});

export const { addItem, removeItem, updateQuantity, addItems } = itemsSlice.actions;
export const itemsReducer = itemsSlice.reducer;
