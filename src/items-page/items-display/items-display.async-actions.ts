import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ItemData } from "../item";
import { addItems } from "./";
import { setLoader } from '../../loader';

export const fetchItems = createAsyncThunk('items/fetchItems', async (_, { dispatch }) => {
    try {
        dispatch(setLoader({ key: 'items', value: true }));
        const response = await axios.get<ItemData[]>('/item');
        dispatch(addItems(response.data));
    }
    catch (error) {
        console.error(error);
    }
    finally {
        dispatch(setLoader({ key: 'items', value: false }));
    }
})