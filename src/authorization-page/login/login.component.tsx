import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { settingPassErrors, isFormCorrect } from '..';
import { settingUsernameErrors } from '../authorization.utils';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Spinner } from 'react-bootstrap';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../store';
import { authenticateUser } from '../../user/user.middleware';

export const Login = () => {
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [usernameErrors, setUsernameError] = useState<string[]>([]);
  const [passErrors, setPassErrors] = useState<string[]>([]);
  const [showPass, setShowPass] = useState<boolean>(false);

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
    const formValues = [pass, username];
    const formErrors = [...passErrors, ...usernameErrors];
    if (!isFormCorrect(formValues, formErrors)) {
      return;
    }
    setIsLoading(true);

    axios
      .post('/login', {
        password: pass,
        name: username,
      })
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
          <h2 className={styles.title}>Prisijungti</h2>
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
                {isLoading ? <Spinner animation="border" /> : 'Prisijungti'}
              </button>
            </div>
            <div className="form-group mt-3">
              <button
                className="btn btn-outline-primary btn-block"
                disabled={isLoading}
                onClick={() => navigateTo('/registracija')}
              >
                {isLoading ? <Spinner animation="border" /> : 'Registruotis'}
              </button>
            </div>
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
