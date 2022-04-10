import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, FormControl } from 'react-bootstrap';
import { ItemData } from '.';
import { Modals } from '../../modal/modal.constants';
import { openModal } from '../../modal/modal.slice';
import { useAppDispatch } from '../../store';
import { addItem } from '../cart';
import { removeItem, updateQuantity } from '../items-display';
import styles from './item.module.css';

export const Item = ({
  name,
  id,
  quantity,
  image_url,
  description,
  weight,
  price,
  CreatedAt,
}: ItemData) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const dispatch = useAppDispatch();
  const onAddClick = () => {
    if (selectedQuantity === 0) {
      return;
    }
    dispatch(addItem({ itemId: id, quantity: selectedQuantity }));
    dispatch(updateQuantity({ id, quantity: selectedQuantity }));
  };
  useEffect(() => {
    if (selectedQuantity > quantity) {
      setSelectedQuantity(quantity);
    }
  }, [quantity, selectedQuantity]);

  const onChangeClick = () => {
    dispatch(openModal({ modal: Modals.EditItem, props: { id } }));
  };
  const onDelete = () => {
    axios.delete(`/item/${id}`).then(
      () => {
        dispatch(removeItem(id));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <li className={styles.wrapper}>
      <Card className={styles.card}>
        <Button variant="outlined-primary" onClick={onChangeClick}>
          Pakeisti
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Ištrinti
        </Button>
        <Card.Img className={styles.image} variant="top" src={image_url} alt="prekė" />
        <Card.Body>
          <Card.Title>
            {name}, {weight}: {id}
          </Card.Title>
          <Card.Text className={styles.price}>{price}&#8364;</Card.Text>
          <div className={styles.bottom}>
            <Card.Text>Kiekis: {quantity}</Card.Text>
            <FormControl
              type="number"
              value={selectedQuantity}
              onChange={(e) => {
                const amount = Number(e.target.value);
                if (amount > quantity) {
                  return setSelectedQuantity(quantity);
                }
                if (amount < 0) {
                  return setSelectedQuantity(0);
                }
                setSelectedQuantity(amount);
              }}
              max={quantity}
              min={0}
            />
            <Button
              variant="primary"
              className={styles.button}
              onClick={onAddClick}
              disabled={quantity === 0}
            >
              Į krepšelį
            </Button>
          </div>
        </Card.Body>
      </Card>
    </li>
  );
};
