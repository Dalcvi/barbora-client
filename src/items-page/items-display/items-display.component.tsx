import { useEffect } from 'react';
import { Pagination, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { Item, ItemData } from '../item';
import { fetchItems } from './';
import { ITEMS_PER_PAGE } from './items-display.constant';
import styles from './items-display.module.css';

export const ItemsDisplay = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const items = useAppSelector((state) => state.items);
  const isLoading = useAppSelector((state) => state.loader['items']);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  if (isLoading) {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const itemList = Object.keys(items).map((key) => {
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
