import { useEffect } from 'react';
import { Pagination, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { Item, ItemData } from '../item';
import { fetchItems } from './';
import { ITEMS_PER_PAGE } from './items-display.constant';
import styles from './items-display.module.css';

export const ItemsDisplay = ({ searchValue }: { searchValue: string }) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const items = useAppSelector(state => state.items);
  const isLoading = useAppSelector(state => state.loader['items']);
  const category = params.category ? decodeURIComponent(params.category) : '';

  useEffect(() => {
    dispatch(
      fetchItems({
        categoryName: params.category || '',
        searchValue: searchValue,
        areThereAnyItemsLoaded: Object.keys(items).length > 0,
      })
    );
  }, [dispatch, params.category, searchValue]);

  if (isLoading) {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const itemList = Object.keys(items).map(key => {
    if (searchValue && !items[Number(key)].name.toLowerCase().includes(searchValue.toLowerCase())) {
      return null;
    }
    if (category && items[Number(key)].category !== category) {
      return null;
    }
    const itemProps = items[Number(key)] as ItemData;
    return (
      <Item
        key={key}
        id={itemProps.id}
        name={itemProps.name}
        image_url={itemProps?.image_url}
        quantity={itemProps.quantity}
        price={itemProps.price}
        weight={itemProps.weight}
        CreatedAt={itemProps.CreatedAt}
        description={itemProps.description}
      />
    );
  });

  return <ul className={styles.itemsGrid}>{itemList}</ul>;
};
