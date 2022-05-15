import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ItemData } from '../item';
import { addItems } from './';
import { setLoader } from '../../loader';

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (
    {
      categoryName,
      searchValue,
      areThereAnyItemsLoaded,
    }: { categoryName: string; searchValue: string; areThereAnyItemsLoaded: boolean },
    { dispatch }
  ) => {
    try {
      const decodedCategoryName = decodeURIComponent(categoryName);
      const categoryNameSearchParam = decodedCategoryName ? `&category=${decodedCategoryName}` : '';
      const searchValueSearchParam = searchValue ? `&q=${searchValue}` : '';
      if (!areThereAnyItemsLoaded) {
        dispatch(setLoader({ key: 'items', value: true }));
      }
      const response = await axios.get<ItemData[]>(
        '/item?' + categoryNameSearchParam + searchValueSearchParam
      );
      dispatch(addItems(response.data));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoader({ key: 'items', value: false }));
    }
  }
);
