import { printAuthEvent } from '../utils/print.js';

/**
 * NOTE: exploration for bulk auth
*/
export const getAuthorizationScope = ({ email }) => {
  printAuthEvent('getAuthorizationScope');

  const hash = {
    'none.user@nodomain.com': {
      numbers: []
    },
    'limited.user@nodomain.com': {
      numbers: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        21,
        101, 102, 103, 104, 105, 106, 107, 108, 109,
        121,
        850, 855
      ]
    },
    'super.user@nodomain.com': {
      numbers: true
    }
  };

  return hash[email] || {};
};
