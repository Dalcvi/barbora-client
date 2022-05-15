import { faUserTag } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../user/user.middleware';
import styles from './site-navbar.module.css';

export const SiteNavbar = () => {
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  return (
    <Navbar bg="light" expand="lg" sticky="top" className={styles.navbar}>
      <Navbar.Brand onClick={() => navigateTo('/')}>BARBORA</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link onClick={() => navigateTo('/')}>Pagrindinis</Nav.Link>
          <Nav.Link onClick={() => navigateTo('/uzsakymai')}>Užsakymai</Nav.Link>
          {user.tag === 'data' && user.admin && (
            <Nav.Link onClick={() => navigateTo('/transakcijos')}>Transakcijos</Nav.Link>
          )}
          {(user.tag === 'empty' || user.tag === 'error' || user.tag === 'loggedOut') && (
            <>
              <Nav.Link onClick={() => navigateTo('/prisijungti')}>Prisijungti</Nav.Link>
              <Nav.Link onClick={() => navigateTo('/registracija')}>Registruotis</Nav.Link>
            </>
          )}
          {user.tag === 'data' && (
            <>
              <Nav.Link
                onClick={() => {
                  dispatch(logout());
                  navigateTo('/');
                }}
              >
                Atsijungti
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
