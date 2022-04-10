import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styles from './site-navbar.module.css';

export const SiteNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className={styles.navbar}>
      <Navbar.Brand href="#home">BARBORA</Navbar.Brand>
      <Nav>
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#Login">Login</Nav.Link>
        <Nav.Link href="#Register">Register</Nav.Link>
      </Nav>
    </Navbar>
  );
};
