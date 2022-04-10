import { ListGroup, ListGroupItem } from 'react-bootstrap';
import styles from './categories-list.module.css';

export const CategoriesList = () => {
  return (
    <ListGroup horizontal className={styles.list}>
      <ListGroupItem className={styles.listItem}>KATEGORIJA</ListGroupItem>
      <ListGroupItem className={styles.listItem}>KATEGORIJA</ListGroupItem>
      <ListGroupItem className={styles.listItem}>KATEGORIJA</ListGroupItem>
      <ListGroupItem className={styles.listItem}>KATEGORIJA</ListGroupItem>
      <ListGroupItem className={styles.listItem}>KATEGORIJA</ListGroupItem>
      <ListGroupItem className={styles.listItem}>KREPSELIS</ListGroupItem>
    </ListGroup>
  );
};
