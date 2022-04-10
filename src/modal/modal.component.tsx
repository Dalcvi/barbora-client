import { Modal } from 'react-bootstrap';
import { AddItemModal } from '../items-page/add-item-modal';
import { FinishOrderModal } from '../items-page/cart/finish-order-modal';
import { EditItemModal } from '../items-page/edit-item-modal';
import { useAppDispatch, useAppSelector } from '../store';
import { Modals } from './modal.constants';
import { closeModal } from './modal.slice';

export const ModalWrapper = () => {
  const { open, props } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  if (!open) {
    return null;
  }
  const ModalComponent = modals[open];
  const handleClose = () => {
    dispatch(closeModal());
  };
  // return null;
  return (
    <Modal show={true}>
      <ModalComponent handleClose={handleClose} {...(props as any)} />
    </Modal>
  );
};

const modals = {
  [Modals.AddItem]: AddItemModal,
  [Modals.EditItem]: EditItemModal,
  [Modals.FinishOrder]: FinishOrderModal,
};
