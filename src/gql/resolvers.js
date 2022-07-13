import { ForbiddenError } from 'apollo-server-express';
import axios from 'axios';
import _ from 'lodash';
import { FIBONACCI_URL } from '../config.js';
import { getEnglishLabel } from '../functions/number.js';
import { printResolverEvent } from '../utils/print.js';

const yieldWithAuth = ({ hasPermission, result, forceErrorFlag = false }) =>
  hasPermission && !forceErrorFlag ?
    result :
    new ForbiddenError('Data request may not be authorized.');

const yieldAuthorizedNumbers = ({ authorizedNumbers, min, max, ...rest }) => {
  let numbersInRange = _.range(min, max + 1);

  const fullAccessFlag = authorizedNumbers === true;

  if (!fullAccessFlag) {
    numbersInRange = _.intersection(
      numbersInRange,
      authorizedNumbers
    );
  }

  return yieldWithAuth({
    hasPermission: fullAccessFlag || _.isArray(authorizedNumbers),
    result: numbersInRange.map(value => ({ value, ...rest }))
  });
};

export default {
  Query: {
    oneDigitNumberCollection: (parent, input, context, info) => {
      const name = 'Query.oneDigitNumberCollection';

      printResolverEvent({
        name,
        parent,
        input,
        context,
        info
      });

      return { resolver: name, parent };
    },
    twoDigitNumberCollection: (parent, input, context, info) => {
      const name = 'Query.twoDigitNumberCollection';

      printResolverEvent({
        name,
        parent,
        input,
        context,
        info
      });

      return { resolver: name, parent };
    },
    threeDigitNumberCollection: (parent, input, context, info) => {
      const name = 'Query.threeDigitNumberCollection';

      printResolverEvent({
        name,
        parent,
        input,
        context,
        info
      });

      return { resolver: name, parent };
    },
    numberCollection: (parent, input, context, info) => {
      const name = 'Query.numberCollection';

      printResolverEvent({
        name,
        parent,
        input,
        context,
        info
      });

      return { resolver: name, parent };
    },
    number: (parent, input, context, info) => {
      const name = 'Query.number';

      printResolverEvent({
        name,
        parent,
        input,
        context,
        info
      });

      return yieldWithAuth({
        hasPermission: context.authScope.numbers === true ||
          context.authScope.numbers.includes(input.value),
        result: { resolver: name, parent, value: input.value }
      });
    },
    fibonacciSequence: async (parent, input, context, info) => {
      printResolverEvent({
        name: 'Query.fibonacciSequence',
        parent,
        input,
        context,
        info
      });

      const { data: fibonacciSequence } = await axios.post(
        FIBONACCI_URL,
        { parent, input, context, info }
      );

      return fibonacciSequence;
    }
  },
  NumberCollection: {
    oneDigit: (parent, input, context, info) => {
      const name = 'NumberCollection.oneDigit';

      printResolverEvent({
        name,
        parent,
        input,
        context,
        info
      });

      return { resolver: name, parent };
    },
    twoDigit: (parent, input, context, info) => {
      const name = 'NumberCollection.twoDigit';

      printResolverEvent({
        name,
        parent,
        input,
        context,
        info
      });

      return { resolver: name, parent };
    },
    threeDigit: (parent, input, context, info) => {
      const name = 'NumberCollection.threeDigit';

      printResolverEvent({
        name,
        parent,
        input,
        context,
        info
      });

      return { resolver: name, parent };
    }
  },
  OneDigitNumberCollection: {
    description: () => 'Starting at 0 and ending at 9, the basis for the decimal (base ten) numeric system. Each symbol can be used to compose any other number.',
    numbers: async (parent, input, context, info) => {
      const name = 'OneDigitNumberCollection.numbers';

      printResolverEvent({
        name,
        parent,
        input,
        context,
        info
      });

      return yieldAuthorizedNumbers({
        authorizedNumbers: context.authScope.numbers,
        min: 0,
        max: 9,
        resolver: name,
        parent
      });
    }
  },
  TwoDigitNumberCollection: {
    description: () => 'Starting at 10 and ending at 99, numbers that have two digits.',
    numbers: async (parent, input, context, info) => {
      const name = 'TwoDigitNumberCollection.numbers';

      printResolverEvent({
        name,
        parent,
        input,
        context,
        info
      });

      return yieldAuthorizedNumbers({
        authorizedNumbers: context.authScope.numbers,
        min: 10,
        max: 99,
        resolver: name,
        parent
      });
    }
  },
  ThreeDigitNumberCollection: {
    description: () => 'Starting at 100 and ending at 999, numbers that have three digits.',
    numbers: async (parent, input, context, info) => {
      const name = 'ThreeDigitNumberCollection.numbers';

      printResolverEvent({
        name,
        parent,
        input,
        context,
        info
      });

      return yieldAuthorizedNumbers({
        authorizedNumbers: context.authScope.numbers,
        min: 100,
        max: 999,
        resolver: name,
        parent
      });
    }
  },
  Number: {
    value: (parent, input, context, info) => {
      printResolverEvent({
        name: 'Number.value',
        parent,
        input,
        context,
        info
      });

      return yieldWithAuth({
        hasPermission: context.authScope.numbers === true ||
          context.authScope.numbers.includes(parent.value),
        result: parent.value
      });
    },
    preferredLabel: (parent, input, context, info) => {
      printResolverEvent({
        name: 'Number.preferredLabel',
        parent,
        input,
        context,
        info
      });

      return yieldWithAuth({
        hasPermission: context.authScope.numbers === true ||
          context.authScope.numbers.includes(parent.value),
        result: getEnglishLabel(parent.value)

        // forceErrorFlag: parent.value === 2
      });
    }
  }
};
