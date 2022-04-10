import React from 'react';
import { SiteNavbar } from '../site-navbar';
import { AppRouter } from '../app-router';
import { Button } from 'react-bootstrap';
import styles from './app.module.css';
import { openModal } from '../modal/modal.slice';
import { Modals } from '../modal/modal.constants';
import { useAppDispatch } from '../store';
import { ModalWrapper } from '../modal/modal.component';

export function App() {
  const dispatch = useAppDispatch();
  return (
    <>
      <SiteNavbar />
      <AppRouter />
      <ModalWrapper />
    </>
  );
}
