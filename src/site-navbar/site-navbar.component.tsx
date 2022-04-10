import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './site-navbar.module.css';

export const SiteNavbar = () => {
  const navigateTo = useNavigate();
  return (
    <Navbar bg="light" expand="lg" sticky="top" className={styles.navbar}>
      <Navbar.Brand href="#home">BARBORA</Navbar.Brand>
      <Nav>
        <Nav.Link onClick={() => navigateTo('/')}>Pagrindinis</Nav.Link>
        <Nav.Link onClick={() => navigateTo('/uzsakymai')}>Užsakymai</Nav.Link>{' '}
        <Nav.Link href="#">Prisijungti</Nav.Link>
        <Nav.Link href="#">Registruotis</Nav.Link>
      </Nav>
    </Navbar>
  );
};
