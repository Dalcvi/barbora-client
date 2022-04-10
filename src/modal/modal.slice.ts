import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Modals } from "./modal.constants";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {open: null, props: null} as {open: Modals | null, props: {[key: string]: any} | null},
    reducers: {
        openModal: (state, action: PayloadAction<{modal: Modals, props?: {[key:string]: any}}>) => {
            return {open: action.payload.modal, props: action.payload.props ?? null};
        },
        closeModal: (state) => {
            return { open: null, props: null };
        },
    }
});


export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;