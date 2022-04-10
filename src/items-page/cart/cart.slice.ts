import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./cart.interfaces";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {} as { [key: number]: CartItem },
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            if(state[action.payload.itemId]) {
                const item = { ...state[action.payload.itemId] };
                item.quantity = item.quantity + action.payload.quantity;
                return { ...state, [action.payload.itemId]: item };
            }
            return { ...state, [action.payload.itemId]: action.payload }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const newState = { ...state };
            delete newState[action.payload];
            return { ...newState }
        },
        updateQuantity: (state, action: PayloadAction<{ itemId: number, quantity: number }>) => {
            const item = { ...state[action.payload.itemId] };
            item.quantity = action.payload.quantity;
            return { ...state, [action.payload.itemId]: item }
        },
        clearCart: (state) => {
            return {}
        },
    }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;