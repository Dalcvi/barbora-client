export const SUCCESSFUL_REGISTRATION = 'Successfully registered!';
export const REGISTER_URI = '/api/auth/register';
export const REGISTER_LOADING_STATE_ID = 'login-system/register';

const phoneNumberValidation = (value: string) => {
  if (!value) {
    return true;
  }

  const phoneNumber = value.replace(/\D/g, '');
  const isValid = phoneNumber.length === 10;

  return isValid;
};
