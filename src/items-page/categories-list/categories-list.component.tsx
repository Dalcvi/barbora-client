import axios from 'axios';
import React, { useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import styles from './categories-list.module.css';

export const CategoriesList = () => {
  const user = useAppSelector(state => state.user);
  const [isLoading, setIsLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([] as string[]);
  const navigateTo = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/item/category')
      .then(({ data }) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    <ListGroup horizontal className={styles.list}>
      <ListGroupItem className={styles.listItem}></ListGroupItem>
    </ListGroup>;
  }

  return (
    <ListGroup horizontal className={styles.list}>
      {user.tag === 'data' && !user.admin && categories.length === 0 && (
        <ListGroupItem className={styles.listItem} />
      )}
      {categories.slice(0, 5).map(category => (
        <ListGroupItem
          className={styles.listItem}
          key={category}
          onClick={() => {
            const encodedCategory = encodeURIComponent(category);
            navigateTo('/kategorija/' + encodedCategory);
          }}
        >
          {category}
        </ListGroupItem>
      ))}
      {user.tag === 'data' && !user.admin && (
        <ListGroupItem className={styles.cartItem}>KREPŠELIS</ListGroupItem>
      )}
    </ListGroup>
  );
};
