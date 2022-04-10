import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {} as { [key: string]: boolean },
    reducers: {
        setLoader: (state, action: PayloadAction<{ key: string, value: boolean }>) => {
            state[action.payload.key] = action.payload.value;
        }
    }
});

export const { setLoader } = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;