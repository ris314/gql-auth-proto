export const getFibonacciSequence = ({ max = 999 } = {}) => {
  // Fibonacci sequence starts at 0 and 1
  const fibonacciSequence = [0, 1];

  // Get the next item in the Fibonacci sequence using the `Fn = Fn-1 + Fn-2` formula
  const getNext = () => {
    const currentIndex = fibonacciSequence.length - 1; // this is Fn-1
    const priorIndex = currentIndex - 1; // this is Fn-2

    return fibonacciSequence[currentIndex] + fibonacciSequence[priorIndex];
  };

  for (let i = fibonacciSequence.length - 1; i <= max; i = getNext()) {
    fibonacciSequence.push(i);
  }

  return fibonacciSequence;
};
