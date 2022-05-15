import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useAppSelector } from '../store';
import Cards, { Focused } from 'react-credit-cards';
import styles from './orders.module.css';

interface Order {
  id: number;
  address: string;
  comment: string;
  postal_code: string;
  deliver_at: string;
  created_at: string;
  price: string;
  status: string;
  order_items: ItemFromOrder[];
}

interface ItemFromOrder {
  item_id: number;
  order_id: number;
  price: string;
  quantity: number;
}

export const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const user = useAppSelector(state => state.user);
  const fetchOrders = async () => {
    setIsLoading(true);
    axios
      .get('/order')
      .then(({ data }) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ListGroup>
        {orders.map(order => (
          <OrderItem
            key={order.id}
            order={order}
            isAdmin={user.tag === 'data' && user.admin}
            fetchOrders={fetchOrders}
          />
        ))}
      </ListGroup>
    </Container>
  );
};

export const OrderItem = ({
  order,
  isAdmin,
  fetchOrders,
}: {
  order: Order;
  isAdmin: boolean;
  fetchOrders: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focused, setFocused] = useState<Focused | undefined>(undefined);

  const onFinishClick = () => {
    setIsLoading(true);
    axios
      .post(`/order/${order.id}/finalize`)
      .then(() => {
        setIsLoading(false);
        fetchOrders();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const onPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const expiration_year = Number(expiry.split('-')[0]);
    const expiration_month = Number(expiry.split('-')[1]);
    axios
      .post(`/order/${order.id}/pay`, {
        first_name: fullName.split(' ')[0],
        last_name: fullName.split(' ')[1] ?? '',
        card_number: number,
        expiration_year,
        expiration_month,
        secret_code: Number(cvc),
      })
      .then(() => {
        setIsLoading(false);
        fetchOrders();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const onRemoveClick = () => {
    setIsLoading(true);
    axios
      .delete(`/order/${order.id}`)
      .then(() => {
        setIsLoading(false);
        fetchOrders();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <ListGroup.Item className={styles.orderItem}>
      <form onSubmit={onPaymentSubmit}>
        <div className={styles.orderInfo}>
          <div className={styles.orderInfoItem}>
            <label>Adresas:</label>
            <input type="text" value={order.address} readOnly className={styles.orderInfoInput} />
          </div>
          <div className={styles.orderInfoItem}>
            <label>Pasto kodas:</label>
            <input
              type="text"
              value={order.postal_code}
              readOnly
              className={styles.orderInfoInput}
            />
          </div>
          <div className={styles.orderInfoItem}>
            <label>Pristatymo data:</label>
            <input
              type="text"
              value={new Date(order.deliver_at)
                .toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' })
                .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')}
              readOnly
              className={styles.orderInfoInput}
            />
          </div>
          <div className={styles.orderInfoItem}>
            <label>Kaina:</label>
            <input type="text" value={order.price} readOnly className={styles.orderInfoInput} />
          </div>
          <div className={styles.orderInfoItem}>
            <label>Statusas:</label>
            <input type="text" value={order.status} readOnly className={styles.orderInfoInput} />
          </div>
          <hr />
          <div className={styles.orderInfoItem}>
            <label>Sukurta:</label>
            <input
              type="text"
              value={new Date(order.created_at)
                .toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' })
                .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')}
              readOnly
              className={styles.orderInfoInput}
            />
          </div>
          <div className={styles.orderInfoItemTextArea}>
            <label>Komentaras:</label>
            <textarea value={order.comment} readOnly className={styles.orderInfoTextarea} />
          </div>
        </div>
        <div className={styles.orderItems}>
          <div className={styles.orderItemsHeader}>
            <label>Prekės:</label>
          </div>
          <div className={styles.orderItemsBody}>
            {order.order_items.map((orderItem, index) => (
              <div className={styles.orderItemsWrapper} key={index}>
                <div className={styles.oneOrderItem}>
                  <label>ID:</label>
                  <input
                    type="text"
                    value={orderItem.item_id}
                    readOnly
                    className={styles.orderItemInput}
                  />
                </div>
                <div className={styles.oneOrderItem}>
                  <label>Kaina:</label>
                  <input
                    type="text"
                    value={orderItem.price}
                    readOnly
                    className={styles.orderItemInput}
                  />
                </div>
                <div className={styles.oneOrderItem}>
                  <label>Kiekis:</label>
                  <input
                    type="text"
                    value={orderItem.quantity}
                    readOnly
                    className={styles.orderItemInput}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {!isAdmin && order.status === 'new' && (
          <div className={styles.paymentContainer}>
            <Cards
              cvc={cvc}
              expiry={expiry.slice(2, 4) + '/' + expiry.slice(5, 7)}
              name={fullName}
              number={number}
              focused={focused}
            />
            <div className={styles.paymentInfo}>
              <div className={styles.orderButtonsItem}>
                <label>Vardas:</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => {
                    const lettersWithSpaces = e.target.value.replace(/[^A-Za-z ]/g, '');
                    setFullName(lettersWithSpaces);
                  }}
                  onBlur={() => setFocused(undefined)}
                  onFocus={() => setFocused('name')}
                  className="form-control"
                  required
                />
              </div>
              <div className={styles.orderButtonsItem}>
                <label>Kortelės numeris:</label>
                <input
                  type="text"
                  value={number}
                  required
                  maxLength={16}
                  minLength={16}
                  onFocus={() => setFocused('number')}
                  onBlur={() => setFocused(undefined)}
                  onChange={e => {
                    const validNumber = e.target.value.replace(/\D/g, '');
                    setNumber(validNumber.replace(' ', '').slice(0, 16));
                  }}
                  className="form-control"
                />
              </div>
              <div className={styles.orderButtonsItem}>
                <label>Galiojimo data:</label>
                <input
                  type="month"
                  required
                  value={expiry}
                  min={new Date().toISOString().slice(0, 7)}
                  onFocus={() => setFocused('expiry')}
                  onBlur={() => setFocused(undefined)}
                  onChange={e => {
                    // check if it isn't expired
                    const currentYear = new Date().getFullYear();
                    const currentMonth = new Date().getMonth();
                    if (
                      (currentYear === Number(e.target.value.slice(0, 4)) &&
                        currentMonth > Number(e.target.value.slice(5, 7))) ||
                      Number(e.target.value.slice(0, 4)) < currentYear
                    ) {
                      setExpiry(new Date().toISOString().slice(0, 7));
                      return;
                    }
                    setExpiry(e.target.value);
                  }}
                  className="form-control"
                />
              </div>
              <div className={styles.orderButtonsItem}>
                <label>Kodas:</label>
                <input
                  type="text"
                  required
                  minLength={3}
                  maxLength={3}
                  onFocus={() => setFocused('cvc')}
                  onBlur={() => setFocused(undefined)}
                  value={cvc}
                  onChange={e => {
                    const validNumber = e.target.value.replace(/\D/g, '');

                    setCvc(validNumber.replace(' ', '').slice(0, 3));
                  }}
                  className="form-control"
                />
              </div>
              <Button type="submit" className={styles.paymentButton}>
                Apmokėti
              </Button>
            </div>
          </div>
        )}
        {isAdmin && order.status === 'payed' && (
          <div className={styles.orderActions}>
            <Button
              type="button"
              className={styles.orderAction}
              disabled={isLoading}
              onClick={onFinishClick}
            >
              Pabaigti užsakymą
            </Button>
          </div>
        )}
        {!isAdmin && order.status === 'new' && (
          <div className={styles.orderActions}>
            <Button
              type="button"
              variant="danger"
              className={styles.orderAction}
              disabled={isLoading}
              onClick={onRemoveClick}
            >
              Ištrinti užsakymą
            </Button>
          </div>
        )}
      </form>
    </ListGroup.Item>
  );
};
