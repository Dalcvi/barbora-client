import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useAppDispatch } from '../../store';
import { addItem } from '../items-display';
import styles from './add-item-modal.module.css';

export const AddItemModal = ({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([] as string[]);
  const [createNewCategory, setCreateNewCategory] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/item/category')
      .then(({ data }) => {
        setCategories(data);
        setIsLoading(false);
        if (data.length === 0) {
          setCreateNewCategory(true);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);
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
      category: createNewCategory ? formData.get('new-category') : formData.get('category'),
    };

    const response = await axios.post('item', data);
    dispatch(addItem(response.data));
    handleClose();
  };

  if (isLoading) {
    return (
      <Modal.Dialog className={styles.modal}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Pridėti prekę</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.loaderContainer}>
          <Spinner animation="border" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Uždaryti
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled>
            Pridėti
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }

  return (
    <Modal.Dialog className={styles.modal}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Pridėti prekę</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form ref={formRef} className={styles.form}>
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
          {createNewCategory && (
            <div className="form-group">
              <label htmlFor="new-category">Nauja kategorija</label>
              <input
                type="text"
                className="form-control"
                id="new-category"
                name="new-category"
                placeholder="Nauja kategorija"
                required
              />
            </div>
          )}
          {!createNewCategory && (
            <div className="form-group">
              <label htmlFor="category">Kategorija</label>
              <select
                className="form-control"
                id="category"
                name="category"
                required
                disabled={categories.length === 0}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-group form-check">
            <input
              type="checkbox"
              disabled={categories.length === 0}
              className="form-check-input"
              id="add-category"
              name="add-category"
              checked={createNewCategory}
              onChange={e => {
                if (categories.length === 0 && createNewCategory) {
                  setCreateNewCategory(true);
                  return;
                }
                setCreateNewCategory(e.target.checked);
              }}
            />
            <label className="form-check-label" htmlFor="add-category">
              Sukurti naują kategoriją
            </label>
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
          Uždaryti
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Pridėti
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};
