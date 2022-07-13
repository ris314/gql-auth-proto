import { AuthenticationError } from 'apollo-server-express';
import { printAuthEvent } from '../utils/print.js';

/**
 * The purpose of this function is to define a placeholder for the authentication process.
 * The implementation details are not as important as the function signature. The main objective
 * is to simulate at a hight level what authentication process might yield and what happens
 * when the request cannot be authenticated.
 *
 * @param {string} jwt Jason Web Token
 */
export const getUser = ({
  jwt
}) => {
  printAuthEvent('getUser');

  const hash = {
    none: {
      name: 'Someone NoAccess',
      email: 'none.user@nodomain.com'
    },
    limited: {
      name: 'Joe Rights',
      email: 'limited.user@nodomain.com'
    },
    super: {
      name: 'Jane Fabulous',
      email: 'super.user@nodomain.com'
    }
  };

  if (!jwt) {
    throw new AuthenticationError('Required authentication params were not supplied.');
  }

  const user = hash[jwt];

  if (user === undefined) {
    throw new AuthenticationError('Unable to authenticate.');
  }

  return user;
};
