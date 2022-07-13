import chalk from 'chalk';

const {
  blue,
  cyan,
  magenta,
  yellow,
  bgBlue,
  bgCyan,
  bgMagenta,
  bgYellow
} = chalk;

const eventTypeMatrixHash = {
  auth: [magenta, bgMagenta, 'auth'],
  distributedService: [cyan, bgCyan, 'distributed service'],
  gateway: [yellow, bgYellow, 'gateway'],
  resolver: [blue, bgBlue, 'resolver']
};

/**
 * This IIFE logs the event type legend to the console once, when the module is initially loaded
 * into the parent node process.
 */
(
  function printEventTypeLegend() {
    const whiteSpace = '  ';

    console.log('\nevent type legend:');

    console.log(
      bgMagenta(whiteSpace),
      magenta('auth')
    );

    console.log(
      bgCyan(whiteSpace),
      cyan('distributed service')
    );

    console.log(
      bgYellow(whiteSpace),
      yellow('gateway')
    );

    console.log(
      bgBlue(whiteSpace),
      blue('resolver'),
      '\n'
    );
  }
)();

const print = ({ eventTypeKey, message }) => {
  const [, bgColor] = eventTypeMatrixHash[eventTypeKey];

  console.log(
    bgColor(`\n*** ${message} ***`)
  );
};

const printWithParams = ({ eventTypeKey, header, params }) => {
  const [color, bgColor] = eventTypeMatrixHash[eventTypeKey];

  console.log(
    bgColor(`\n*** ${header}:`)
  );

  console.log(
    color(
      JSON.stringify(params, null, 2)
    )
  );

  console.log(
    bgColor('***')
  );
};

export const printAuthEvent = message =>
  void print({ eventTypeKey: 'auth', message });

export const printGatewayEvent = message =>
  void print({ eventTypeKey: 'gateway', message });

export const printDistributedServiceEvent = ({ name, body }) =>
  void printWithParams({
    eventTypeKey: 'distributedService',
    header: `${name} distributed service body`,
    params: body
  });

export const printResolverEvent = ({
  name,
  parent,
  input,
  context

  // info
}) =>
  void printWithParams({
    eventTypeKey: 'resolver',
    header: `${name} resolver params`,
    params: {
      parent,
      input,
      context

      // info
    }
  });
