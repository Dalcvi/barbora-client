import { Button } from 'react-bootstrap';
import { Modals } from '../modal/modal.constants';
import { openModal } from '../modal/modal.slice';
import { useAppDispatch } from '../store';
import { Cart } from './cart';
import { CategoriesList } from './categories-list';
import { Filter } from './filter';
import { ItemsDisplay } from './items-display';
import styles from './items-page.module.css';

export const ItemsPage = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <CategoriesList />
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.itemsContainer}>
            <Filter />
            <ItemsDisplay />
          </div>
        </div>
        <Cart />
      </div>
      <Button
        variant="primary"
        className={styles.addItem}
        onClick={() => {
          dispatch(openModal({ modal: Modals.AddItem }));
        }}
      >
        Prideti prekę
      </Button>
    </>
  );
};
