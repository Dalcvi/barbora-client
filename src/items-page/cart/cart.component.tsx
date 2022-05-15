import { Button } from 'react-bootstrap';
import { Modals } from '../../modal/modal.constants';
import { openModal } from '../../modal/modal.slice';
import { useAppDispatch, useAppSelector } from '../../store';
import { ItemData } from '../item';
import { updateQuantity } from '../items-display';
import styles from './cart.module.css';
import { removeItem } from './cart.slice';

export const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const items = useAppSelector(state => state.items);
  const cartItems = Object.keys(cart).map(key => {
    return cart[Number(key)];
  });
  const totalPrice = Object.keys(cart).reduce((acc, key) => {
    const total = acc + items[Number(key)].price * cart[Number(key)].quantity;
    return total;
  }, 0);

  return (
    <div className={styles.cart}>
      <div className={styles.contentContainer}>
        <div className={styles.cartItems}>
          {cartItems.map(cartItem => (
            <CartItem
              key={cartItem.itemId}
              item={items[cartItem.itemId]}
              quantityInCart={cartItem.quantity}
            />
          ))}
        </div>
        <div className={styles.checkoutButtonWrapper}>
          {cartItems.length !== 0 && (
            <p className={styles.totalPrice}>Pilna kaina: {totalPrice}€</p>
          )}
          <Button
            variant="primary"
            className={styles.checkoutButton}
            disabled={cartItems.length === 0}
            onClick={() => {
              dispatch(openModal({ modal: Modals.FinishOrder }));
            }}
          >
            Užsisakyti
          </Button>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, quantityInCart }: { item: ItemData; quantityInCart: number }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemInfo}>
        <div className={styles.cartItemName}>Prekė: {item.name}</div>
        <div className={styles.cartItemQuantity}>Kiekis: {quantityInCart}</div>
      </div>
      <Button
        variant="danger"
        onClick={() => {
          dispatch(removeItem(item.id));
          dispatch(updateQuantity({ id: item.id, quantity: -quantityInCart }));
        }}
      >
        Išimti
      </Button>
    </div>
  );
};
