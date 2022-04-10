import axios from 'axios';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { clearCart } from '..';
import { useAppDispatch, useAppSelector } from '../../../store';
import styles from './finish-order-modal.module.css';

export const FinishOrderModal = ({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) {
      return;
    }
    const cartItemsArray = Object.values(cartItems).map((item) => ({
      item_id: item.itemId,
      quantity: item.quantity,
    }));

    const formData = new FormData(form);
    const data = {
      address: formData.get('address'),
      postal_code: formData.get('postal_code'),
      deliver_at: `${formData.get('deliver_at')}T00:00:00.000Z`,
      comment: formData.get('comment'),
      order_items: cartItemsArray,
    };

    await axios.post(`order`, data);
    dispatch(clearCart());
    handleClose();
  };

  return (
    <Modal.Dialog className={styles.modal}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Pabaigti užsakymą</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form ref={formRef}>
          <div className="form-group">
            <label htmlFor="address">Adresas</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              placeholder="Adresas"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="postal_code">Pašto kodas</label>
            <input
              type="text"
              className="form-control"
              id="postal_code"
              name="postal_code"
              placeholder="Pašto kodas"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deliver_at">Pristatymo data</label>
            <input
              type="date"
              className="form-control"
              id="deliver_at"
              name="deliver_at"
              placeholder="Pristatymo data"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Komentaras</label>
            <textarea
              className="form-control"
              id="comment"
              name="comment"
              rows={3}
              placeholder="Komentaras"
            />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Pridėti
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};
