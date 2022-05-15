import React, { useEffect } from 'react';
import { SiteNavbar } from '../site-navbar';
import { AppRouter } from '../app-router';
import { useAppDispatch, useAppSelector } from '../store';
import { ModalWrapper } from '../modal/modal.component';
import styles from './app.module.css';
import { authenticateUser } from '../user/user.middleware';
import { Container, Spinner } from 'react-bootstrap';

export function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    if (user.tag === 'empty') {
      dispatch(authenticateUser());
    }
  }, [dispatch, user]);

  if (user.tag === 'loading') {
    return (
      <div className={styles.appLoading}>
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <>
      <SiteNavbar />
      <AppRouter />
      <ModalWrapper />
    </>
  );
}
