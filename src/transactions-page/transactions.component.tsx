import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import Cards from 'react-credit-cards';
import styles from './transactions.module.css';

interface Transaction {
  id: number;
  external_id: number;
  total: string;
  order_id: number;
  status: string;
  CreatedAt: string;
  payment_information: {
    first_name: string;
    last_name: string;
    card_number: string;
    expiration_year: number;
    expiration_month: number;
    secret_code: number;
  };
}

export const Transactions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);
  const user = useAppSelector(state => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (user.tag === 'error' || (user.tag === 'data' && !user.admin)) {
      navigateTo('/');
    }
  }, [navigateTo, user.tag]);

  const fetchTransactions = async () => {
    if (user.tag !== 'data' || !user.admin) {
      return;
    }
    setIsLoading(true);
    axios
      .get('/transaction')
      .then(({ data }) => {
        setTransactions(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (user.tag === 'data' && user.admin) {
      fetchTransactions();
    }
  }, [user.tag]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ListGroup>
        {transactions.map(transaction => (
          <TransactionItem
            transaction={transaction}
            isAdmin={user.tag === 'data' && user.admin}
            fetchTransactions={fetchTransactions}
          />
        ))}
      </ListGroup>
    </Container>
  );
};

export const TransactionItem = ({
  transaction,
  isAdmin,
  fetchTransactions,
}: {
  transaction: Transaction;
  isAdmin: boolean;
  fetchTransactions: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onFinishClick = () => {
    setIsLoading(true);
    axios
      .post(`/transaction/${transaction.id}`, {
        external_id: Math.floor(Math.random() * 100000) + 100,
      })
      .then(() => {
        setIsLoading(false);
        fetchTransactions();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <ListGroup.Item className={styles.orderItem}>
      <form>
        <div className={styles.orderInfo}>
          <div className={styles.orderInfoItem}>
            <label>Sukurtas:</label>
            <input
              type="text"
              value={new Date(transaction.CreatedAt)
                .toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' })
                .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')}
              readOnly
              className={styles.orderInfoInput}
            />
          </div>
          <div className={styles.orderInfoItem}>
            <label>Kaina:</label>
            <input
              type="text"
              value={transaction.total}
              readOnly
              className={styles.orderInfoInput}
            />
          </div>
          <div className={styles.orderInfoItem}>
            <label>Užsakymo ID:</label>
            <input
              type="text"
              value={transaction.order_id}
              readOnly
              className={styles.orderInfoInput}
            />
          </div>
          <div className={styles.orderInfoItem}>
            <label>Statusas:</label>
            <input
              type="text"
              value={transaction.status}
              readOnly
              className={styles.orderInfoInput}
            />
          </div>
        </div>
        <div className={styles.paymentContainer}>
          <Cards
            cvc={transaction.payment_information.secret_code}
            expiry={`${
              transaction.payment_information.expiration_year
            }/${transaction.payment_information.expiration_month.toString().padStart(2, '0')}`}
            name={
              transaction.payment_information.first_name +
              ' ' +
              transaction.payment_information.last_name
            }
            number={transaction.payment_information.card_number}
          />
          <form className={styles.paymentInfo}>
            <div className={styles.orderButtonsItem}>
              <label>Vardas:</label>
              <input
                type="text"
                value={
                  transaction.payment_information.first_name +
                  ' ' +
                  transaction.payment_information.last_name
                }
                className="form-control"
                required
                disabled
              />
            </div>
            <div className={styles.orderButtonsItem}>
              <label>Kortelės numeris:</label>
              <input
                type="text"
                value={transaction.payment_information.card_number}
                required
                maxLength={16}
                minLength={16}
                className="form-control"
                disabled
              />
            </div>
            <div className={styles.orderButtonsItem}>
              <label>Galiojimo data:</label>
              <input
                type="month"
                required
                value={`${
                  transaction.payment_information.expiration_year
                }/${transaction.payment_information.expiration_month.toString().padStart(2, '0')}`}
                className="form-control"
                disabled
              />
            </div>
            <div className={styles.orderButtonsItem}>
              <label>Kodas:</label>
              <input
                type="text"
                required
                minLength={3}
                maxLength={3}
                value={transaction.payment_information.secret_code}
                className="form-control"
                disabled
              />
            </div>
          </form>
        </div>
        {isAdmin && transaction.status === 'processing' && (
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
      </form>
    </ListGroup.Item>
  );
};
