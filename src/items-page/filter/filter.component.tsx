import { Button, Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';
import styles from './filter.module.css';

export const Filter = ({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: (value: string) => void;
}) => {
  return (
    <div className={styles.filterBar}>
      <InputGroup className={styles.searchContainer}>
        <FormControl
          placeholder="Prekės pavadinimas"
          aria-label="Ieškoti"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        {searchValue && (
          <Button variant="secondary" id="button-addon2" onClick={e => setSearchValue('')}>
            &times;
          </Button>
        )}
      </InputGroup>
    </div>
  );
};
