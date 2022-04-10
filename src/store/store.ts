import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { cartReducer } from '../items-page/cart/cart.slice';
import { itemsReducer } from '../items-page/items-display/items-display.slice';
import { loaderReducer } from '../loader';
import { modalReducer } from '../modal/modal.slice';

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    items: itemsReducer,
    cart: cartReducer,
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
