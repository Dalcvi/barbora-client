import { Button, Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';
import styles from './filter.module.css';

export const Filter = () => {
  return (
    <div className={styles.filterBar}>
      <DropdownButton variant="secondary" title="Filtruoti">
        <Dropdown.Item href="#">Temp</Dropdown.Item>
        <Dropdown.Item href="#">Temp</Dropdown.Item>
        <Dropdown.Item href="#">Temp</Dropdown.Item>
      </DropdownButton>
      <InputGroup className={styles.searchContainer}>
        <FormControl placeholder="Prekės pavadinimas" aria-label="Ieškoti" />
        <Button variant="secondary" id="button-addon2">
          Ieškoti
        </Button>
      </InputGroup>
      <DropdownButton variant="secondary" title="Rūšiuoti">
        <Dropdown.Item href="#">Temp</Dropdown.Item>
        <Dropdown.Item href="#">Temp</Dropdown.Item>
        <Dropdown.Item href="#">Temp</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};
