import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modals } from '../modal/modal.constants';
import { openModal } from '../modal/modal.slice';
import { useAppDispatch, useAppSelector } from '../store';
import { Cart } from './cart';
import { CategoriesList } from './categories-list';
import { Filter } from './filter';
import { ItemsDisplay } from './items-display';
import styles from './items-page.module.css';

export const ItemsPage = () => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <CategoriesList />
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.itemsContainer}>
            <Filter searchValue={searchValue} setSearchValue={setSearchValue} />
            <ItemsDisplay searchValue={searchValue} />
          </div>
        </div>
        {user.tag === 'data' && !user.admin && <Cart />}
      </div>
      {user.tag === 'data' && user.admin && (
        <Button
          variant="primary"
          className={styles.addItem}
          onClick={() => {
            dispatch(openModal({ modal: Modals.AddItem }));
          }}
        >
          Prideti prekę
        </Button>
      )}
    </>
  );
};
