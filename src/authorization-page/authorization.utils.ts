import {
  InputErrorMessages,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  UsernameValidationByRule,
  PasswordValidationByRule,
} from '.';

export const settingPhoneNumberErrors =
  (setEmailError: (error: string) => void) => (email: string) => {
    if (email === '') {
      setEmailError('');
      return;
    }
    const isValid = isValidNumber(email);
    const error = isValid ? '' : InputErrorMessages.PHONE_NUMBER_MUST_BE_EIGHT_DIGITS;
    setEmailError(error);
  };

export const settingUsernameErrors =
  (setUsernameErrors: (error: string[]) => void) => (username: string) => {
    if (username === '') {
      setUsernameErrors([]);
      return;
    }

    const usernameProblems = getusernameProblems(username);
    const errors = getUsernameErrors(usernameProblems);

    setUsernameErrors(errors);
  };

export const getUsernameErrors = (isValid: UsernameValidationByRule) => {
  const errors = [];
  if (!isValid.isValidMinLength) {
    errors.push(
      InputErrorMessages.MIN_LENGTH.replace('{minLength}', MIN_USERNAME_LENGTH.toString())
    );
  }
  return errors;
};

export const getusernameProblems = (username: string): UsernameValidationByRule => {
  return {
    isValidMinLength: validationFunctions.minLength(username, MIN_USERNAME_LENGTH),
  };
};

export const settingPassErrors = (setPassErrors: (error: string[]) => void) => (pass: string) => {
  if (pass === '') {
    setPassErrors([]);
    return;
  }

  const passwordProblems = getPasswordProblems(pass);
  const errors = getPassErrors(passwordProblems);

  setPassErrors(errors);
};

export const getPassErrors = (isValid: PasswordValidationByRule) => {
  const errors = [];
  if (!isValid.isValidMinLength) {
    errors.push(
      InputErrorMessages.MIN_LENGTH.replace('{minLength}', MIN_PASSWORD_LENGTH.toString())
    );
  }
  return errors;
};

export const getPasswordProblems = (password: string): PasswordValidationByRule => {
  return {
    isValidMinLength: validationFunctions.minLength(password, MIN_PASSWORD_LENGTH),
  };
};

const validationFunctions = {
  minLength: (text: string, length: number) => {
    return text.length >= length;
  },
};

export const isFormCorrect = (formValues: string[], errors: string[]) => {
  const areFormValuesCorrect = formValues.filter(val => val !== '').length === formValues.length;
  const doesFormHaveErrors = errors.filter(val => val === '').length !== errors.length;

  return !doesFormHaveErrors && areFormValuesCorrect;
};

export const isValidNumber = (phoneNumber: string) => {
  const onlyNumbers = phoneNumber.replace(/\D/g, '');
  return phoneNumber === onlyNumbers && phoneNumber.length === 8;
};
