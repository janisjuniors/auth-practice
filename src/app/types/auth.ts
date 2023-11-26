export type RegistrationBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type AuthenticationBody = Omit<RegistrationBody, 'firstName' | 'lastName'>

export type UserData = Omit<RegistrationBody, 'password'>;
