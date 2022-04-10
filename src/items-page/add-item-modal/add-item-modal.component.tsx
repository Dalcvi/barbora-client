import axios from 'axios';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useAppDispatch } from '../../store';
import { addItem } from '../items-display';
import styles from './add-item-modal.module.css';

export const AddItemModal = ({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useAppDispatch();
  const formRef = React.useRef<HTMLFormElement>(null);
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) {
      return;
    }
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      image_url: formData.get('image'),
      weight: formData.get('weight'),
      quantity: Number(formData.get('quantity')),
    };

    const response = await axios.post('item', data);
    dispatch(addItem(response.data));
    handleClose();
  };

  return (
    <Modal.Dialog className={styles.modal}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Pridėti prekę</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form ref={formRef}>
          <div className="form-group">
            <label htmlFor="name">Pavadinimas</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Pavadinimas"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Aprašymas</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows={3}
              placeholder="Aprašymas"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Kaina</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              placeholder="0"
              step={0.01}
              min={0}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Paveiksliukas</label>
            <input
              type="url"
              className="form-control"
              id="image"
              name="image"
              placeholder="Paveiksliukas"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Svoris</label>
            <input
              type="number"
              className="form-control"
              id="weight"
              name="weight"
              placeholder="0"
              step={0.01}
              min={0}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Kiekis</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              placeholder="0"
              required
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
