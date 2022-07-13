import express from 'express';
import { FIBONACCI_SERVER_PORT, FIBONACCI_PATH, REQUEST_TIMEOUT } from '../config.js';
import { getFibonacciSequence } from '../functions/fibonacci-sequence.js';
import { printDistributedServiceEvent } from '../utils/print.js';

const app = express();

app.use(express.json());

app.post(FIBONACCI_PATH, async (request, response) => {
  const {
    parent,
    input,
    context

    // info
  } = request.body;

  printDistributedServiceEvent({
    name: 'fibonacci sequence',
    body: {
      parent,
      input,
      context

      // info
    }
  });

  const fibonacciSequence = getFibonacciSequence();

  const result = context.authScope.numbers === true ?
    fibonacciSequence :
    fibonacciSequence.filter(i => context.authScope.numbers.includes(i));

  response.send(result);
});

app.listen(
  { port: FIBONACCI_SERVER_PORT },
  () => console.log(
    `🚀🚀🚀 fibonacci sequence distributed service running at localhost:${FIBONACCI_SERVER_PORT}${FIBONACCI_PATH}`
  )
).setTimeout(
  REQUEST_TIMEOUT
);
