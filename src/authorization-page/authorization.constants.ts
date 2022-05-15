import styles from './authorization.module.css';

export const textFieldProps: { [key: string]: any } = {
  username: {
    id: 'username',
    label: 'Username',
    type: 'username',
    variant: 'outlined',
    autoComplete: 'username',
    size: 'small',
    required: true,
    className: styles.formInput,
  },
  email: {
    id: 'email',
    label: 'Email',
    type: 'email',
    variant: 'outlined',
    autoComplete: 'email',
    size: 'small',
    required: true,
    className: styles.formInput,
  },
  pass: {
    id: 'password',
    label: 'Password',
    variant: 'outlined',
    size: 'small',
    autoComplete: 'new-password',
    required: true,
    className: styles.formInput,
  },
};

export enum InputErrorMessages {
  MIN_LENGTH = 'Laukelis turi būti bent {minLength} simbolių ilgio',
  PHONE_NUMBER_MUST_BE_EIGHT_DIGITS = 'Telefono numeris turi būti 8 skaitmenų',
}

export const MIN_PASSWORD_LENGTH = 5;
export const MIN_USERNAME_LENGTH = 3;
