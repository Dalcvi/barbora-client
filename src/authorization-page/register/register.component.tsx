import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';
import { settingPhoneNumberErrors, settingPassErrors, isFormCorrect } from '..';
import { settingUsernameErrors } from '../authorization.utils';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Spinner } from 'react-bootstrap';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { authenticateUser } from '../../user/user.middleware';
import { useAppDispatch, useAppSelector } from '../../store';

export const Register = () => {
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');
  const [usernameErrors, setUsernameError] = useState<string[]>([]);
  const [passErrors, setPassErrors] = useState<string[]>([]);
  const [showPass, setShowPass] = useState<boolean>(false);

  const debouncedSetPhoneNumberError = useMemo(
    () => debounce(settingPhoneNumberErrors(setPhoneNumberError), 2000),
    []
  );

  const debouncedSetUsernameErrors = useMemo(
    () => debounce(settingUsernameErrors(setUsernameError), 2000),
    []
  );

  const debouncedSetPassErrors = useMemo(
    () => debounce(settingPassErrors(setPassErrors), 2000),
    []
  );

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = [phoneNumber, pass, username];
    const formErrors = [phoneNumberError, ...passErrors, ...usernameErrors];
    if (!isFormCorrect(formValues, formErrors)) {
      return;
    }
    setIsLoading(true);
    axios
      .post(
        '/register',
        {
          mobile_number: `+370${phoneNumber}`,
          password: pass,
          name: username,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        setIsLoading(false);
        dispatch(authenticateUser());
        navigateTo('/');
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  if (user.tag === 'data') {
    navigateTo('/');
  }

  return (
    <Container className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={onSubmit} className={styles.form}>
          <h2 className={styles.title}>Registacija</h2>
          <div className="form-group mt-3">
            <label htmlFor="phone">Telefono numeris</label>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                +370
              </span>
              <input
                type="phone"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="12345678"
                value={phoneNumber}
                onChange={e => {
                  setPhoneNumber(e.target.value);
                  debouncedSetPhoneNumberError(e.target.value);
                }}
              />
            </div>

            <p className="text-danger">{phoneNumberError}</p>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="username">Vartotojo vardas</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Vartotojo vardas"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
                debouncedSetUsernameErrors(e.target.value);
              }}
            />
            <p className="text-danger">{combineErrorMessages(usernameErrors)}</p>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="pass">Slaptažodis</label>
            <div className="input-group">
              <input
                type={showPass ? 'text' : 'password'}
                className="form-control"
                id="pass"
                name="pass"
                placeholder="Slaptažodis"
                value={pass}
                onChange={e => {
                  setPass(e.target.value);
                  debouncedSetPassErrors(e.target.value);
                }}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </div>
            <p className="text-danger">{combineErrorMessages(passErrors)}</p>
          </div>
          <div className={styles.footer}>
            <div className="form-group mt-3">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? <Spinner animation="border" /> : 'Registruotis'}
              </button>
            </div>
            <p className="mt-1">
              Jau turite paskyra?{' '}
              <span
                className="text-primary"
                onClick={() => navigateTo('/prisijungti')}
                role="button"
                tabIndex={0}
              >
                Prisijungti
              </span>
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
};

const combineErrorMessages = (errors: string[]) =>
  errors.map(error => (
    <React.Fragment key={error}>
      {error}
      <br />
    </React.Fragment>
  ));
